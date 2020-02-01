require("dotenv").config();
var jwt = require("jsonwebtoken");
const db = require("../models");
const moment=require('moment')
const {sendWelcomeEmail}=require("../emails/email")

exports.signin = async function(req, res, next) {
  try {
    let email=req.body.email;
    let user = await db.User.findOne({
      email: email
    });
    console.log(user);
    let { id} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          email        },
        process.env.SECRET_KEY
      );


      console.log(token);

      return  res.redirect('/'+id)
    } else {
      return next({
        status: 400,
        message: "Invalid Email/Password."
      });
    }
  } catch (e) {
    return next({ status: 400, message: e.message});
  }
};

exports.signup = async function(req, res, next) {
  try {
    let foundemail=await db.User.find({email:req.body.email});
    let username=req.body.username;
    console.log(foundemail.length);

    console.log(process.env.SENDGRID_KEY);

    if(foundemail.length===0){
    let user = await db.User.create(req.body);
    console.log(user);
    let { id, createdAt,email } = user;
    // createdAt=moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')
    let token = jwt.sign(
      {
        id,
        username      },
      process.env.SECRET_KEY
    );
console.log(moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'));
await sendWelcomeEmail(email,username);
console.log('welcome email sent');
console.log(username,id);

    return res.redirect('/step1/' +id)}
    else{
      let err=new Error()
      return next({
        status: 400,
        message:"Sorry, that username and/or email is taken"
      });
      // let err = new Error("Sorry, that username and/or email is taken");
      // err.status = 11000;
      // res.status=11000;
        // res.redirect("/")
    }

  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
