const {
  PORT = 3000, NODE_ENV, JWT_SECRET, MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

module.exports = {
  PORT, NODE_ENV, JWT_SECRET, MONGO_DB,
};
