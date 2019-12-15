const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const axios = require('axios');
const db = require('./db/db');

const app = express();
const userStocksRotues = require('./routes/userStocks');
const stocksRotues = require('./routes/stocks');
const transactionsRotues = require('./routes/transactions');

async function apiRequest(url) {
  const data = await axios.get(url);
  return data.data;
}


async function setStocksInfo(stocksSymbols) {
  const newDataCompanyProfiles = await apiRequest(
    `https://financialmodelingprep.com/api/v3/company/profile/${stocksSymbols}`);
  return newDataCompanyProfiles;
}


async function getStocksFromApi() {

  let newData = await apiRequest('https://financialmodelingprep.com/api/v3/stock/real-time-price');

  newData = { stockList: newData.stockList.filter((item, id) => id < 20) };
  newData.stockList.forEach((item, id)=>{
    let stock = db.get('stocks')
      .find((stock) => String(stock.symbol) === item.symbol);

    let stockValue = stock.value();
    (async () => {
      const newDataCompanyProfiles = await apiRequest(
        `https://financialmodelingprep.com/api/v3/company/profile/${item.symbol}`);
      newData.stockList[id] = Object.assign(newData.stockList[id], newDataCompanyProfiles);
      console.log(newDataCompanyProfiles.symbol);
      if (newDataCompanyProfiles.symbol) {
        if (stockValue !== undefined) {
          stockValue = Object.assign(stockValue, newData.stockList[id]);
          stock.assign(stockValue)
            .write();
        } else {
          db.get('stocks')
            .push(newData.stockList[id])
            .write();
        }
      /*  db.get('stocks')
          .assign(newData.stockList)
          .write();*/
      }
    })();
  });

 /* let promise = new Promise((resolve, reject) => {
    newData.stockList.forEach((item, id)=>{
      (async () => {
        const newDataCompanyProfiles = await setStocksInfo(item.symbol);
        newData.stockList[id] = Object.assign(newData.stockList[id], newDataCompanyProfiles[0]);
        console.log(newData.stockList[id],newDataCompanyProfiles);
      })();
      console.log(newData.stockList[id]);
    });
    resolve(newData);
  });

  newData = await promise;*/

/*  newData.stockList.forEach((item, id)=>{
    (async () => {
      const newDataCompanyProfiles = await setStocksInfo(item.symbol);
      newData.stockList[id] = Object.assign(newData.stockList[id], newDataCompanyProfiles[0]);
      console.log(newData.stockList[id],newDataCompanyProfiles);
    })();
    console.log("asfdsgagSSSSSSSS",newData.stockList[id]);
   /!* newData.stockList[id].assign(newData.stockList[id], newDataCompanyProfiles[0]);*!/
  });*/

  /*const stocksInfo = [];
  newData.stockList.reduce((accumulator, stock) => {
    if (accumulator.length < 3) {
      accumulator.push(stock.symbol);
      return accumulator;
    } else {
      const newDataCompanyProfiles = setStocksInfo(accumulator);
      console.log(newDataCompanyProfiles);
      return [];
    }
  }, []);*/
 /* db.get('stocks')
    .assign(newData.stockList)
    .write();*/
}

getStocksFromApi();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*app.use(morgan('combined'));*/
app.use('/', (req, res, next) => {
  console.log(req.headers);
  next();
});
app.use(bodyParser.json());
app.use('/userstocks', userStocksRotues);
app.use((err, req, res, next) => {
  const { message } = err;
  res.json({
    status: 'ERROR',
    message
  });
});
app.use('/stocks', stocksRotues);
app.use((err, req, res, next) => {
  const { message } = err;
  res.json({
    status: 'ERROR',
    message
  });
});
app.use('/transactions', transactionsRotues);
app.use((err, req, res, next) => {
  const { message } = err;
  res.json({
    status: 'ERROR',
    message
  });
});

app.listen(8080, () => console.log('listening on port 8080'));
