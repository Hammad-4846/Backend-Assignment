const mongoose = require("mongoose");

module.exports = async () => {
    try {
        // Connect to MongoDB using the URI from environment variables
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);

        return connect;
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

