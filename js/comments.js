$(document).ready(function() {
  var default_color = $(".chars-counter").css("color");

  $("#comment-input").on('keydown keyup', function() {
    var comment_len = $(this).val().length;

    $("#chars-current").html(comment_len);

    if(comment_len == 60)
      $(".chars-counter").css("color", "red");

    if(comment_len < 60 && $('.chars-counter').css("color") != default_color)
      $(".chars-counter").css("color", default_color);
  });


  $('.like').click( function(){
updatelikes($(this));

  })

  $('.laugh').click( function(){
updatelaughs($(this));

  })


  $('.bm').click( function(){

updatebookmarks($(this));

  })





});

function updatelikes(like){


//   var updateUrl = '/' + like.attr('id') +'/likes';
//   $.ajax({
//     method: 'GET',
//     url:  '/posts/' + like.attr('id') })
//   .then(function(data){
//     var count=data.likesCount
// //   $.ajax({
// //     method: 'PUT',
// //     url: updateUrl,
// //     data: updateData
// //   })
// //   .then(function(data){
// //
// //   })
// //
// })



  var updateUrl = '/' + like.attr('value')+'/likes/'+ like.attr('id') ;

console.log('localhost:3000'+updateUrl);
  $.ajax({
    method: 'GET',
    url: updateUrl })
  .then(function(data){
    var liked=data.liked

    var color= !liked ?"red":"black" ;
    $('.liked' +like.attr('id')).css("color",color)
    if(    $('.liked' +like.attr('id')).css("color")==="red"){
      $(this).attr("class","far fa-heart")
    }
  var updateData = {liked:!liked }
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(data){


  })
})

}


function updatelaughs(like){


  var updateUrl = '/' + like.attr('value')+'/laughs/'+ like.attr('id') ;

console.log('localhost:3000'+updateUrl);
  $.ajax({
    method: 'GET',
    url: updateUrl })
  .then(function(data){
    var laughed=data.laughed

    var color= !laughed ?"orange":"black" ;
    $('.laughed' +like.attr('id')).css("color",color)
    if(    $('.laughed' +like.attr('id')).css("color")==="orange"){
      $(this).attr("class","far fa-laugh-beam")
    }
  var updateData = {laughed:!laughed}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(data){


  })
})




}


function updatebookmarks(like){

  var updateUrl = '/' + like.attr('value')+'/bookmarks/'+ like.attr('id') ;

console.log('localhost:3000'+updateUrl);
  $.ajax({
    method: 'GET',
    url: updateUrl })
  .then(function(data){
    var bookmarked=data.bookmarked

    var color= !bookmarked ?"blue":"black" ;
    $('.bookmark' +like.attr('id')).css("color",color)
    if(    $('.bookmark' +like.attr('id')).css("color")==="blue"){
      $(this).attr("class","far fa-bookmark")
    }
  var updateData = {bookmarked:!bookmarked }
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(data){


  })
})

}
