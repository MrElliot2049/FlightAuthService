const express = require('express');
const V1ApiRoutes = require('./v1/index');
const router = express.Router();

router.use('/v1',V1ApiRoutes);

module.exports = router;