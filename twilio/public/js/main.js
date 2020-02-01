const numberInput=document.getElementById('number'),
      textInput=document.getElementById('msg'),
      button=document.getElementById('button'),
      response=document.querySelector('.response');

button.addEventListener('click',send,false)



const socket=io()

socket.on('sms',function(data){
  response.innerHTML=`<h5>message sent to ${data.number}</h5>`
})

function send(){
  // non numeric characters
  const number=numberInput.value.replace(/\D/g,'')
  const text=textInput.value


fetch('/',{
  method:'post',
  headers:{
    'Content-type':'application/json'
  },
  body:JSON.stringify({number:number,text:text})
}).then(res=>{
  console.log(res);
}).catch(e=>{
  console.log(e.message);
})

}
