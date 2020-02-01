const mongoose=require('mongoose')

var eventSchema=mongoose.Schema({
  name:String,
  time:String,
  address:String,
  category:String
})

var Event=mongoose.model("Event",eventSchema)
module.exports = Event
