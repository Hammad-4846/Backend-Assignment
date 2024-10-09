const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  coinName: {
    type: String,
    required: [true, "Coin name is required"], // Required validation with a custom error message
    enum: ["bitcoin", "matic-network", "ethereum"], // Limit values to specific coins
  },
  price: {
    type: Number,
    required: [true, "Price is required"], // Required validation
    min: [0, "Price cannot be negative"], // Ensure the price is non-negative
  },
  marketCap: {
    type: Number,
    required: [true, "Market cap is required"], // Required validation
    min: [0, "Market cap cannot be negative"], // Ensure the market cap is non-negative
  },
  change24h: {
    type: Number,
    required: [true, "24h change is required"], // Required validation
  },
  pastPrice: {
    type: [Number], // An array of numbers
    default: [],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Create a model
const CryptoData = mongoose.model("CryptoData", cryptoSchema);
module.exports = CryptoData;

/*Description About the pastPrice
Instead of recalculating or sorting price data every time, we store an array called pastPrices where the past prices are pushed each time a new price is added. This avoids the need for constantly sorting records and allows for more efficient calculations, such as deviation 
*/
