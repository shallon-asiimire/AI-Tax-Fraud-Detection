// Normalize features to range [0, 1]
export function normalizeData(features) {
  // Ensure features is an array of arrays
  const featureArrays = Array.isArray(features[0]) ? features : [features];
  const normalizedFeatures = [];
  
  for (const feature of featureArrays) {
    const normalizedRow = feature.map((value, index) => {
      const min = getFeatureMin(index);
      const max = getFeatureMax(index);
      return (value - min) / (max - min);
    });
    normalizedFeatures.push(normalizedRow);
  }
  
  return normalizedFeatures;
}

// Define feature ranges based on domain knowledge
function getFeatureMin(featureIndex) {
  const minimums = [0, 0, 0, 0, 0, -100000, 0];
  return minimums[featureIndex];
}

function getFeatureMax(featureIndex) {
  const maximums = [1000000, 100000, 100000, 100, 50, 100000, 100];
  return maximums[featureIndex];
}