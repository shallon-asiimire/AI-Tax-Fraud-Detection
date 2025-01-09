export function validateTaxReturn(taxReturn) {
  const validations = [
    {
      value: taxReturn[0], // totalIncome
      min: 0,
      max: 1000000,
      name: 'Total Income'
    },
    {
      value: taxReturn[1], // deductions
      min: 0,
      max: 100000,
      name: 'Deductions'
    },
    {
      value: taxReturn[2], // businessIncome
      min: 0,
      max: 100000,
      name: 'Business Income'
    },
    {
      value: taxReturn[3], // dependents
      min: 0,
      max: 100,
      name: 'Dependents'
    },
    {
      value: taxReturn[4], // yearsOfHistory
      min: 0,
      max: 50,
      name: 'Years of History'
    },
    {
      value: taxReturn[5], // netProfit
      min: -100000,
      max: 100000,
      name: 'Net Profit'
    },
    {
      value: taxReturn[6], // charityPercentage
      min: 0,
      max: 100,
      name: 'Charity Percentage'
    }
  ];

  for (const validation of validations) {
    if (isNaN(validation.value)) {
      throw new Error(`${validation.name} must be a valid number`);
    }
    if (validation.value < validation.min || validation.value > validation.max) {
      throw new Error(`${validation.name} must be between ${validation.min} and ${validation.max}`);
    }
  }

  return true;
}