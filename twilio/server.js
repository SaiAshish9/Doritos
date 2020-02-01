const express=require('express')
const app=express()
const Nexmo=require('nexmo')
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine','ejs')
app.use(express.static('public'))
const socketio=require('socket.io')

const nexmo=new Nexmo({
  apiKey:'0516ffa4',
  apiSecret:'vy69TEPK5cFrYLPF'
},{debug:true})

app.get('/',(req,res)=>{
  res.render("index")
})

app.post('/',(req,res)=>{

nexmo.message.sendSms(
  '12345678901',req.body.number,req.body.text,{
    type:'unicode'
  },(err,resData)=>{
    if(err){
      console.log(err);
    }else{
console.dir(resData)

const data={
  id:resData.messages[0]['message-id'],
  number:resData.messages[0]['to'],
}

io.emit('sms',data)

    }
  }
)
})

const server= app.listen(3000,()=>{
  console.log("server started");
})

const io=socketio(server)

io.on('connection',(socket)=>{



io.on('disconnect',()=>{
  console.log('disconnected');
})
})
