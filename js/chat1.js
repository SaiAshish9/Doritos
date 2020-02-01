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
  var x=room.split('.')


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
                  var friend=$('#friend').attr('value')

                  // alert(currentuser)

users.forEach(u=>{
if(u.username===$('#username').attr('value')){
  user=u.username
}else{
  activefriends.push({friend:u.username})
}
})


if(activefriends.length===0){
  if(friends.length===0){
      friends.push({friend:x[0]===friend?x[0]:x[1]})

  }

}
console.log((friends))



    const html = Mustache.render(sidebarTemplate, {
        room,
        users,
      user,
    friends,
  activefriends    })

    document.querySelector('#sidebar').innerHTML = html


    var currentuser=$('#username').attr('value')
    var friend=$('#friend').attr('value')
    if(currentuser!==friend){
      var data={
        currentuser:currentuser,
        friend:friend
      }
    }else{
      var data={
        currentuser:currentuser,
        friend:x[0]===friend?x[1]:x[0]
      }
    }


console.log(data);
    $.ajax({
      method:"post",
      url:"/isfriend",
      data:data
    }).then(data=>{
      console.log(data);
      if(data){
        $('.www').attr("class","fas fa-user-friends")
      }else{

        $('.www').attr("class","fas fa-plus")

        var currentuser=$('#username').attr('value')
        var friend=$('#friend').attr('value')
        var send={
          currentuser:currentuser,
          friend:friend
        }




            $('.fa-plus').click(function(e){
           e.preventDefault()
           e.stopPropagation()
                 $('.fa-plus').attr("class","fa fa-spinner")


                 $.ajax({
                   method:"post",
                   url:"/sendRequest",
                   data:send
                 }).then(data=>{
                   console.log(data);

                 })
               })

      }



             $('.notify').click(function(e){
            e.preventDefault()
                  $(this).attr("class","fa fa-spinner")

                  var currentuser=$('#username').attr('value')
                  var friend=$('#friend').attr('value')
                  var send={
                    currentuser:currentuser,
                    friend:x[0]===friend?x[0]:x[1]
                  }
console.log(send);
                  $.ajax({
                    method:"post",
                    url:"/notify",
                    data:send
                  }).then(data=>{
                    console.log(data);



                  })
                  })





                })

    })























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

    document.getElementById('txtMessage').value = '';

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
