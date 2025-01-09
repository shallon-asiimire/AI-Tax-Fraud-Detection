import { formatCurrency } from './formatUtils.js';

export function generateDefaultInsights(taxData) {
  if (!taxData) {
    return {
      risk_factors: ['Unable to analyze tax data'],
      recommendations: ['Please verify the provided information'],
      suspicious_patterns: [],
      confidence: 0
    };
  }

  const [totalIncome, deductions, businessIncome] = taxData;
  const insights = {
    risk_factors: [],
    recommendations: [],
    suspicious_patterns: [],
    confidence: 0.5
  };

  // Basic ratio analysis
  const deductionRatio = deductions / totalIncome;
  if (deductionRatio > 0.5) {
    insights.risk_factors.push(
      `High deduction ratio: ${formatCurrency(deductions)} deductions against ${formatCurrency(totalIncome)} income`
    );
  }

  if (businessIncome > totalIncome) {
    insights.suspicious_patterns.push(
      `Business income (${formatCurrency(businessIncome)}) exceeds total income (${formatCurrency(totalIncome)})`
    );
  }

  insights.recommendations.push(
    'Consider reviewing documentation for all claimed deductions',
    'Ensure all income sources are properly reported'
  );

  return insights;
}