$(document).ready(function(){

$('#removenotifications').click(function(e){
  e.preventDefault()

removenotification($(this))

})

$('#joinnotifiedroom').click(function(e){
  removenotification($(this))

})

})

function removenotification(req){
  var notification={notification: $('.notification').attr("value")}

  var url='/'+$('.userId').attr('value')+'/removenotification'

  $.ajax({
    method:"post",
    data:notification,
    url:url
  }).then(data=>{
    console.log(data);
    // window.location.href=this.location
  })

}
