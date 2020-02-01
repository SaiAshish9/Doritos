const express=require('express')
const app=express()

const translate=require('translate')

const message=translate('Message',{to:'hi',engine:'google',key:''})

console.log(message);


app.listen(3000,()=>{
  console.log("server started");
})
