var newVue;
$(function () {
  function removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
  }

  if( $('.product-list > li'). length > 0 ){
    $('ul.product-list').after('<div class="lds-ellipsis infiniteScrollLoader"><div></div><div></div><div></div><div></div></div>');
    let nextUrl = removeParam("page", window.location.href);
    if (nextUrl.indexOf('?') > -1) {
      nextUrl += '&page={{#}}';
    } else {
      nextUrl += '?page={{#}}';
    }

    $( ".product-list" ).wrap( "<div class='inf-scroll-parent'></div>" );

    let $container = $('.product-list').parent().infiniteScroll({
      path: nextUrl,
      append: false,
      history: false,
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