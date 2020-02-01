const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const validator = require('validator')


const UserSchema= new mongoose.Schema({
username:{
  type:String,
  required:true
}
,
password:{
  type:String,
  required:true
},
nickname:String,

email:{
  type:String,
  required:true,
unique:true,
trim: true,
validate(value) {
    if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
    }
}
},
category:{
    type:String
},
address:{
  type:String
},
token:{
  type:String
},

  postCount:{
    type:Number,
  default:0},

commentCount:{
      type:Number,
    default:0},

bookmarkCount:{
      type:Number,
    default:0
  },
  likeCount:{
        type:Number,
      default:0
    },
    laughCount:{
          type:Number,
        default:0
      },
photo:{
  type:String,
  default:'default.jpg'
},
coverphoto:{
  type:String,
  default:'cover-photo.jpg'
},
friends:[{
  username:{
type: String,
default:null
},
image:String
}],

requests:[String],
requested:[String],
notifications:[String]
},
{timestamps:true}
);

UserSchema.pre("save", async function(next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};


const User=mongoose.model("User",UserSchema)

module.exports=User
