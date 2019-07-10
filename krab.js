function uploadJson () {
    
}


/*$(document).ready(function(){
    $("#upload-btn").click(function() {
      $("#no-upload-view").hide();
    });

    $('a').click(function(){
      console.log("fasdfa")
      console.log($(this).attr('href'))
      console.log($($(this).attr('href')).offset())
      console.log()
      let target = $(this.getAttribute('href'));

      console.log($("#data-visualization-slides").width())

      if (target)
      

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
/*  });
    
});*/


$(document).ready(function(){

  
  var body   = $('#dashboard-view'),
      nav    = $('.data-menu'),
      panels = $('.panel');

  nav.on('click', 'a', function(e){
    e.preventDefault();
    var dest = $(this).data('panel-link');
    body
      .removeClass(function (index, css) {
        // remove only classes start with show-
        // http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        return (css.match ( /\bshow-\S+/g ) || []).join(' ');
      })
      .addClass('show-' + dest);
    console.log(dest);
    console.log(body.attr('class'));
  });
})
/*
function navigate(){

  var body   = $('body'),
      nav    = $('.main-menu'),
      panels = $('.panel');

  nav.on('click', 'a', function(e){
    e.preventDefault();
    var dest = $(this).data('panel-link');
    body
      .removeClass(function (index, css) {
        // remove only classes start with show-
        // http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        return (css.match ( /\bshow-\S+/g ) || []).join(' ');
      })
      .addClass('show-' + dest);
    console.log(dest);
    console.log(body.attr('class'));
  });
  
}
*/
/*
(function(){

  var body   = $('body'),
      nav    = $('.main-menu'),
      panels = $('.panel');

  nav.on('click', 'a', function(e){
    e.preventDefault();
    var dest = $(this).data('panel-link');
    body
      .removeClass(function (index, css) {
        // remove only classes start with show-
        // http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        return (css.match ( /\bshow-\S+/g ) || []).join(' ');
      })
      .addClass('show-' + dest);
    console.log(dest);
    console.log(body.attr('class'));
  });
  
}());


*/