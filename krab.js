function uploadJson () {
    
}


$(document).ready(function(){
    $("#upload-btn").click(function() {
      $("#no-upload-view").hide();
    });

    $('a').click(function(){
      console.log("fasdfa")
      console.log($(this).attr('href'))
      console.log($($(this).attr('href')).offset())
      $('html, body').animate({
          scrollLeft: $($(this).attr('href')).offset().left
      }, 500);
      return false;
  });
    
});

