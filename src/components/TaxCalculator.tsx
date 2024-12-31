import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateTax, analyzeSentiment } from '../utils/calculations';
import type { TaxCalculation } from '../types';

interface TaxCalculatorProps {
  totalPayments: number;
  onCalculate: (calculation: TaxCalculation) => void;
}

export default function TaxCalculator({ totalPayments, onCalculate }: TaxCalculatorProps) {
  const [taxRate, setTaxRate] = useState(20);

  const handleCalculate = () => {
    const taxDue = calculateTax(totalPayments, taxRate);
    const sentiment = analyzeSentiment(taxDue, totalPayments);
    onCalculate({ totalPayments, taxRate, taxDue, sentiment });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Tax Calculator</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
        <input
          type="number"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          min="0"
          max="100"
        />
      </div>

      <div className="pt-2">
        <button
          onClick={handleCalculate}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Tax
        </button>
      </div>
    </div>
  );
}