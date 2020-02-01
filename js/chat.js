const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

socket.on('message', (message) => {
    console.log(message)


    var check=false;
    var friend=true;
    if($('#username').attr('value')=== message.username){
      check=true;
      friend=false;
    }



    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a'),
        check:check,
friend:friend
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('locationMessage', (message) => {
    console.log(message)

    var check=false;
    var friend=true;
    if($('#username').attr('value')=== message.username){
      check=true;
      friend=false;
    }



    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a'),
        check:check,
friend:friend
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

socket.on('roomData', ({ room, users }) => {
  var x=room.split('.')
  var user2=x[1]
  var check=true;
  var display=false;
  if(users.length===2){
    check=false
    display=true
  }
    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
        user2,
        check    })
    document.querySelector('#sidebar').innerHTML = html


  var x=$('.room').html().split('.')
  var currentuser=x[0]
  var friend=x[1]
  var data={
    currentuser:currentuser,
    friend:friend
  }

  $.ajax({
    method:"post",
    url:"/isfriend",
    data:data
  }).then(data=>{
    // console.log(data);
    if(data){
      $(`#${friend}`).attr("class","fas fa-user-friends")
    }else{

      $(`#${friend}`).attr("class","fas fa-plus")


    }
  })


$('.requestuser').click(function(e){

     $('.fa-plus').attr("class","fa fa-spinner")

     var y=$('.room').html().split('.')

     var currentuser=y[0]
     var friend=y[1]
     var send={
       currentuser:currentuser,
       friend:friend
     }
$.ajax({
  method:"post",
  url:"/sendRequest",
  data:send
}).then(data=>{
  console.log(data);

})

   })


$('.notify').click(function(e){
  e.preventDefault()
  $(this).attr("class","fas fa-thumbs-up")
$('.notificationmessage').html('Requested')
var y=$('.room').html().split('.')
var currentuser=y[0]
var friend=y[1]
var send={
  currentuser:currentuser,
  friend:friend
}

$.ajax({
  method:"post",
  url:"/notify",
  data:send
}).then(data=>{
  console.log(data);
})
})



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
          alert(error)
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

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})
