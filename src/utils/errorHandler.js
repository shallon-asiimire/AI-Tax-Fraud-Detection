export class ErrorHandler {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  handleError(error, context = '') {
    console.error(context || 'Error occurred:', error);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    
    const errorMessage = this.formatErrorMessage(error, context);
    errorDiv.innerHTML = errorMessage;
    
    // Remove any existing error messages
    const existingError = this.container.querySelector('.error');
    if (existingError) {
      existingError.remove();
    }
    
    this.container.appendChild(errorDiv);
  }

  formatErrorMessage(error, context) {
    const userMessage = this.getUserFriendlyMessage(error);
    return `
      <h3>Error${context ? ': ' + context : ''}</h3>
      <p>${userMessage}</p>
      ${this.shouldShowTechnicalDetails(error) ? 
        `<details>
           <summary>Technical Details</summary>
           <pre>${error.stack || error.message}</pre>
         </details>` : 
        ''}
    `;
  }

  getUserFriendlyMessage(error) {
    if (error.message.includes('API_TOKEN')) {
      return 'Unable to connect to the analysis service. Please try again later.';
    }
    if (error.message.includes('tensor')) {
      return 'There was an issue processing the tax data. Please verify your inputs.';
    }
    return error.message || 'An unexpected error occurred. Please try again.';
  }

  shouldShowTechnicalDetails(error) {
    return process.env.NODE_ENV === 'development' || 
           error.message.includes('validation');
  }
}