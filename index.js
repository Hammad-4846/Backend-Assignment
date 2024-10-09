const dbConnect = require("./Config/connectDb");
const dotenv = require("dotenv");

dotenv.config({ path: "./Config/.env" });

const startServer = async () => {
    try {
        // Connect to MongoDB
        const connect = await dbConnect();
        if (!connect) {
            console.error("Failed to connect to MongoDB");
            process.exit(1); // Exit if the connection fails
        }

        // Import app after successful DB connection
        const app = require("./app");

        // Start the Express server only if MongoDB connection is successful
        const PORT = process.env.PORT || 4001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); // Exit if the server fails to start
    }
};

startServer();
