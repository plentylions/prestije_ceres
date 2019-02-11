$(function () {
  $('#video-modal').on('shown.bs.modal', function () {
    $('#video-modal .video-popup-video').trigger('play');
  });
  $('#video-modal').on('hidden.bs.modal', function () {
    $('#video-modal .video-popup-video').trigger('pause');
  });

  $('.mobile-navigation .mainmenu a').on('click', function () {
    let navDirection = $(this).parent().find('.nav-direction');
    let hasChild = navDirection.length > 0;
    if (hasChild) {
      navDirection.trigger('click');
      return false;
    }
  });
});