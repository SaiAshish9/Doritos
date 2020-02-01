$(document).ready(function() {
  $(".searchuser1").click(function(e){
    e.preventDefault();
    if($('.users').val()!=='RandomUser'){
      directtochatroom($(this))

    }

  })
})

function directtochatroom(users){
var option=$('#hidden').attr("value")
var username=$('.users').val()

  var room= `${option}.${username}`
  var x=Math.floor(Math.random()*room.length*1000)
  // var updateUrl = '/chat?username=' + option +'&room='+room ;

var updateUrl='/'+ option+'/profile/'+username+'/'+room;
// $.ajax({
//   method:"get",
//   url:updateUrl
// })
  window.location.href=updateUrl
}
