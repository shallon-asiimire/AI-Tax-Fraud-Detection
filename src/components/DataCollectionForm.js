export class DataCollectionForm {
  constructor(containerId, onSubmit) {
    this.container = document.getElementById(containerId);
    this.onSubmit = onSubmit;
    this.render();
  }

  render() {
    const form = document.createElement('form');
    form.className = 'data-collection-form';
    form.innerHTML = `
      <div class="form-group">
        <label for="totalIncome">Total Income (UGX)</label>
        <input type="number" id="totalIncome" required min="0" max="1000000" step="1000">
      </div>
      
      <div class="form-group">
        <label for="deductions">Total Deductions (UGX)</label>
        <input type="number" id="deductions" required min="0" max="100000" step="100">
      </div>
      
      <div class="form-group">
        <label for="businessIncome">Business Income (UGX)</label>
        <input type="number" id="businessIncome" required min="0" max="100000" step="100">
      </div>
      
      <div class="form-group">
        <label for="dependents">Number of Dependents</label>
        <input type="number" id="dependents" required min="0" max="100" step="1">
      </div>
      
      <div class="form-group">
        <label for="yearsOfHistory">Years of Tax History</label>
        <input type="number" id="yearsOfHistory" required min="0" max="50" step="1">
      </div>
      
      <div class="form-group">
        <label for="netProfit">Net Profit/Loss (UGX)</label>
        <input type="number" id="netProfit" required min="-100000" max="100000" step="100">
      </div>
      
      <div class="form-group">
        <label for="charityPercentage">Charitable Contributions (%)</label>
        <input type="number" id="charityPercentage" required min="0" max="100" step="0.1">
      </div>
      
      <button type="submit" class="submit-button">Analyze Tax Return</button>
    `;

    form.addEventListener('submit', this.handleSubmit.bind(this));
    this.container.appendChild(form);
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const formData = [
      parseFloat(document.getElementById('totalIncome').value),
      parseFloat(document.getElementById('deductions').value),
      parseFloat(document.getElementById('businessIncome').value),
      parseFloat(document.getElementById('dependents').value),
      parseFloat(document.getElementById('yearsOfHistory').value),
      parseFloat(document.getElementById('netProfit').value),
      parseFloat(document.getElementById('charityPercentage').value)
    ];

    this.onSubmit(formData);
  }
}