const mongoose=require('mongoose')


const chatSchema=mongoose.Schema({
  name:String,
  author:{
    id:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    }},
  msg:String,
  created:{type:Date,default:Date.now}
})
var Chat=mongoose.model("Chat",chatSchema)


module.exports=Chat;
