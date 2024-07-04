import $ from 'jquery'; // Import jQuery

(function ($) {
  'use strict';

  /*
  |--------------------------------------------------------------------------
  | Template Name: Evencare
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Modal Video
  | 7. Isotop Initialize
  | 8. Time and Date
  | 9. Dynamic contact form
  | 10. Counter Animation
  | 11. Accordian
  | 12. Tabs
  | 13. Light Gallery
  | 14. Before After Slider
  | 15. Progress Bar
  | 16. Review
  | 17. Social btn active
  | 18. Ripple
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    preloader();
    isotopInit();
  });

  $(function () {
    mainNav();
    stickyHeader();
    dynamicBackground();
    counterInit();
    slickInit();
    modalVideo();
    isotopInit();
    accordian();
    tabs();
    lightGallery();
    beforeAfterSlider();
    progressBar();
    timeAndDatePicker();
    review();
    rippleInit();
    socialBtnInit();
    if ($.exists('.player')) {
      $('.player').YTPlayer();
    }
    if ($.exists('.wow')) {
      new WOW().init();
    }
    if ($.exists('.cs_select_1')) {
      $('.cs_select_1').select2({
        minimumResultsForSearch: -1,
        placeholder: function () {
          $(this).data('placeholder');
        },
      });
    }
  });

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs_preloader').fadeOut();
    $('cs_preloader_in').delay(250).fadeOut('slow');
  }

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    $('.cs_nav').append('<span class="cs_menu_toggle"><span></span></span>');
    $('.menu_item_has_children').append(
      '<span class="cs_menu_dropdown_toggle"><span></span></span>',
    );
    $('.cs_menu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs_toggle_active')
        .siblings('.cs_nav_list')
        .slideToggle();
    });
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_side_header')
      .addClass('cs_has_main_nav');
    $('.cs_menu_toggle')
      .parents('body')
      .find('.cs_toolbox')
      .addClass('cs_has_main_nav');
    $('.cs_menu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs_sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();
      if (windowTop >= headerHeight) {
        $header.addClass('cs_gescout_sticky');
      } else {
        $header.removeClass('cs_gescout_sticky');
        $header.removeClass('cs_gescout_show');
      }

      if ($header.hasClass('cs_gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs_gescout_show');
        } else {
          $header.removeClass('cs_gescout_show');
        }
      }
      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs_slider')) {
      $('.cs_slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs_slider_container');
        var $slickActive = $(this).find('.cs_slider_wrapper');

        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs_pagination')
          .hasClass('cs_pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs_left_arrow'),
          nextArrow: $(this).find('.cs_right_arrow'),
          appendDots: $(this).find('.cs_pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
              },
            },
          ],
        });
      });
    }
  }

  /*--------------------------------------------------------------
    6. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    if ($.exists('.cs_video_open')) {
      $('body').append(`
        <div class="cs_video_popup">
          <div class="cs_video_popup-overlay"></div>
          <div class="cs_video_popup-content">
            <div class="cs_video_popup-layer"></div>
            <div class="cs_video_popup-container">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="about:blank"></iframe>
              </div>
              <div class="cs_video_popup-close"></div>
            </div>
          </div>
        </div>
      `);
      $(document).on('click', '.cs_video_open', function (e) {
        e.preventDefault();
        var video = $(this).attr('href');

        $('.cs_video_popup-container iframe').attr('src', `${video}`);

        $('.cs_video_popup').addClass('active');
      });
      $('.cs_video_popup-close, .cs_video_popup-layer').on(
        'click',
        function (e) {
          $('.cs_video_popup').removeClass('active');
          $('html').removeClass('overflow-hidden');
          $('.cs_video_popup-container iframe').attr('src', 'about:blank');
          e.preventDefault();
        },
      );
    }
  }

  /*--------------------------------------------------------------
    7. Isotop Initialize
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs_isotop')) {
      $('.cs_isotop').isotope({
        itemSelector: '.cs_isotop_item',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs_grid_sizer',
        },
      });

      $('.cs_isotop_filter ul li').on('click', function () {
        $('.cs_isotop_filter ul li').removeClass('current');
        $(this).addClass('current');

        var selector = $(this).attr('data-filter');
        $('.cs_isotop').isotope({
          filter: selector,
          transitionDuration: '.25s',
        });
      });
    }
  }

  /*--------------------------------------------------------------
    8. Time and Date
  --------------------------------------------------------------*/
  function timeAndDatePicker() {
    if ($.exists('#cs_time_picker')) {
      $('#cs_time_picker').datetimepicker({
        format: 'LT',
      });
    }
    if ($.exists('#cs_date_picker')) {
      $('#cs_date_picker').datetimepicker({
        format: 'LL',
      });
    }
  }

  /*--------------------------------------------------------------
    9. Dynamic contact form
  --------------------------------------------------------------*/
  var formMessages = $('.form-message');

  $('.contact-form').submit(function (e) {
    e.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: $(this).attr('action'),
      data: formData,
    })
      .done(function (response) {
        formMessages.removeClass('error');
        formMessages.addClass('success');
        formMessages.text(response);
        $('.contact-form input, .contact-form textarea').val('');
      })
      .fail(function (data) {
        formMessages.removeClass('success');
        formMessages.addClass('error');
        if (data.responseText !== '') {
          formMessages.text(data.responseText);
        } else {
          formMessages.text(
            'Oops! An error occurred and your message could not be sent.',
          );
        }
      });
  });

  /*--------------------------------------------------------------
    10. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.cs_counter')) {
      $('.cs_counter').counterUp({
        delay: 10,
        time: 1000,
      });
    }
  }

  /*--------------------------------------------------------------
    11. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs_accordian').children('.cs_accordian-body').hide();
    $('.cs_accordian.active').children('.cs_accordian-body').show();
    $('.cs_accordian-head').on('click', function () {
      $(this).parent('.cs_accordian').siblings().children('.cs_accordian-body').slideUp(250);
      $(this).siblings().slideDown(250);
      $(this).parent('.cs_accordian').addClass('active').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    12. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs_tabs.cs_owl_tab .cs_tabs_controls a.cs_tabs_control').on('click', function (event) {
      event.preventDefault();
      var activeTab = $(this).attr('href');
      $('.cs_tabs.cs_owl_tab .cs_tabs_controls a.cs_tabs_control').removeClass('active');
      $(this).addClass('active');
      $('.cs_tabs.cs_owl_tab .cs_tab.cs_tab_panel').removeClass('active');
      $(activeTab).addClass('active');
    });
  }

  /*--------------------------------------------------------------
    13. Light Gallery
  --------------------------------------------------------------*/
  function lightGallery() {
    if ($.exists('.lightGallery')) {
      $('.lightGallery').lightGallery({
        thumbnail: true,
        selector: '.cs_lightbox_link',
      });
    }
  }

  /*--------------------------------------------------------------
    14. Before After Slider
  --------------------------------------------------------------*/
  function beforeAfterSlider() {
    if ($.exists('.cs_before_after')) {
      $('.cs_before_after').twentytwenty({
        before_label: 'Before', // Set a custom before label
        after_label: 'After', // Set a custom after label
        no_overlay: true, //Do not show the overlay with before and after
        move_slider_on_hover: true, // Move slider on mouse hover?
        move_with_handle_only: true, // Allow a user to swipe anywhere on the image to control slider movement.
        click_to_move: true, // Allow a user to click (or tap) anywhere on the image to move the slider to that location.
      });
    }
  }

  /*--------------------------------------------------------------
    15. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $('.cs_progress').each(function () {
      var ctrl = new ScrollMagic.Controller();
      new ScrollMagic.Scene({
        triggerElement: this,
        triggerHook: 'onEnter',
        duration: $(this).data('width'),
      })
        .setTween($(this).find('.cs_progress_in'), {
          width: $(this).data('width'),
        })
        .addTo(ctrl);
    });
  }

  /*--------------------------------------------------------------
    16. Review
  --------------------------------------------------------------*/
  function review() {
    if ($.exists('.cs_review')) {
      $('.cs_review').slick({
        autoplay: true,
        infinite: true,
        dots: false,
        arrows: false,
        slidesToShow: 1,
        fade: true,
        slidesToScroll: 1,
        autoplaySpeed: 2000,
        speed: 1000,
      });
    }
  }

  /*--------------------------------------------------------------
    17. Social btn active
  --------------------------------------------------------------*/
  function socialBtnInit() {
    $('.cs_social_btn').on('click', function (e) {
      $(this).toggleClass('active').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    18. Ripple
  --------------------------------------------------------------*/
  function rippleInit() {
    if ($.exists('.cs_ripple_version')) {
      $('.cs_ripple_version').each(function () {
        $(this).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      });
    }
  }
})($);
