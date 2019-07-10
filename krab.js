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
      let target = $(this.getAttribute('href'));

      console.log(target.offset())
      

      if( target.length ) {
          event.preventDefault();
          $("#data-visualization-slides").stop().animate({
              scrollLeft: target.offset().left
          }, 500);
          
      }

      /*$('html, body').animate({
          scrollLeft: $($(this).attr('href')).offset().left
      }, 500);
      return false;*/
  });
    
});

