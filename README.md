# Cryptocurrency Data Fetcher

## Overview

This project is designed to fetch and store cryptocurrency data (such as price in USD, market cap, and 24-hour change) for Bitcoin, Matic, and Ethereum. The data is fetched at regular intervals and stored in a MongoDB database for further analysis.

## Project Structure
/project-root │ ├
── Controller # Contains controllers for handling requests 
├── Constants # Contains constant values and variables │ 
    ├── details.js # Constant details for cryptocurrency information │ 
    └── processVariables.js # Process variables like DEVIATION_HISTORY_LENGTH, CRON_JOB_TIME │ 
├── Config # Configuration files (e.g., for database connection) 
├── Models # Mongoose models for database schemas 
├── Services # service layer 
├── Utils # Utility functions │ 
  ├── cronJob.js # Cron job function for scheduling tasks │ 
  ├── apiHelper.js # Helper functions for calculations (e.g., standard deviation) │ 
  └── responseWrapper.js # Function to standardize API responses │ 
└── Routes # API routes for handling requests
