const express = require('express');
const { validate } = require('jsonschema');
const shortid = require('shortid');
const db = require('../db/db');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res, next) => {
  const transactions = db.get('transactionHistory').filter((item, id) => id >= req.query.offset && id < Number(req.query.offset) + 5);;
  res.json({
    status: 'OK',
    data: transactions
  });
});

module.exports = router;
