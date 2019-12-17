const express = require('express');
const { validate } = require('jsonschema');
const shortid = require('shortid');
const db = require('../db/db');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res, next) => {
  const {offset, name} = req.query;
  let transactions;
  if (!name || name === '') {
    transactions = db.get('transactionHistory')
      .filter((item, id) => id >= offset && id < Number(offset) + 5);
  } else {
    transactions = db.get('transactionHistory')
      .filter((transaction) => transaction.symbol.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        transaction.profile.companyName.toLowerCase().indexOf(name.toLowerCase()) !== -1)
      .filter((item, id) => id >= offset && id < Number(offset) + 5);
  }
  res.json({
    status: 'OK',
    data: transactions
  });
});

router.post('/search', (req, res, next) => {
  const { body } = req;

  const stockShema = {
    type: 'object',
    properties: {
      value: { type: 'string' },
    },
    required: ['value'],
    additionalProperties: false
  };

  const validatorResult = validate(body, stockShema);
  if (!validatorResult.valid) {
    return next(new Error('INVALID_JSON_OR_API_FORMAT'));
  }
  const data = db.get('transactionHistory')
    .filter((stock) => stock.symbol.toLowerCase().indexOf(body.value.toLowerCase()) !== -1 ||
      stock.profile.companyName.toLowerCase().indexOf(body.value.toLowerCase()) !== -1);
  res.json({
    status: 'OK',
    data: data
  });
});

module.exports = router;
