$(document).ready(function () {
    $(".fades").each(function (index) {
        $(this).delay(400 * index).fadeIn(1000);
    });
});

$(document).on("click", "[data-toggle=\"lightbox\"]", function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 0) {
      $('.logo').fadeOut();
      $(".navbar").addClass("navbar-scroll-effect");
    } else {
      $('.logo').fadeIn();
      $(".navbar").removeClass("navbar-scroll-effect");
    }
  });

