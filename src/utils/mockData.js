export function generateMockData(numSamples = 1000) {
  const data = [];
  const labels = [];

  for (let i = 0; i < numSamples; i++) {
    // Generate realistic-looking mock tax return data
    const taxReturn = {
      totalIncome: Math.random() * 500000 + 20000,
      deductions: Math.random() * 50000,
      businessIncome: Math.random() * 100000,
      dependents: Math.floor(Math.random() * 5),
      yearsOfHistory: Math.floor(Math.random() * 30),
      netProfit: Math.random() * 100000 - 10000,
      charityPercentage: Math.random() * 30
    };

    // Convert to feature array
    const features = [
      taxReturn.totalIncome,
      taxReturn.deductions,
      taxReturn.businessIncome,
      taxReturn.dependents,
      taxReturn.yearsOfHistory,
      taxReturn.netProfit,
      taxReturn.charityPercentage
    ];

    // Generate label (fraud or not) based on some rules
    const isFraud = (
      (taxReturn.deductions / taxReturn.totalIncome > 0.7) ||
      (taxReturn.charityPercentage > 25 && taxReturn.totalIncome < 50000) ||
      (taxReturn.businessIncome > taxReturn.totalIncome) ||
      (Math.random() < 0.05) // Random noise
    );

    data.push(features);
    labels.push(isFraud ? 1 : 0);
  }

  return { data, labels };
}