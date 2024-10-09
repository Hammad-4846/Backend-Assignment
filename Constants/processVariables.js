const DEVIATION_HISTORY_LENGTH = -99; // Number of price deviations to keep in the database
const CRON_JOB_TIME = 7200000; // Cron job time in milliseconds

module.exports = {DEVIATION_HISTORY_LENGTH, CRON_JOB_TIME}