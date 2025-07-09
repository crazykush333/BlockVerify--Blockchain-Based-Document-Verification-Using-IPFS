import { NextApiRequest, NextApiResponse } from 'next';

const sample = Array.from({ length: 30 }).map((_, i) => {
  const is_fraud = Math.random() < 0.3;
  return {
    transaction_id: `TXN-${i + 1}`,
    amount: +(Math.random() * 5000).toFixed(2),
    is_fraud,
    confidence: +(Math.random() * 0.5 + (is_fraud ? 0.5 : 0.3)).toFixed(2),
    blockchain_tx_hash: null,
  };
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(sample);
}