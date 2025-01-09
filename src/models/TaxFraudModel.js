import * as tf from '@tensorflow/tfjs';
import { normalizeData } from '../utils/dataPreprocessing.js';
import { MODEL_CONFIG } from '../config/modelConfig.js';

export class TaxFraudModel {
  constructor() {
    this.model = this.buildModel();
    this.trainingHistory = {
      epoch: [],
      history: {
        acc: [],
        val_acc: [],
        loss: [],
        val_loss: []
      }
    };
  }

  buildModel() {
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
      units: MODEL_CONFIG.layers.input.units,
      activation: MODEL_CONFIG.layers.input.activation,
      inputShape: [MODEL_CONFIG.numFeatures]
    }));
    
    model.add(tf.layers.dense({
      units: MODEL_CONFIG.layers.hidden.units,
      activation: MODEL_CONFIG.layers.hidden.activation
    }));
    
    model.add(tf.layers.dense({
      units: MODEL_CONFIG.layers.output.units,
      activation: MODEL_CONFIG.layers.output.activation
    }));
    
    model.compile({
      optimizer: tf.train.adam(MODEL_CONFIG.learningRate),
      loss: MODEL_CONFIG.loss,
      metrics: MODEL_CONFIG.metrics
    });
    
    return model;
  }

  async train(features, labels, epochs = MODEL_CONFIG.epochs) {
    try {
      const normalizedFeatures = normalizeData(features);
      
      const xs = tf.tensor2d(normalizedFeatures);
      const ys = tf.tensor2d(labels, [labels.length, 1]);
      
      const history = await this.model.fit(xs, ys, {
        epochs,
        validationSplit: MODEL_CONFIG.validationSplit,
        callbacks: {
          onEpochEnd: (epoch, logs) => {
            this.trainingHistory.epoch.push(epoch);
            this.trainingHistory.history.acc.push(logs.acc);
            this.trainingHistory.history.val_acc.push(logs.val_acc);
            this.trainingHistory.history.loss.push(logs.loss);
            this.trainingHistory.history.val_loss.push(logs.val_loss);
            
            console.log(`Epoch ${epoch + 1}: loss = ${logs.loss.toFixed(4)}, accuracy = ${logs.acc.toFixed(4)}`);
          }
        }
      });

      xs.dispose();
      ys.dispose();
      
      return this.trainingHistory;
    } catch (error) {
      throw new Error(`Training failed: ${error.message}`);
    }
  }

  async predict(features) {
    try {
      const normalizedFeatures = normalizeData([features])[0];
      const inputTensor = tf.tensor2d([normalizedFeatures]);
      
      const prediction = await this.model.predict(inputTensor);
      const result = prediction.dataSync()[0];
      
      inputTensor.dispose();
      prediction.dispose();
      
      return result;
    } catch (error) {
      throw new Error(`Prediction failed: ${error.message}`);
    }
  }

  dispose() {
    if (this.model) {
      this.model.dispose();
    }
  }
}