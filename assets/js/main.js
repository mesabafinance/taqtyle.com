$(document).ready(function () {
    $(".fades").each(function (index) {
        $(this).delay(400 * index).fadeIn(1000);
    });
});

$(document).on("click", "[data-toggle=\"lightbox\"]", function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
        $('.logo').fadeOut();
        $(".navbar").addClass("navbar-scroll-effect");
    } else {
        $('.logo').fadeIn();
        $(".navbar").removeClass("navbar-scroll-effect");
    }
});


$(".menu-icon").click(function () {
    $(".sidebar").toggleClass("active")
});


$(".menu li a").click(function () {
    $(".menu-icon").toggleClass("active")
    $(".sidebar").toggleClass("active")
});

// read the url to check for contact=sent parameter (contact form)
$(document).ready(
    function () {
        let searchParams = new URLSearchParams(window.location.search);
        let param = searchParams.get('contact');
        if (param == 'sent') {
            $('#contactForm').addClass('d-none');
            $('#contactSuccess').removeClass('d-none');
            $('#contactSuccess').addClass('d-block');
            $('#contactSuccess').get(0).scrollIntoView();
        }
    }
)
