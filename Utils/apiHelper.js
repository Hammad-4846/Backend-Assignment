// Utility function to calculate standard deviation
const calculateStandardDeviation = (prices) => {
  const mean = prices.reduce((acc, val) => acc + val, 0) / prices.length;
  const deviation =
    prices.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
    prices.length;
  return Math.sqrt(deviation);
};

module.exports = {
  calculateStandardDeviation,
};
