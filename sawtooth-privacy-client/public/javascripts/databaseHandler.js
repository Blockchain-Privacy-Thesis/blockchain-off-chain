const pg = require('pg');

const pool = new pg.Pool({
  user: 'username',
  host: 'sawtooth-off-chain',
  database: 'default_database',
  password: 'password',
  port: '5432'}
);


function writeToDatabase(input) {
    pool.query(`INSERT INTO input_data(input_text) VALUES($1)`, [input], (err, res) => {
        if (err) {
            console.log(err, res);
        };
    });
}

function readFromDatabase() {
  const query = {
    name: 'fetch-user',
    text: 'SELECT * FROM input_data ORDER BY id DESC LIMIT 1',
  }

  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(res.rows[0].input_text)
    }
  });
}

module.exports = {
  writeToDatabase,
  readFromDatabase
};