const express = require('express');
const { validate } = require('jsonschema');
const shortid = require('shortid');
const db = require('../db/db');
const router = express.Router();
const axios = require('axios');




router.get('/', (req, res, next) => {
  const {offset, name} = req.query;
  let stocks;
  if (!name || name === '') {
    stocks = db.get('stocks')
      .filter((item, id) => id >= offset && id < Number(offset) + 10);
  } else {
    stocks = db.get('stocks')
      .filter((stock) => stock.symbol.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        stock.profile.companyName.toLowerCase().indexOf(name.toLowerCase()) !== -1)
      .filter((item, id) => id >= offset && id < Number(offset) + 10);
  }
  res.json({
    status: 'OK',
    data: stocks
  });
});


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const data = db.get('stocks').find((stock) => String(stock.symbol) === id);
  res.json({
    status: 'OK',
    data: data
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
  const data = db.get('stocks')
    .filter((stock) => stock.symbol.toLowerCase().indexOf(body.value.toLowerCase()) !== -1 ||
      stock.profile.companyName.toLowerCase().indexOf(body.value.toLowerCase()) !== -1);
  res.json({
    status: 'OK',
    data: data
  });
});

module.exports = router;
