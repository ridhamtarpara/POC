/**
 * Main Routes File for POC API
 */

const express = require('express');

const router = express.Router();    // eslint-disable-line new-cap
const currencyRoutes = require('./currency');

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => {
    res.send('OK');
});

router.use('/', currencyRoutes);

module.exports = router;
