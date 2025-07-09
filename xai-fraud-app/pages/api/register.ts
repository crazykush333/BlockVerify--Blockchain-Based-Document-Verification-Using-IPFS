import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, phone, password } = req.body;
  // TODO: Add DB user creation & OTP verification
  console.log('Register', { email, phone, password });
  return res.status(200).json({ message: 'Registered (stub)' });
}