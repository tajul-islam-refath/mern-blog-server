const Redis = require("ioredis");
const redisCLient = new Redis({
  port: 6379, // Redis port
  host: "127.0.0.1", // Redis host
  password: "12345678",
});

module.exports = redisCLient;
