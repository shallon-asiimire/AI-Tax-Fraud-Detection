export class LoadingIndicator {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.element = null;
  }

  show() {
    this.element = document.createElement('div');
    this.element.className = 'loading-indicator';
    this.element.innerHTML = `
      <div class="spinner"></div>
      <p>Analyzing tax return data...</p>
    `;
    this.container.appendChild(this.element);
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}