const axios = require("axios");


const fetchCoinDetails = async (coinIds) => {

    if(!coinIds.length)return Promise.reject("Invalid Coin IDs: The coinIds array is empty.");

    const url = process.env.GECKO_API_URL;

    try {
        const response = await axios.get(url, {
            params: {
                vs_currency: "usd",
                ids: coinIds.join(","), // Join the coin IDs for the API request
            },
            
        });

        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching coin details from CoinGecko:", error);
        throw error; // Rethrow the error to handle it further up the chain if necessary
    }
};

module.exports = { fetchCoinDetails };