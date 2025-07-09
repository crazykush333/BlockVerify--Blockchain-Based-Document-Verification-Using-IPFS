import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from 'recharts';

interface TxRow {
  transaction_id: string;
  amount: number;
  is_fraud: boolean;
  confidence: number;
  blockchain_tx_hash?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rows, setRows] = useState<TxRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
    if (status === 'authenticated') {
      fetchTransactions();
    }
  }, [status]);

  const fetchTransactions = async () => {
    setLoading(true);
    // In real app, fetch from backend
    try {
      const res = await axios.get('/api/demo-data'); // placeholder
      setRows(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fraudCounts = rows.reduce(
    (acc, row) => {
      row.is_fraud ? (acc.fraud += 1) : (acc.legit += 1);
      return acc;
    },
    { fraud: 0, legit: 0 }
  );

  const pieData = [
    { name: 'Fraudulent', value: fraudCounts.fraud },
    { name: 'Legitimate', value: fraudCounts.legit },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Logout
        </button>
      </header>

      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Fraud vs Legitimate</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="value" data={pieData} cx="50%" cy="50%" outerRadius={80} label>
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? '#EF4444' : '#10B981'}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Fraud Severity Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={rows.slice(0, 20)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="transaction_id" hide />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="confidence" stroke="#F59E0B" name="Confidence" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow overflow-auto">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Txn ID</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Confidence</th>
                  <th className="px-6 py-3">Blockchain</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rows.map((row) => (
                  <tr key={row.transaction_id}>
                    <td className="px-6 py-4 whitespace-nowrap">{row.transaction_id}</td>
                    <td className="px-6 py-4">₹{row.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      {row.is_fraud ? (
                        <span className="text-red-600 font-semibold">Fraud</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Legit</span>
                      )}
                    </td>
                    <td className="px-6 py-4">{(row.confidence * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4">
                      {row.blockchain_tx_hash ? (
                        <a
                          href={`https://polygonscan.com/tx/${row.blockchain_tx_hash}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}