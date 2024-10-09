// app.js
const express = require("express");
const morgan = require("morgan");// Package for Logging 
const cors = require("cors");// Package for CORS 
const { startCronJob } = require('./Utils/cronJob'); // Cron Job Function
const { coinIds } = require("./Constants/details");//To Add Constant Details

const app = express();


// Middleware for parsing JSON requests
app.use(express.json());

// CORS configuration(optional for FRONTEND)
const origin = process.env.ORIGIN;
app.use(cors({ credentials: true, origin }));

// Logging middleware
app.use(morgan("common"));


//Routers
const cryptoRouter = require("./Routes/crypto.router");
app.use("/api/v1", cryptoRouter);

// Start the cron job
startCronJob(coinIds); // Pass your coin IDs here

// Routes for handling coin data can be added here

module.exports = app; // Export the app instance
