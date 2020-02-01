
const mongoose=require('mongoose')
const moment=require('moment')

var postsSchema=new mongoose.Schema({
author:{
  id:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  username:String
},
nickname:String,
score:{
  default:57,
  type:Number
},
width:{
  default:57,
  type:Number
},
comments:[{
  comment:{
type: String,
default:null
},
author:String}],

liked:{
type:Boolean,
default:false
},
likedUsers:[String],


laughed:{
type:Boolean,
default:false
},
laughedUsers:[String],



commentCount:{
type:Number,
default:0
},
bookmarked:{
type:Boolean,
default:false
},
bookmarkedUsers:[String],
commentCount:{
type:Number,
default:0
},
likesCount:{
type:Number,
default:0
},


authorId:String,

createdBy:String,

postIcon:{
  type:String,
default:'default.jpg'},

postIconUrl:{
  type:String  },

image:String,

title:String,

description:String
,
time:String,
date:{
  type:Date,
  default:Date.now
}
},
{timestamps:true}

)
postsSchema.pre("save", async function(next) {
try {

  let  createdAt= await moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
  this.time =createdAt ;
  console.log(createdAt);
  return next();
} catch (err) {
  return next(err);
}
});
var Post=mongoose.model("Post",postsSchema)



module.exports=Post
