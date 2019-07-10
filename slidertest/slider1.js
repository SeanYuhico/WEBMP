$('a').click(function(){
    $('html, body').animate({
        scrollLeft: $( $(this).attr('href') ).offset().left
    }, 500);
    return false;
});