// app.js
const express = require("express");
const morgan = require("morgan");// Package for Logging 
const cors = require("cors");// Package for CORS 
const { startCronJob } = require('./Utils/cronJob'); // Cron Job Function
const { COIN_IDS } = require("./Constants/details");//To Add Constant Details
const cryptoRouter = require("./Routes/crypto.router");


const app = express();


// Middleware for parsing JSON requests
app.use(express.json());

// CORS configuration(optional for FRONTEND)
const origin = process.env.ORIGIN;
app.use(cors({ credentials: true, origin }));

// Logging middleware
app.use(morgan("common"));



// Start the cron job
startCronJob(COIN_IDS); //coin IDs 

// Routes for handling crupto data 
app.get("/", (req, res) => {
    res.status(200).send("Welcome to KoinX Crypto API");
})
app.use("/api/v1", cryptoRouter);

module.exports = app; // Export the app instance
