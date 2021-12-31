var pg = require("pg");

var connectionString = "postgres://sawtooth:password@localhost:5432/sawtoothdb";

var pgClient = new pg.Client(connectionString);
pgClient.connect();