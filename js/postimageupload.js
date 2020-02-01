

$(document).ready(function(){

  $('#coverupload').click(async function(e){
    alert('hi')
    e.preventDefault()
  await   $('#cover-upload').click()
  })

$('#imageupload').click(async function(e){
  e.preventDefault()
 await   $('#photo').click()

 var readURL = function(input) {
     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
          console.log(input.files[0].name);
          $('#imageupload').attr("class","fa fa-check")

         }

         reader.readAsDataURL(input.files[0]);
     }
 }


 $(".file-upload").on('change', function(){
     readURL(this);

 });





})

})
