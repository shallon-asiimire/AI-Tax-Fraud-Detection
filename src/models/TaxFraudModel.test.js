import { expect, test, describe } from 'vitest';
import { TaxFraudModel } from './TaxFraudModel.js';
import { generateMockData } from '../utils/mockData.js';

describe('TaxFraudModel', () => {
  test('model initialization', () => {
    const model = new TaxFraudModel();
    expect(model).toBeDefined();
    expect(model.model).toBeDefined();
  });

  test('prediction returns probability between 0 and 1', async () => {
    const model = new TaxFraudModel();
    const sampleFeatures = [
      250000,  // totalIncome
      30000,   // deductions
      50000,   // businessIncome
      2,       // dependents
      10,      // yearsOfHistory
      45000,   // netProfit
      5        // charityPercentage
    ];

    const prediction = await model.predict(sampleFeatures);
    expect(prediction).toBeGreaterThanOrEqual(0);
    expect(prediction).toBeLessThanOrEqual(1);
  });

  test('mock data generation', () => {
    const { data, labels } = generateMockData(100);
    expect(data.length).toBe(100);
    expect(labels.length).toBe(100);
    expect(data[0].length).toBe(7); // Number of features
    labels.forEach(label => {
      expect(label).toBeTypeOf('number');
      expect(label).toBeLessThanOrEqual(1);
      expect(label).toBeGreaterThanOrEqual(0);
    });
  });
});