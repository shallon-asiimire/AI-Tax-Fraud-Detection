import { createTrainingChart, createTaxDataVisualization, getRiskLevel } from '../utils/visualizationUtils.js';

export class ResultsDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  displayResults(fraudProbability, trainingHistory, taxData, transformerAnalysis) {
    const resultsDiv = document.createElement('div');
    resultsDiv.className = 'results';
    
    // Main prediction results
    const predictionDiv = document.createElement('div');
    predictionDiv.className = 'prediction-results';
    predictionDiv.innerHTML = `
      <h2>Fraud Detection Results</h2>
      <p>Probability of Fraud: ${(fraudProbability * 100).toFixed(2)}%</p>
      <p>Risk Level: ${getRiskLevel(fraudProbability)}</p>
    `;
    
    // Transformer insights
    const insightsDiv = document.createElement('div');
    insightsDiv.className = 'transformer-insights';
    insightsDiv.innerHTML = `
      <h3>AI Analysis Insights</h3>
      ${this.formatTransformerResults(transformerAnalysis)}
    `;
    
    // Charts container
    const chartsDiv = document.createElement('div');
    chartsDiv.className = 'charts-container';
    
    // Training history chart
    const trainingCanvas = document.createElement('canvas');
    trainingCanvas.id = 'trainingChart';
    chartsDiv.appendChild(trainingCanvas);
    
    // Tax data visualization
    const taxDataDiv = document.createElement('div');
    taxDataDiv.id = 'taxDataVisualization';
    chartsDiv.appendChild(taxDataDiv);
    
    // Combine all elements
    resultsDiv.appendChild(predictionDiv);
    resultsDiv.appendChild(insightsDiv);
    resultsDiv.appendChild(chartsDiv);
    
    // Clear previous results and add new ones
    this.container.querySelector('.results')?.remove();
    this.container.appendChild(resultsDiv);
    
    // Create visualizations
    createTrainingChart(trainingHistory, 'trainingChart');
    createTaxDataVisualization(taxData, 'taxDataVisualization');
  }

  formatTransformerResults(analysis) {
    if (!analysis || !analysis.risk_factors) {
      return '<p>No additional insights available.</p>';
    }

    return `
      <div class="risk-factors">
        <h4>Risk Factors</h4>
        <ul>
          ${analysis.risk_factors.map(factor => `<li>${factor}</li>`).join('')}
        </ul>
      </div>
      <div class="recommendations">
        <h4>Recommendations</h4>
        <ul>
          ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
      <p>Analysis Confidence: ${(analysis.confidence * 100).toFixed(1)}%</p>
    `;
  }
}