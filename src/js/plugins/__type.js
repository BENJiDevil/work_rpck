$(window).scroll(function() {
   var elem         =  $('#typed');
   var  scrollTop   =  $(window).scrollTop() + $(window).height();
   var elemTop      =  elem.offset().top;
   if(scrollTop >= elemTop && !elem.hasClass('active')){
       var typed = new Typed('#typed', {
           strings: ['First sentence with some long text.'],
           startDelay: 0,
           typeSpeed: 50,
           showCursor: true,
           cursorChar: '|'
       });
       elem.addClass('active');
   }
});
