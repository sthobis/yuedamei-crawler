$(document).ready(function() {
  console.log('initiating');
  $('.image-container:first-child').addClass('active');
  $('#prev').on('click', function() {
    console.log('prev');
    if ($('.image-container.active').prev().length) {
      var newActive = $('.image-container.active').prev();
      $('.image-container.active').removeClass('active');
      newActive.addClass('active');
    }
  });
  $('#next').on('click', function() {
    console.log('next');
    if ($('.image-container.active').next().length) {
      var newActive = $('.image-container.active').next();
      $('.image-container.active').removeClass('active');
      newActive.addClass('active');
    }
  });
});
