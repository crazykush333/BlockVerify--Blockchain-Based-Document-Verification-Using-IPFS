from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import Transaction, PredictionResponse
import numpy as np
from model_utils import predict, explain_shap, explain_lime
from typing import List
from web3 import Web3
import os
from otp_utils import generate_and_send_otp, verify_otp

app = FastAPI(title="XAI Fraud Detection API", version="0.1.0")

# CORS to allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# Blockchain setup (local anvil or remote RPC)
CHAIN_RPC_URL = os.getenv("CHAIN_RPC_URL", "http://localhost:8545")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
web3 = Web3(Web3.HTTPProvider(CHAIN_RPC_URL))
ACCOUNT = web3.eth.account.from_key(PRIVATE_KEY) if PRIVATE_KEY else None

# Smart contract ABI & address placeholders (to be filled after deployment)
CONTRACT_ADDRESS = os.getenv("FRAUD_CONTRACT_ADDR")
CONTRACT_ABI = []  # TODO: populate with compiled ABI
contract = None
if CONTRACT_ADDRESS and CONTRACT_ABI:
    contract = web3.eth.contract(address=Web3.to_checksum_address(CONTRACT_ADDRESS), abi=CONTRACT_ABI)


@app.post("/predict", response_model=PredictionResponse)
async def predict_fraud(tx: Transaction):
    try:
        features_np = np.array(tx.features).reshape(1, -1)
        is_fraud, confidence = predict(features_np)
        shap_values = explain_shap(features_np)
        lime_exp = explain_lime(features_np)

        # Blockchain anchoring stub
        tx_hash_hex = None
        if contract and ACCOUNT:
            packed = web3.solidity_keccak(["string", "bool", "uint256"], [tx.transaction_id, is_fraud, int(confidence * 10000)])
            tx_hash = contract.functions.storeInferenceHash(packed.hex()).build_transaction({
                "nonce": web3.eth.get_transaction_count(ACCOUNT.address),
                "gas": 1500000,
                "gasPrice": web3.to_wei("20", "gwei"),
            })
            signed = web3.eth.account.sign_transaction(tx_hash, private_key=PRIVATE_KEY)
            sent_tx = web3.eth.send_raw_transaction(signed.rawTransaction)
            tx_hash_hex = web3.to_hex(sent_tx)

        return PredictionResponse(
            transaction_id=tx.transaction_id,
            is_fraud=is_fraud,
            confidence=confidence,
            blockchain_tx_hash=tx_hash_hex,
            shap_values=shap_values,
            lime_explanation=str(lime_exp),
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {"status": "ok"}


# ---------------- OTP FLOW ----------------


@app.post("/otp/send")
async def send_otp(phone: str):
    try:
        generate_and_send_otp(phone)
        return {"status": "sent"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/otp/verify")
async def verify_otp_endpoint(phone: str, code: str):
    if verify_otp(phone, code):
        return {"status": "verified"}
    raise HTTPException(status_code=400, detail="Invalid or expired code")