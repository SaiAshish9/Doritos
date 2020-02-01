require("dotenv").config()

const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;


// "mongodb://localhost/ImagineDB"
//
mongoose.connect(process.env.mongoKey, {
  keepAlive: true,
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology:true

});

module.exports.User = require("./User");
