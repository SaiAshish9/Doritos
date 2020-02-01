$(document).ready(function(){
  $('.accept').click(function(e){
    e.preventDefault();
addfriend($(this))
  })

  $(".decline").click(function(e){
    e.preventDefault()
removeRequest($(this))
  })





})



function addfriend(friend){
  var pal={username:$(friend).attr("id")}
  var url='/'+$('.userId').attr('value')+'/addfriend'
  var user=$('.userId').attr('value')

  $.ajax({
    method:"post",
    data:pal,
    url:url
  }).then(data=>{
    window.location.href='/'+$('.userId').attr('value')
  })
}

function removeRequest(req){
  var pal={username:$(req).attr("name")}
  var url='/'+$('.userId').attr('value')+'/removeRequest'
  $.ajax({
    method:"post",
    data:pal,
    url:url
  }).then(data=>{
    console.log(data);
  })
}
