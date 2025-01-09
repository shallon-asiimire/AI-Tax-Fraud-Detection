import Chart from 'chart.js/auto';
import * as d3 from 'd3';

export function createTrainingChart(history, chartId) {
  const ctx = document.getElementById(chartId);
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: history.epoch.length }, (_, i) => i + 1),
      datasets: [
        {
          label: 'Training Accuracy',
          data: history.history.acc,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Validation Accuracy',
          data: history.history.val_acc,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Model Training Progress'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Accuracy'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Epoch'
          }
        }
      }
    }
  });
}

export function createTaxDataVisualization(taxData, containerId) {
  const container = document.getElementById(containerId);
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 60 };
  
  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height);
    
  const labels = [
    'Total Income',
    'Deductions',
    'Business Income',
    'Net Profit'
  ];
  
  const data = [
    taxData[0],
    taxData[1],
    taxData[2],
    taxData[5]
  ];
  
  const xScale = d3.scaleBand()
    .domain(labels)
    .range([margin.left, width - margin.right])
    .padding(0.1);
    
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([height - margin.bottom, margin.top]);
    
  // Add bars
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(labels[i]))
    .attr('y', d => yScale(d))
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - margin.bottom - yScale(d))
    .attr('fill', 'steelblue');
    
  // Add axes
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(xScale));
    
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(yScale));
    
  return svg.node();
}

export function getRiskLevel(probability) {
  if (probability < 0.2) return 'Low Risk';
  if (probability < 0.6) return 'Medium Risk';
  return 'High Risk';
}