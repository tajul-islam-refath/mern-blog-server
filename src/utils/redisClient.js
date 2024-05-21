const Redis = require("ioredis");
const redisCLient = new Redis({
  port: 6379, // Redis port
  host: "redis", // Redis host
  password: "12345678",
});

redisCLient.on("error", (err) => {
  console.log("Error " + err);
});

module.exports = redisCLient;
