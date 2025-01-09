export const TransformerConfig = {
  API_TOKEN: 'hf_dummy_api_token',
  MODEL_CONFIG: {
    model: 'gpt2',
    parameters: {
      max_length: 150,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.2
    }
  },
  RESPONSE_PATTERNS: {
    RISK_FACTORS: 'Risk Factors:',
    RECOMMENDATIONS: 'Recommendations:',
    SUSPICIOUS_PATTERNS: 'Suspicious Patterns:'
  }
};