$(document).ready(function(){
  $('.alert').click(function(e){
    e.preventDefault()
    $(this).css("display","none")
    window.location.href=this
  })
})
