const pg = require('pg');

function createDatabase(){
    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'postgres',
        password: 'postgres',
        port: '5432'}
    );

    async (eventName, eventArgs, app) => {
        let prefix = '!';
        const query = new Promise((resolve, reject) => {
          database.query("DROP DATABASE IF EXISTS sawtooth;", (err, res) => {
            if(err)
              return reject("db", err, res);
      
            if(res.length > 0 && res[0].prefix)
                prefix = res[0].prefix;
      
            console.log("from within promise ", prefix);
            console.log("returned from query ", res[0].prefix);
            resolve();
          });
        });
      
        await query;
        console.log("prefix in standard flow ", prefix);
      }

    //await pool.query("DROP DATABASE IF EXISTS sawtooth;");
    
    /*await pool.query("CREATE DATABASE sawtooth;", (err, res) => {
        console.log(err, res);
        pool.end();
    });*/

    async (eventName, eventArgs, app) => {
        let prefix = '!';
        const query = new Promise((resolve, reject) => {
          database.query("CREATE DATABASE sawtooth;", (err, res) => {
            if(err)
              return reject("db", err, res);
      
            if(res.length > 0 && res[0].prefix)
                prefix = res[0].prefix;
      
            console.log("from within promise ", prefix);
            console.log("returned from query ", res[0].prefix);
            resolve();
          });
        });
      
        await query;
        console.log("prefix in standard flow ", prefix);
      }
}

function createTable() {
    const pool = new pg.Pool({
        user: 'postgres',
        host: '127.0.0.1',
        database: 'sawtooth',
        password: 'postgres',
        port: '5432'}
    );

    pool.query(`CREATE TABLE IF NOT EXISTS "inputData" (
        "id" SERIAL,
        "inputText" VARCHAR(1000) NOT NULL,
        PRIMARY KEY ("id"))`, (err, res) => {
        if (err) {
            console.log(err, res);
        };
        pool.end();
    });
}

createDatabase();
createTable();

    