const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgress Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});
//pgClient.on('error', () => console.log('Lost PG connection'));
pgClient.on("connect", () => {
  pgClient
    .query("CREATE TABLE IF NOT EXISTS values (number INT)")
    .catch((err) => console.log(err));
});

// Redis Client Setup
const redis = require("redis");
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
});
const redisPublisher = redisClient.duplicate(); // we need to dublicate because we listen, publishing, subscribe for more than one purpuse!

// Express route handlers

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * from values");

  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", (err, values) => {
    //here we do a classic callback, because redis dont support async await
    res.send(values);
  });
});

app.post("/values", async (req, res) => {
  const index = req.body.index; //hole den wert index auf dem html und store es dann in das redis values hashset!

  if (parseInt(index) > 40) {
    return res.status(422).send("Index to high");
  }

  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index); //every time someone insert a value, this triggers the worker process for calculation the fib code for inserting in redis
  pgClient.query("INSERT INTO values(number) VALUES($1)", [index]);

  res.send({ working: true });
});

const Port = 5000;
app.listen(Port, (err) => {
  console.log("Express Server Listening von Port: " + Port);
});

