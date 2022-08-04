const { connect, connection } = require('mongoose');

//wrap mongoose connection
mongoose.connect('mongodb://localhost:27017/onlineStuffdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
