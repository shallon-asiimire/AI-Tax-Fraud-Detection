import React from 'react';
import type { TaxCalculation } from '../types';

interface TaxSummaryProps {
  calculation: TaxCalculation | null;
}

export default function TaxSummary({ calculation }: TaxSummaryProps) {
  if (!calculation) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Tax Summary</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Total Payments</p>
          <p className="text-lg font-semibold">UGX{calculation.totalPayments.toFixed(2)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Tax Rate</p>
          <p className="text-lg font-semibold">{calculation.taxRate}%</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Tax Due</p>
          <p className="text-lg font-semibold text-red-600">UGX{calculation.taxDue.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-gray-50 rounded-md">
        <p className="text-sm text-gray-700">{calculation.sentiment}</p>
      </div>
    </div>
  );
}