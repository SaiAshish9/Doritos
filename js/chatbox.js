

$(document).ready(function(){
  if($('.userId').attr("value")!=='nd'){
    StartChat(1)
  }
})


function StartChat(id){
  document.getElementById('chatPanel').removeAttribute('style');
  // document.getElementById('divStart').setAttribute('style', 'display:none');
}







$('.intercom-emoji-picker-emoji').click(function(e){
  document.getElementById('txtMessage').value += $(this).html();
  document.getElementById('messages').scrollTo(0, document.getElementById('messages').clientHeight);


})
