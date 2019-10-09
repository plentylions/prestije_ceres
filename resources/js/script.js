Vue.component("carousel", {

  components: {
    SlotComponent: {
      functional: true,
      render: (createElement, context) => context.props.vnode
    }
  },

  props: {
    template: {
      type: String,
      default: "#vue-carousel"
    },
    itemsPerPage: {
      type: Number,
      default: 4
    }
  },

  data() {
    return {
      itemCount: 0
    };
  },

  computed: {
    columnWidths() {
      let itemsPerPage = this.itemsPerPage;

      if (itemsPerPage < 1) {
        itemsPerPage = 1;
      } else if (itemsPerPage > 4) {
        itemsPerPage = 4;
      }

      return [
        itemsPerPage === 1 ? "col-12" : "col-6",
        itemsPerPage === 1 ? "col-sm-12" : "col-sm-6",
        "col-md-" + (12 / itemsPerPage)
      ];
    }
  },

  created() {
    if (this.$slots.items) {
      this.itemCount = this.$slots.items.length;
    }
  },

  mounted() {
    this.$nextTick(() => {
      if (this.itemCount > this.itemsPerPage) {
        this.initializeCarousel();
      }
    });
  },

  methods: {
    initializeCarousel() {
      const self = this;

      $(this.$refs.carouselContainer).owlCarousel({
        autoHeight: true,
        dots: true,
        items: self.itemsPerPage,
        responsive: {
          0: {
            items: self.itemsPerPage > 1 ? 2 : 1
          },
          576: {
            items: self.itemsPerPage > 1 ? 2 : 1
          },
          768: {
            items: self.itemsPerPage > 3 ? 3 : self.itemsPerPage
          },
          992: {
            items: self.itemsPerPage
          }
        },
        lazyLoad: false,
        loop: false,
        margin: 30,
        mouseDrag: true,
        nav: true,
        navClass: [
          "owl-single-item-nav left carousel-control list-control-special",
          "owl-single-item-nav right carousel-control list-control-special"
        ],
        navContainerClass: "",
        navText: [
          "<i class=\"owl-single-item-control fa fa-chevron-left\" aria-hidden=\"true\"></i>",
          "<i class=\"owl-single-item-control fa fa-chevron-right\" aria-hidden=\"true\"></i>"
        ],
        smartSpeed: 350,
        onChanged: property => {
          const begin = property.item.index;
          const end = begin + property.page.size;

          for (let i = begin; i < end; i++) {
            const childComponent = self.$children[i];

            if (childComponent && childComponent.loadFirstImage) {
              childComponent.loadFirstImage();
            }
          }
        }
      });
    }
  }
});

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

  if ($('.product-list > li').length > 0) {
    $('ul.product-list').after('<div class="lds-ellipsis infiniteScrollLoader"><div></div><div></div><div></div><div></div></div>');
    let nextUrl = removeParam("page", window.location.href);
    if (nextUrl.indexOf('?') > -1) {
      nextUrl += '&page={{#}}';
    } else {
      nextUrl += '?page={{#}}';
    }

    $(".product-list").wrap("<div class='inf-scroll-parent'></div>");

    let $container = $('.product-list').parent();
    $container.infiniteScroll({
      path: nextUrl,
      append: false,
      history: false,
      checkLastPage: false
    });

    $container.on('load.infiniteScroll', function (event, response, path) {
      let $items = $(response).find('.product-list > li');
      if ($items.length == 0) { // Last
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

  if ($('.top-bar .before-header').attr('data-sticky') == 'true') {
    // Check the initial Poistion of the Sticky Header
    var stickyHeaderTop = $('.top-bar .before-header').offset().top;

    $(window).scroll(function () {
      if ($(window).scrollTop() > stickyHeaderTop) {
        $('.top-bar .before-header').addClass('sticky');
      } else {
        $('.top-bar .before-header').removeClass('sticky');
      }
    });
  }
});