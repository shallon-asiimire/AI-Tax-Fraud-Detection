import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { TaxPayment } from '../types';

interface TaxPaymentFormProps {
  onSubmit: (payment: TaxPayment) => void;
}

export default function TaxPaymentForm({ onSubmit }: TaxPaymentFormProps) {
  const [payment, setPayment] = useState({
    amount: '',
    description: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payment.amount || !payment.description || !payment.dueDate) return;

    onSubmit({
      id: crypto.randomUUID(),
      amount: Number(payment.amount),
      date: new Date().toISOString(),
      description: payment.description,
      dueDate: payment.dueDate,
    });

    setPayment({ amount: '', description: '', dueDate: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          value={payment.amount}
          onChange={(e) => setPayment(prev => ({ ...prev, amount: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={payment.description}
          onChange={(e) => setPayment(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Payment description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={payment.dueDate}
          onChange={(e) => setPayment(prev => ({ ...prev, dueDate: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Add Payment
      </button>
    </form>
  );
}