var newVue;
$(function () {
  if( $('.product-list > li'). length > 0 ){
    $('ul.product-list').after('<div class="lds-ellipsis infiniteScrollLoader"><div></div><div></div><div></div><div></div></div>');
    let nextUrl = window.location.href;
    if (nextUrl.indexOf('?') > -1) {
      nextUrl += '&page={{#}}';
    } else {
      nextUrl += '?page={{#}}';
    }

    let $container = $('.product-list').parent().infiniteScroll({
      path: nextUrl,
      append: false,
      history: true,
      checkLastPage: false
    });

    $container.on('load.infiniteScroll', function (event, response, path) {
      let $items = $(response).find('.product-list > li');
      if( $items.length == 0 ){ // Last
        $container.infiniteScroll('destroy');
        $('.infiniteScrollLoader').remove();
      }

      $container.find('.product-list').append($items);

      newVue = new Vue({
        el: $('.product-list')[0],
        store: window.ceresStore
      });

      $('.product-list img[data-original]').each(function () {
        $(this).attr('src', $(this).attr('data-original'));
      });
    });
  }
});

$(function () {
  $('#video-modal').on('shown.bs.modal', function () {
    $('#video-modal .video-popup-video').trigger('play');
  });
  $('#video-modal').on('hidden.bs.modal', function () {
    $('#video-modal .video-popup-video').trigger('pause');
  });
});