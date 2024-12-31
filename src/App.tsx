import React, { useState } from 'react';
import { Receipt } from 'lucide-react';
import TaxPaymentForm from './components/TaxPaymentForm';
import PaymentsList from './components/PaymentsList';
import TaxCalculator from './components/TaxCalculator';
import TaxSummary from './components/TaxSummary';
import type { TaxPayment, TaxCalculation } from './types';

function App() {
  const [payments, setPayments] = useState<TaxPayment[]>([]);
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null);

  const handleAddPayment = (payment: TaxPayment) => {
    setPayments(prev => [...prev, payment]);
  };

  const handleDeletePayment = (id: string) => {
    setPayments(prev => prev.filter(payment => payment.id !== id));
  };

  const handleCalculate = (calculation: TaxCalculation) => {
    setCalculation(calculation);
  };

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center mb-8">
            <Receipt className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Tax Payment Calculator</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <TaxPaymentForm onSubmit={handleAddPayment} />
              <div className="mt-6">
                <TaxCalculator 
                  totalPayments={totalPayments}
                  onCalculate={handleCalculate}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <TaxSummary calculation={calculation} />
              <div className="mt-6">
                <PaymentsList 
                  payments={payments}
                  onDelete={handleDeletePayment}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;