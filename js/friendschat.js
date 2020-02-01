const socket = io()

const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild

    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    const visibleHeight = $messages.offsetHeight

    const containerHeight = $messages.scrollHeight

    const scrollOffset = $messages.scrollTop + visibleHeight

    // if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    // }
}


socket.on('roomData', ({ room, users }) => {

  var check=false;
  var friend=true;
  if($('#username').attr('value')){
    check=true;
    friend=false;
  }

var activefriends=[]
var user=''
var friends=[]



                  var currentuser=$('#username').attr('value')
user=currentuser



$.ajax({
  method:"get",
  url:`/${user}/myfriends`
}).then(data=>{

 friends=data.friends
 var usernames=[]
 data.friends.forEach(x=>{
   usernames.push(x.username)
 })



      const html = Mustache.render(sidebarTemplate, {
          room,
          users,
        user,
        // ,
      friends,
    // activefriends
  })

      document.querySelector('#sidebar').innerHTML = html


       users.forEach(z=>{
         if(usernames.includes(z.username)){
      $(`.notify${z.username}`).attr("style","display:none")
      $(`.${z.username}online`).html("Online")

         }
       })

             $('.fa-user-plus').click(function(e){
            e.preventDefault()
                  $(this).attr("class","fa fa-spinner")

                  var currentuser='CompanionsChat'
                  var friend=$(this).attr("value")
                  var send={
                    currentuser:currentuser,
                    friend:friend,
                  }

                  $.ajax({
                    method:"post",
                    url:"/friendsnotify",
                    data:send
                  }).then(data=>{
                    console.log(data);



                  })





                })

    })
  })























socket.on('message', (message) => {

    var check=false;
    var friend=true;
    if($('#username').attr('value')=== message.username){
      check=true;
      friend=false;
    }

if(friend){
  $.ajax({
    method:"get",
    url:`/${message.username}/getimage`
  }).then(data=>{
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        check:check,
        friend:friend,
        image:data.image
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()

    document.getElementById('txtMessage').value = '';
  })
}else{
  const html = Mustache.render(messageTemplate, {
      username: message.username,
      message: message.text,
      createdAt: moment(message.createdAt).format('h:mm a'),
      check:check,
      friend:friend
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()

  document.getElementById('txtMessage').value = '';
}




})

socket.on('locationMessage', (message) => {
    console.log(message)

    var check=false;
    var friend=true;
    if($('#username').attr('value')=== message.username){
      check=true;
      friend=false;
    }
    if(friend){
      $.ajax({
        method:"get",
        url:`/${message.username}/getimage`
      }).then(data=>{
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a'),
        check:check,
        friend:friend,
        image:data.image
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
  })
}else{
  const html = Mustache.render(locationMessageTemplate, {
      username: message.username,
      url: message.url,
      createdAt: moment(message.createdAt).format('h:mm a'),
      check:check,
      friend:friend  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()
}
})



$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if (error) {
            return console.log(error)
        }

        console.log('Message delivered!')
    })
})

$sendLocationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})
//
// socket.on('load old messages',function(docs){
// for(var i=docs.length-1;i>=0;i--){
//   displayMsg(docs[i])
// }
// })
//
// function displayMsg(data){
//   const html = Mustache.render(messageTemplate, {
//       username: data.name,
//       message: data.msg,
//       createdAt: moment(data.created).format('h:mm a')
//   })
//   $messages.insertAdjacentHTML('beforeend', html)
//   autoscroll()
// }


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})
