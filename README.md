# BlockVerify--Blockchain-Based-Document-Verification-Using-IPFS
A decentralized web-based solution for tamper-proof document storage and verification. This application leverages smart contracts deployed on the Polygon blockchain and integrates with IPFS (InterPlanetary File System) for decentralized file storage.

## 🚀 Highlights

🔐 Integrity-First: Hashes stored on-chain ensure document immutability

🌍 No Central Gatekeeper: Permissionless verification by design

⚡ Frictionless UX: Simplified upload/verify flow via connected MetaMask wallet

🗂️ Supports Many Formats: Upload PDFs, images, certificates, or other digital files

👨‍💼 Role-Based Access: Admin-exporter system for controlled submission

## ⚙️ System Prerequisites

Before you dive in, make sure you’ve got the essentials set up:

🧩 **Node.js & npm**  
- Core environment for running and building the project.  

🦊 **MetaMask Browser Extension**  
- For interacting with the blockchain directly from your browser.    

⛽ **Polygon Testnet Access**  
- You’ll need some free MATIC tokens for testing.  
 
🌀 **IPFS Client** *(Optional)*  
- Decentralized file storage tool — skip for now if IPFS isn't available.  

## 🔧 Installation

Get the project up and running with these quick steps:

📂 **Clone the Repository**  
  - Grab the source code into your local machine:  
  ``https://github.com/crazykush333/BlockVerify--Blockchain-Based-Document-Verification-Using-IPFS.git``

 📦 Install Dependencies and make sure all required Node.js packages are ready
 
 🦊 Set Up MetaMask
   - Create a MetaMask wallet (or use an existing one)
   - Add the Polygon (MATIC) Testnet to your MetaMask
   - 💰 Load test MATIC tokens → Use [Polygon Faucet](https://faucet.polygon.technology/)

 🧱 Deploy Smart Contract
   - Go to Remix IDE and connect MetaMask
   - Load and deploy the .sol contract
   - Copy the deployed contract address

🔌 Integrate Smart Contract
   - Paste the smart contract address into the appropriate place in your frontend code

 🌐 Run the Application
   - Launch the project using the Live Server extension or any static file server
   - Visit the site in your browser

 🔐 Connect & Assign Roles
   - Connect your MetaMask wallet to the site
   - Use one wallet to promote another to Admin

 📄 Upload & Verify Documents
   - Admin registers exporter accounts
   - Exporters upload documents
   - The system stores file in IPFS and its hash on-chain
   - 🎯 Verify authenticity using the stored hash 

## 🚀 Usage Guide

Once you're all set up, here's how to interact with the system:

👤 **Admin Login & Role Assignment**
  - Launch the web app in your browser
  - Connect your MetaMask wallet
  - Use one account to promote another as **Admin**

 ➕ **Add Exporter**
  - Admin clicks "Add Exporter"
  - Input the Ethereum address of a trusted user

 📤 **Upload Documents**
  - Exporter selects a file (PDF, image, certificate, etc.)
  - File gets stored on IPFS
  - The document's hash is stored securely on the blockchain

  🛡️ **Verify Documents**
  - Anyone can input a hash to verify its authenticity
  - The system cross-checks IPFS and on-chain data
  - ✅ Returns validity if hashes match  
  - ❌ Flags inconsistency for mismatched or tampered files

## 📝 License

This project is released under the [MIT License](./LICENSE.md).  
Feel free to use, modify, and distribute as per the terms outlined.

---

## 🙌 Acknowledgments

A huge shoutout to the tools and communities that made this project possible:

- 🦊 [**MetaMask**](https://metamask.io/) — For enabling seamless blockchain interactions through browser-based wallets  
- ⚙️ [**Solidity**](https://docs.soliditylang.org/) — The backbone of our smart contract logic  
- 🔗 [**Web3.js**](https://web3js.readthedocs.io/) — JavaScript library for communicating with Ethereum  
- 🌀 [**IPFS**](https://docs.ipfs.tech/) — For distributed file storage and content addressing  
- 🧪 [**Truffle Suite**](https://trufflesuite.com/) — Streamlining smart contract compilation and testing

> 💡 Special thanks to the open-source community for their inspiration and constant innovation.


## 🖼️ Sample Output

### 🔐 1. Login
User securely connects their MetaMask wallet to the dApp  
![Login](./assets/output/login.png)

---

### 🏠 2. Homepage
View of the application's landing dashboard  
![Homepage 1](https://github.com/crazykush333/BlockVerify--Blockchain-Based-Document-Verification-Using-IPFS/assets/128953212/6b450e79-39e0-4d38-9933-1b190be948f9)  
![Homepage 2](https://github.com/crazykush333/BlockVerify--Blockchain-Based-Document-Verification-Using-IPFS/assets/128953212/2c848495-628f-47b3-8d23-84158f07198c)

---

### 👩‍💼 3. Admin - Add Exporter
Admin dashboard to assign exporters who can upload documents  
![Admin Exporter](https://github.com/NimishKushwaha/BlockVerify---An-IPFS-Based-Document-Verification-using-Blockchain/assets/128953212/c3bef3ac-0215-432a-82b2-9306b2f63146)

---

### 📤 4. Upload a Document
Exporter uploads a document → it gets hashed & pinned to IPFS  
![Upload Step 1](https://github.com/NimishKushwaha/BlockVerify---An-IPFS-Based-Document-Verification-using-Blockchain/assets/128953212/13b63fe2-b681-4d4f-a5fa-aa9910a3f5ea)  
![Upload Step 2](https://github.com/NimishKushwaha/BlockVerify---An-IPFS-Based-Document-Verification-using-Blockchain/assets/128953212/3dc0e9de-2a09-4c57-a8c5-bf0758574e3b)

---

### 🔍 5. Verify a Document
Users can check authenticity by comparing hashes  
![Verify Document](https://github.com/NimishKushwaha/BlockVerify---An-IPFS-Based-Document-Verification-using-Blockchain/assets/128953212/5710d5c1-629c-41e5-af57-62c8e970b7ba)

  
