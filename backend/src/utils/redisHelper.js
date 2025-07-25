const redis = require('../config/redis');
const crypto = require('crypto');

async function redisHelper(prefix, params, fetchFn, ttl = process.env.CACHE_TTL) {
  const key = `${prefix}:${crypto.createHash('md5').update(JSON.stringify(params)).digest('hex')}`;

  const cached = await redis.get(key);
  if (cached) {
    console.log('Cache hit:', key);
    return JSON.parse(cached);
  }

  console.log('Cache miss:', key);
  const result = await fetchFn();
  await redis.setex(key, ttl, JSON.stringify(result));
  return result;
}

module.exports = redisHelper;
