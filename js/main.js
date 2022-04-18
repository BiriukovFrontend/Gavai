$(function () {

  $('.header__slider').slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrows-left.svg" alt=""></img>',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrows-right.svg" alt=""></img>',
    asNavFor: '.slider-dots',
  });


  $('.slider-dots').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    asNavFor: '.header__slider',
  });

  $('.surf-slider').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrows-left.svg" alt=""></img>',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrows-right.svg" alt=""></img>',
    asNavFor: '.slider-map',
  });

  $('.slider-map').slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.surf-slider',
    focusOnSelect: true,
  });

  $('.holder__slider, .shop__slider').slick({
    infinite: true,
    fade: true,
    prevArrow: '<img class="slider-arrows slider-arrows__left" src="./img/arrows-left.svg" alt=""></img>',
    nextArrow: '<img class="slider-arrows slider-arrows__right" src="./img/arrows-right.svg" alt=""></img>',
  });


  let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 0.5 // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
  for (let i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
      e.preventDefault(); //отменяем стандартное поведение
      let w = window.pageYOffset, // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1'); // к id элемента, к которому нужно перейти
      t = document.querySelector(hash).getBoundingClientRect().top, // отступ от окна браузера до id
        start = null;
      requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
      function step(time) {
        if (start === null) start = time;
        let progress = time - start,
          r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
        window.scrollTo(0, r);
        if (r != w + t) {
          requestAnimationFrame(step)
        } else {
          location.hash = hash // URL с хэшем
        }
      }
    }, false);
  }

  $('<div class="quantity-nav"><div class="quantity-button quantity-up"><img src="./img/Plus.svg" alt=""></div><div class="quantity-button quantity-down"><img src="./img/Minus.svg" alt=""></div></div>').insertAfter('.quantity input');
  $('.quantity').each(function () {
    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');

    btnUp.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue >= max) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue + 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

    btnDown.click(function () {
      var oldValue = parseFloat(input.val());
      if (oldValue <= min) {
        var newVal = oldValue;
      } else {
        var newVal = oldValue - 1;
      }
      spinner.find("input").val(newVal);
      spinner.find("input").trigger("change");
    });

  });
  $('.quantity-button').on('click', function () {
    let summ = $('.nights').val() * $('.summ').data('night') + ($('.guests').val() - 1) * $('.summ').data('guests');
    $('.summ').html(summ);
  });

  $('.surfboard-box__circle').on('click', function () {
    $(this).toggleClass('active')
  });

});