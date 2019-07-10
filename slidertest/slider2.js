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