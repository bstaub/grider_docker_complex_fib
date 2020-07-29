const keys = require('./keys');
const redis = require('redis');

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
const subcription = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

// every time we get a new message, run this callback function..
subcription.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)))
})

subcription.subscribe("insert"); //every time someone insert a value
