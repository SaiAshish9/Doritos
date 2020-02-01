jQuery(document).ready(function($){

$('.live-search-list ').each(function(){
$(this).attr('data-search-term', $(this).text().toLowerCase());
});

$('.live-search-box').on('keyup', function(){

var searchTerm = $(this).val().toLowerCase();
if(searchTerm.length>0){

  $('.live-search-list ').each(function(){
      if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
          $(this).parents().show();
      } else {
          $(this).parentsUntil(".filter").hide();
      }

  });
}
else{
  $('.live-search-list').parents().show()
}


});

});
