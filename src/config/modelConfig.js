export const MODEL_CONFIG = {
  numFeatures: 7,
  epochs: 50,
  learningRate: 0.001,
  validationSplit: 0.2,
  layers: {
    input: {
      units: 64,
      activation: 'relu'
    },
    hidden: {
      units: 32,
      activation: 'relu'
    },
    output: {
      units: 1,
      activation: 'sigmoid'
    }
  },
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
};