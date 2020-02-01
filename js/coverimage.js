
$(document).ready(function(){

  var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
              $('.page-header-image').css('background-image', `url(${e.target.result})`);
          }
// console.log(input.files[0]);
          reader.readAsDataURL(input.files[0]);
      }
  }


  $("#cover-upload").on('change', function(){
      readURL(this);
  });


  $('#coverupload').click( function(e){
     $('#cover-upload').click()
  })
})
