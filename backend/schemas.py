from pydantic import BaseModel
from typing import List, Optional

class Transaction(BaseModel):
    transaction_id: str
    amount: float
    merchant: str
    timestamp: str  # ISO format
    features: List[float]  # Pre-processed feature vector

class PredictionResponse(BaseModel):
    transaction_id: str
    is_fraud: bool
    confidence: float
    blockchain_tx_hash: Optional[str] = None
    shap_values: Optional[List[float]] = None
    lime_explanation: Optional[str] = None