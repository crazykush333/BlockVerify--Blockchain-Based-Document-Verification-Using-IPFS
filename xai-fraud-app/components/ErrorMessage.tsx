import React from 'react';

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null;
  return (
    <div className="p-4 bg-red-100 text-red-800 rounded">
      {message}
    </div>
  );
}