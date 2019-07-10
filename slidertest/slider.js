/*
  Author : Sebastien Koss
  Copyright © 2016 All rights reserved. 
*/

$(document).ready(function() {
    $('.slide:first').addClass('slideActuel');
    $('.slides').after('<div class="previous"></div><div class="next"></div>');
    var CountSlides = $('.slide').length;
    $('.slidesConteneur').css('width', CountSlides + '00%');
    var CssSlides = 100 / CountSlides;
    $('.slide').each(function(index) {
        $(this).css('width', CssSlides + '%').attr('data-slide', index)
    });
    var hauteurFenetre = $(window).height();
    $('.innerSlide').each(function() {
        $(this).css('height', hauteurFenetre + 'px')
    });
    $(window).resize(function() {
        var hauteurFenetre_ = $(window).height();
        $('.innerSlide').stop().animate({
            height: hauteurFenetre_ + 'px'
        }, 0);
        var R_largeurFenetre = $(window).width();
        var R_dataSlide = $('.slide.slideActuel').attr("data-slide");
        var R_calculTranslate = R_dataSlide * R_largeurFenetre;
        if (R_dataSlide > 0) {
            R_calculTranslate = '-' + R_calculTranslate
        }
        $('.slidesConteneur').stop().animate({
            transform: 'translateX(' + R_calculTranslate + 'px)'
        }, 1)
    });
    $('.next').click(function() {
        var largeurFenetre = $(window).width();
        if ($('.slide.slideActuel').next().is('div.slide')) {
            var dataSlide = $('.slide.slideActuel').next().attr("data-slide");
            var calculTranslate = dataSlide * largeurFenetre;
            if (dataSlide > 0) {
                calculTranslate = '-' + calculTranslate
            }
            $('.slideActuel').next().addClass('slideActuel');
            $('.slideActuel:first').removeClass('slideActuel');
            $('.slidesConteneur').animate({
                transform: 'translateX(' + calculTranslate + 'px)'
            })
        } else {
            CheckElementCache('first', largeurFenetre)
        }
    });
    $('.previous').click(function() {
        var largeurFenetre = $(window).width();
        if ($('.slide.slideActuel').prev().is('div.slide')) {
            var dataSlide = $('.slide.slideActuel').prev().attr("data-slide");
            var calculTranslate = dataSlide * largeurFenetre;
            if (dataSlide > 0) {
                calculTranslate = '-' + calculTranslate
            }
            $('.slideActuel').prev().addClass('slideActuel');
            $('.slideActuel:last').removeClass('slideActuel');
            $('.slidesConteneur').animate({
                transform: 'translateX(' + calculTranslate + 'px)'
            })
        } else {
            CheckElementCache('last', largeurFenetre)
        }
    })
});

function CheckElementCache(type, largeurFenetre) {
    var dataSlide = $('.slide:' + type).attr("data-slide");
    var calculTranslate = dataSlide * largeurFenetre;
    if (dataSlide > 0) {
        calculTranslate = '-' + calculTranslate
    }
    $('.slideActuel').removeClass('slideActuel');
    $('.slide:' + type).addClass('slideActuel');
    $('.slidesConteneur').animate({
        transform: 'translateX(' + calculTranslate + 'px)'
    })
}

// automatic slide
setInterval(function(){
  // check if body is hovered
  if (!$('body').is(':hover')) {
    $(".next").trigger("click");
  }
}, 3500);