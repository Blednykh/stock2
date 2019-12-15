const express = require('express');
const { validate } = require('jsonschema');
const shortid = require('shortid');
const db = require('../db/db');
const router = express.Router();
const axios = require('axios');




router.get('/', (req, res, next) => {
  const stocks = db.get('stocks').filter((item, id) => id >= req.query.offset && id < Number(req.query.offset) + 5);
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

module.exports = router;
