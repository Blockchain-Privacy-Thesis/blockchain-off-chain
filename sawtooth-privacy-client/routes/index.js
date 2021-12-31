var express = require('express');
var bodyParser = require('body-parser');
var { UserClient } = require('./UserClient')
var router = express.Router();
const pg = require('pg');
const hashCheck = require('../public/javascripts/hashCheck');

const pool = new pg.Pool({
  user: 'username',
  host: 'sawtooth-off-chain',
  database: 'default_database',
  password: 'password',
  port: '5432'}
);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Sawtooth-Privacy' });
});

router.post('/write', function (req, res) {
  const data = req.body.inputdata;
  console.log("payload -->", data);
  var client = new UserClient();
  client.send_data(data);

  pool.query(`INSERT INTO input_data(input_text) VALUES($1)`, [data.toString()], (err, res) => {
    if (err) {
        console.log(err, res);
    };
  });

  res.send({ message: "Request sent" });
})

router.get('/read', async function (req, res) {

  var client = new UserClient();
  var readData = client._send_to_rest_api(null);
  readData.then(function (data) {
    res.send({ statedata: data });
  });
})

/*
router.get('/verify_hash', async function (req, res) {
  const query = {
    name: 'fetch-user',
    text: 'SELECT * FROM input_data ORDER BY id DESC LIMIT 1',
  }
  var databaseData;

  pool.query(query, (err, res) => {
    if (err) {
        console.log(err, res);
    } else {
        databaseData = res.rows[0].input_text
    }
  });

  var client = new UserClient();
  var readData = client._send_to_rest_api(null);
  readData.then(function (data) {
    if (hashCheck.checkHash(data, databaseData)) {
      res.send({ isCorrect: true });
    } else {
      res.send({ isCorrect: false });
    }
  });

})
*/

module.exports = router;
