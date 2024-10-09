const { COIN_IDS } = require("../Constants/details");
const { DEVIATION_HISTORY_LENGTH } = require("../Constants/processVariables");
const CryptoData = require("../Models/CryptoData.model");
const { calculateStandardDeviation } = require("../Utils/apiHelper");
const { success, error } = require("../Utils/responseWrapper");
// Controller function for /stats
exports.getCryptoStats = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin || !COIN_IDS.includes(coin)) {
      return res
        .status(400)
        .send(error(400, "Invalid or missing coin parameter"));
    }

    // Fetch the latest data for the requested coin
    const latestData = await CryptoData.findOne({ coinName: coin });

    if (!latestData) {
      return res
        .status(404)
        .send(error(404, "No data found for the requested coin"));
    }

    // Return the latest price, market cap, and 24h change
    return res.status(200).send(
      success(200, {
        price: latestData.price,
        marketCap: latestData.marketCap,
        "24hChange": latestData.change24h,
      })
    );
  } catch (e) {
    return res.status(500).send(error(500, "Server error while fetching data"));
  }
};

// Controller function for /deviation
exports.getCryptoPriceDeviation = async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin || !COIN_IDS.includes(coin)) {
      return res
        .status(400)
        .send(error(400, "Invalid or missing coin parameter"));
    }

    const cryptoData = await CryptoData.findOne({ coinName: coin });

    if (!cryptoData || cryptoData.pastPrice.length === 0) {
      return res
        .status(404)
        .send(error(404, "No data found for the requested coin"));
    }

    // Get the last  prices from the pastPrice array, including the current price as well
    const priceHistory = cryptoData.pastPrice
      .slice(DEVIATION_HISTORY_LENGTH) //How many data points to include
      .concat(cryptoData.price);//To include Current price 


    if (priceHistory.length < 2) {
      return res
        .status(400)
        .send(error(400, "Not enough price data to calculate deviation"));
    }

    // Calculate the standard deviation
    const standardDeviation = calculateStandardDeviation(priceHistory);

    if (isNaN(standardDeviation)) {
      return res
        .status(500)
        .send(error(500, "Server error while calculating deviation"));
    }

    // Check if the deviation is too small then return as itis 
    deviation = standardDeviation > 0.01 ? parseFloat(standardDeviation.toFixed(2)) : standardDeviation; 

    // Return the standard deviation
    return res.status(200).send(
      success(200, {
        deviation: deviation, 
      })
    );
  } catch (e) {
    return res.status(500).send(error(500, "Server error while fetching data"));
  }
};
