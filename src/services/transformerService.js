import { HfInference } from '@huggingface/inference';
import { TransformerConfig } from '../config/transformerConfig.js';
import { formatCurrency } from '../utils/formatUtils.js';
import { generateDefaultInsights } from '../utils/insightUtils.js';

export class TransformerService {
  constructor() {
    this.hf = new HfInference(TransformerConfig.API_TOKEN);
    this.modelConfig = TransformerConfig.MODEL_CONFIG;
  }

  async analyzeAnomalies(taxData) {
    try {
      if (!this.isValidTaxData(taxData)) {
        throw new Error('Invalid tax data provided');
      }

      const prompt = this.generatePrompt(taxData);
      const response = await this.hf.textGeneration({
        model: this.modelConfig.model,
        inputs: prompt,
        parameters: this.modelConfig.parameters
      });
      
      return this.parseResponse(response.generated_text);
    } catch (error) {
      console.error('Transformer analysis error:', error);
      return generateDefaultInsights(taxData);
    }
  }

  isValidTaxData(taxData) {
    return Array.isArray(taxData) && 
           taxData.length === 7 && 
           taxData.every(value => typeof value === 'number');
  }

  generatePrompt(taxData) {
    const [totalIncome, deductions, businessIncome, dependents, yearsHistory, netProfit, charityPercentage] = taxData;
    
    return `Analyze this tax return for potential fraud indicators:
      Total Income: ${formatCurrency(totalIncome)}
      Deductions: ${formatCurrency(deductions)}
      Business Income: ${formatCurrency(businessIncome)}
      Dependents: ${dependents}
      Years of History: ${yearsHistory}
      Net Profit: ${formatCurrency(netProfit)}
      Charity Percentage: ${charityPercentage}%
      
      Provide a detailed analysis with:
      1. Risk Factors:
      2. Recommendations:
      3. Suspicious Patterns:`;
  }

  parseResponse(text) {
    try {
      return {
        risk_factors: this.extractPatterns(text, 'Risk Factors?:'),
        recommendations: this.extractPatterns(text, 'Recommendations?:'),
        suspicious_patterns: this.extractPatterns(text, 'Suspicious Patterns?:'),
        confidence: this.calculateConfidence(text)
      };
    } catch (error) {
      console.error('Response parsing error:', error);
      return generateDefaultInsights();
    }
  }

  extractPatterns(text, pattern) {
    const regex = new RegExp(`${pattern}([^\\n]+)`, 'gi');
    const matches = text.match(regex) || [];
    return matches.map(match => match.replace(new RegExp(pattern, 'i'), '').trim());
  }

  calculateConfidence(text) {
    // Simple confidence calculation based on response completeness
    const hasRiskFactors = text.includes('Risk Factors');
    const hasRecommendations = text.includes('Recommendations');
    const hasSuspiciousPatterns = text.includes('Suspicious Patterns');
    
    return (hasRiskFactors + hasRecommendations + hasSuspiciousPatterns) / 3;
  }
}