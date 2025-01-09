import { TaxFraudModel } from '../models/TaxFraudModel.js';
import { TransformerService } from './transformerService.js';
import { generateMockData } from '../utils/mockData.js';

export class PredictionService {
  constructor() {
    this.model = new TaxFraudModel();
    this.transformerService = new TransformerService();
    this.isModelTrained = false;
  }

  async trainModel() {
    if (this.isModelTrained) {
      return this.model.trainingHistory;
    }

    const { data: trainingData, labels } = generateMockData(1000);
    const history = await this.model.train(trainingData, labels);
    this.isModelTrained = true;
    return history;
  }

  async predictFraud(taxReturn) {
    try {
      if (!Array.isArray(taxReturn) || taxReturn.length !== 7) {
        throw new Error('Invalid tax return data format');
      }
      
      // Get ML model prediction
      const probability = await this.model.predict(taxReturn);
      
      // Get transformer insights
      const transformerAnalysis = await this.transformerService.analyzeAnomalies(taxReturn);
      
      return {
        probability,
        transformerAnalysis
      };
    } catch (error) {
      throw new Error(`Prediction service error: ${error.message}`);
    }
  }

  dispose() {
    this.model.dispose();
  }
}