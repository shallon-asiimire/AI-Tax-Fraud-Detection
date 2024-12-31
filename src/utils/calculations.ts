export const calculateTax = (totalPayments: number, taxRate: number): number => {
  return totalPayments * (taxRate / 100);
};

export const analyzeSentiment = (taxDue: number, totalPayments: number): string => {
  const ratio = taxDue / totalPayments;
  
  if (ratio <= 0.15) return "Your tax burden is relatively low! 🎉";
  if (ratio <= 0.25) return "Your tax rate is within normal range. 👍";
  if (ratio <= 0.35) return "Your tax burden is moderately high. 😐";
  return "Consider tax planning strategies to reduce your burden. 🤔";
};