import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!otpSent) {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/otp/send`, null, {
          params: { phone },
        });
        setOtpSent(true);
        setLoading(false);
        return;
      }

      // verify otp
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/otp/verify`, null, {
        params: { phone, code: otp },
      });

      // complete registration (stub)
      await axios.post('/api/register', { email, phone, password });
      router.push('/');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Mobile number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {otpSent && (
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter OTP"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            )}
          </div>
          {error && <ErrorMessage message={error} />}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800"
          >
            {otpSent ? 'Verify & Register' : 'Send OTP'}
          </button>
          {loading && <Spinner />}
        </form>
      </div>
    </div>
  );
}