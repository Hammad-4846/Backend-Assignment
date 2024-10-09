const CryptoData = require("../Models/CryptoData.model"); // model
const { fetchCoinDetails } = require("../Services/coinDetails.service");
const { CRON_JOB_TIME } = require("../Constants/processVariables");


// Function to fetch crypto data from CoinGecko
const getCryptoData = async (coinIds) => {
    // to check if coinIds is an array and has at least one item
    if (!Array.isArray(coinIds) || coinIds.length === 0) {
        console.error("Invalid Coin IDs: The coinIds array is empty.");
        return; 
    }

    try {
        // Use the fetchCoinDetails function to get data
        const cryptoDataArray = await fetchCoinDetails(coinIds);

        if (!cryptoDataArray.length) {
            console.error("No data found for the requested coin.");
            return;
        }
        
        // Iterate through each coin's data and update MongoDB
        for (let coinData of cryptoDataArray) {
            const {
                id: coinName,
                current_price: price,
                market_cap: marketCap,
                price_change_percentage_24h: change24h,
            } = coinData;

            // Find if the coin record exists in the database
            const existingCrypto = await CryptoData.findOne({ coinName });

            if (existingCrypto) {
                // Push the old price to pastPrice array and update the new values
                await CryptoData.updateOne(
                    { coinName },
                    {
                        $push: { pastPrice: existingCrypto.price }, // Push the current price into pastPrice array
                        $set: {
                            price, // Update with new price
                            marketCap, // Update market cap
                            change24h, // Update 24h change
                            timestamp: Date.now(), // Update the timestamp to the current time
                        },
                    }
                );
                console.log(`${coinName} data updated in database`);
            } else {
                // If the record doesn't exist, create a new one
                const newCrypto = new CryptoData({
                    coinName,
                    price,
                    marketCap,
                    change24h,
                    pastPrice: [], // Start with an empty pastPrice array(optional, as default value is there)
                });

                await newCrypto.save();
                console.log(`${coinName} data saved to database`);
            }
        }
    } catch (error) {
        console.error("Error fetching data from CoinGecko", error);
    }
};

// Start the cron job and fetch data immediately
const startCronJob = async (Coinid) => {
    console.log("Fetching crypto data for the first time...");
    await getCryptoData(Coinid); // Fetch data immediately on app start
    console.log("Crypto data fetched and processed");

    // Using setInterval to run the job every 2 hour
    //NOTE : AS the Process is small and time span is large , time ellapsed probability is less, that's why we can use SetInterval. for more accurate time cron-job module can be helpful
    setInterval(async () => {
        console.log("Fetching crypto data...");
        await getCryptoData(Coinid);
        console.log("Crypto data fetched and processed");
    }, CRON_JOB_TIME); 
};

module.exports = { startCronJob }; // Exporting the function
