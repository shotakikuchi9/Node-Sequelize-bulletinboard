const express = require('express');
const router = express.Router();
require('./post')(router);
require('./user')(router);
module.exports = router;
