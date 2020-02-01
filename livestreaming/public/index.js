$(document).ready(function(){



$.ajax({
method:'get',
url:'/get'
})
  .then(function(response) {
$('#weapon').text(response.data.weapon)
$('#probability').text(response.data.offensive.prob)
  })


})
