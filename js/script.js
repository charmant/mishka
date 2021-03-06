var ESC_KEYCODE = 27;
var navMain = document.querySelector('.main-nav');
var buttonOrder = document.querySelectorAll('.button-order')
var modalSection = document.querySelector('.modal');
var modalBackground = document.querySelector('.modal__background');
var navToggle = document.querySelector('.main-nav__toggle');
var mapSection = document.getElementById("map");
navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

if (buttonOrder) {
  buttonOrder.forEach(function(item) {
    item.addEventListener('click', function () {
      if (modalSection.classList.contains('modal--open')) {
        modalSection.classList.remove('modal--open');
        modalBackground.classList.remove('modal--open');
      } else {
        modalSection.classList.add('modal--open');
        modalBackground.classList.add('modal--open');
      }
    });

  })


  modalBackground.addEventListener('click', function () {
    modalSection.classList.remove('modal--open');
    modalBackground.classList.remove('modal--open');
  });

  window.addEventListener("keydown", function (event) {
    if (event.keyCode === ESC_KEYCODE) {
      modalSection.classList.remove('modal--open');
      modalBackground.classList.remove('modal--open');
    }
  });
};

if (mapSection) {
  function initMap() {
    var map = new google.maps.Map(mapSection, {
      zoom: 17,
      center: {lat: 59.938786, lng: 30.323062 }
    });
    var pointer = {
      url: "img/icon-map-pin.svg",
      scaledSize: new google.maps.Size(67, 100)
    };
    var marker = new google.maps.Marker({
      position: {lat: 59.938786, lng: 30.323062 },
      map: map,
      icon: pointer,
      title: 'HTML Academy'
    });
  }
};
