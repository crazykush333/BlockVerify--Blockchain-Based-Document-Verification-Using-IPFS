# Blockchain-Enhanced Explainable AI Fraud Detection Portal

This repository contains a **full-stack, end-to-end** solution that merges **blockchain integrity** with **transparent AI** decisions to detect credit-card and online-transaction fraud for the Indian financial ecosystem.

## Monorepo Layout

```
.
├── contracts/               # Solidity smart contracts (Ethereum)
├── xai-fraud-app/           # Next.js 14 + Tailwind CSS front-end & API routes
├── backend/                 # Python FastAPI micro-service hosting the XAI model
├── scripts/                 # Helper scripts (model training, contract deployment)
└── docker-compose.yml       # One-command local development environment
```

## Tech Stack

• **Front-End**: React (Next.js 14), TypeScript, Tailwind CSS, Recharts, Zustand
• **Auth**: NextAuth.js (credentials + email / SMS OTP) secured with JWT & CSRF
• **Back-End**: FastAPI (Python 3.11), Scikit-Learn, SHAP, LIME
• **Blockchain**: Solidity smart contract deployed to Polygon Amoy (Ethereum-compatible) storing transaction hashes + model verdicts + confidence
• **ORM / DB**: Prisma ORM with PostgreSQL (user & session data)
• **Infrastructure**: Docker Compose, Nginx reverse proxy, Traefik TLS (optional)

## Core Features

1. **Secure Registration & Login** with rate-limited OTP via email/mobile.
2. **Personalized Dashboard** listing each transaction, its on-chain hash & cryptographic confidence.
3. **Real-Time Analytics**: pie charts, bar graphs & anomaly timelines (monthly / quarterly / yearly) with fraud severity coloring.
4. **Explainable AI**: SHAP / LIME local explanations available per transaction; global feature importance charts.
5. **PDF Export**: one-click export of the dashboard report & explanations.
6. **Blockchain Anchoring**: every model inference is condensed to a keccak256 hash & written on-chain to ensure immutability.

## Quick Start (Local)

```bash
# 1. Clone and enter repo
$ git clone <repo-url> && cd <repo-root>

# 2. Spin everything up (frontend, backend, postgres, hardhat node)
$ docker compose up --build

# 3. Visit the app
$ open http://localhost:3000
```

## Environment Variables
Create a `.env` file at repo root (see `.env.example`) including:
```
DATABASE_URL=postgresql://postgres:postgres@db:5432/xai_fraud
NEXTAUTH_SECRET=super-secret-string
JWT_SECRET=same-as-above
CHAIN_RPC_URL=http://hardhat:8545
PRIVATE_KEY=<deployer-private-key>
BACKEND_URL=http://backend:8000
```

## Production Deployment
The app can be deployed to **Vercel** (front-end), **Railway** (backend FastAPI) and **Polygon** for smart contracts.  Modify `docker-compose.yml` and environment secrets accordingly.
```