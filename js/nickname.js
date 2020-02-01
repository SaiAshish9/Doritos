$(document).ready(function(){
  $('.updatenickname').click(function(e){
    e.preventDefault()
    var nickname=$('.nickname').val()
    var id=$(this).attr("value")
    $.ajax({
      method:"post",
      url:`${id}/updatenickname`,
      data:{nickname:nickname}
    }).then(data=>{
      $('.nickname').val(data)
    })
  })
})
