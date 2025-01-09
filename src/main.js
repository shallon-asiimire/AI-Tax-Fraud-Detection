import { PredictionService } from './services/predictionService.js';
import { ResultsDisplay } from './components/ResultsDisplay.js';
import { DataCollectionForm } from './components/DataCollectionForm.js';
import { LoadingIndicator } from './components/LoadingIndicator.js';
import { ErrorHandler } from './utils/errorHandler.js';
import { validateTaxReturn } from './utils/validationUtils.js';

let predictionService = null;
let loadingIndicator = null;
let errorHandler = null;

async function analyzeTaxReturn(taxReturn) {
  try {
    validateTaxReturn(taxReturn);
    loadingIndicator.show();
    
    const trainingHistory = await predictionService.trainModel();
    const { probability, transformerAnalysis } = await predictionService.predictFraud(taxReturn);
    
    const resultsDisplay = new ResultsDisplay('app');
    resultsDisplay.displayResults(probability, trainingHistory, taxReturn, transformerAnalysis);
  } catch (error) {
    errorHandler.handleError(error);
  } finally {
    loadingIndicator.hide();
  }
}

async function init() {
  try {
    predictionService = new PredictionService();
    loadingIndicator = new LoadingIndicator('app');
    errorHandler = new ErrorHandler('app');
    
    new DataCollectionForm('app', analyzeTaxReturn);
  } catch (error) {
    errorHandler.handleError(error, 'Application initialization failed');
  }
}

init();

window.addEventListener('unload', () => {
  if (predictionService) {
    predictionService.dispose();
  }
});