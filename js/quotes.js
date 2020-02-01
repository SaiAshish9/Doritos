

$(document).ready(function() {
quote($(this));
$('.quote').click(function(e){
  e.stopPropagation()
  e.preventDefault()
  quote($(this));

})

fun($(this));
$('.laugh1').click(function(e){
  e.stopPropagation()
  e.preventDefault()
  fun($(this));
})

});

function quote(like){
// var updateUrl = 'http://quotes.rest/qod.json' ;
var updateUrl='https://api.adviceslip.com/advice'
$.ajax({
  method: 'GET',
  url: updateUrl,
  dataType:'json',
  success:function(data){
    // alert(data.contents.quotes[0].quote);
    // $('.quote').html(`"${data.contents.quotes[0].quote}"`)
    // $('.quote').attr("href",data.contents.quotes[0].permalink)
    $('.quote').html(`"${data.slip.advice}"`)
  }
})
}

function fun(like){

var updateUrl='https://sv443.net/jokeapi/category/Programming?blacklistFlags=nsfw'
$.ajax({
  method: 'GET',
  url: updateUrl,
  dataType:'json',
  success:function(data){
   if(data.type=='single')
   $('.laugh1').html(`"${data.joke}"`)
else
    $('.laugh1').html(`"${data.setup}"<br/><br/> ${data.delivery}`)
  }
})
}
