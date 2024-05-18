const redisCLient = require("../utils/redisClient");

class RedisService {
  static getOrSet = async (cb, key) => {
    const REDIS_EXPAIR_TIME = process.env.REDIS_EXPAIR_TIME || 3600;
    key = key || "blogs";

    const cacheData = await redisCLient.get(key);
    if (cacheData) {
      console.log("Cache hit -- 😝");
      return JSON.parse(cacheData);
    }

    const data = await cb();
    redisCLient.setex(key, REDIS_EXPAIR_TIME, JSON.stringify(data));
    console.log("Cache miss -- 👀");
    return data;
  };

  static deleteByPattern = (pattern) => {
    redisCLient
      .scanStrem({
        match: pattern,
        count: 1000,
      })
      .on("data", (keys) => {
        redisCLient.del(...keys);
      })
      .on("end", () => {
        console.log("Delete from cache");
      });
  };

  static delete = async ({ keys = [], pattern = null }) => {
    if (pattern) {
      await deleteByPattern(pattern);
    }

    await redisCLient.del(...keys);
  };
}

module.exports = RedisService;
