const cv=require('opencv4nodejs')
const express=require('express')
const app=express()
const path=require('path')
const server=require('http').Server(app)
const io=require("socket.io")(server)
const axios=require('axios')
const FormData=require('form-data')
const fs=require('fs')
const sightengine=require('sightengine')('91450305','4GV4Bv7WeaMWtvExRE5E')


app.use(express.static("public"))

app.set('view engine','ejs')


const FPS=30

const wCap=new cv.VideoCapture(0)
// 0-facecam

wCap.set(cv.CAP_PROP_FRAME_WIDTH,300)
wCap.set(cv.CAP_PROP_FRAME_HEIGHT,300)


app.get('/',(req,res)=>{
  res.render("index")


})


app.get('/get',(req,res)=>{
  sightengine.check(['offensive', 'wad']).video_sync('https://sightengine.com/assets/stream/examples/funfair.mp4').then(function(result) {
res.json({data:result.data.frames[0]})
console.log(result.data.frames);
  }).catch(function(err) {
    console.log("e");
  });
})

setInterval(()=>{
  const frame=wCap.read()
  const image=cv.imencode('.jpg',frame).toString('base64')
  io.emit('image',image)
},1000/FPS)

server.listen(3000,()=>{
  console.log("server started");
})
