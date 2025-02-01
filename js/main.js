(function ($) {
    "use strict";

    // Zajistí, že navbar je vidět hned po načtení stránky
    $(document).ready(function () {
        $('.navbar').css('display', 'flex');
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');

            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }

            // Zavření navbaru na mobilních zařízeních po kliknutí na odkaz
            if ($(window).width() < 992) {
                $(".navbar-collapse").collapse('hide');
            }
        }
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    $(document).ready(function () {
        $(".gallery-carousel").owlCarousel({
            autoplay: true, // Automatické posouvání
            autoplayTimeout: 3000, // Čas mezi posunutími (3 sekundy)
            autoplayHoverPause: true, // Pauza při najetí myší
            loop: true, // Nekonečné opakování
            smartSpeed: 1000, // Plynulé přechody
            dots: true, // Navigační tečky
            nav: true, // Šipky pro manuální přepínání
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 }, // 1 obrázek na mobilu
                576: { items: 2 }, // 2 obrázky na menších displejích
                768: { items: 3 }, // 3 obrázky na tabletu
                992: { items: 4 }, // 4 obrázky na velkých obrazovkách
                1200: { items: 5 } // 5 obrázků na širokých monitorech
            }
        });
    });


    

})(jQuery);


document.addEventListener('DOMContentLoaded', function () {
    // Vybereme všechny prvky, které mají animace
    const animatedElements = document.querySelectorAll('.harmonogram-animate, .item-animate');

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('harmonogram-animate')) {
                        entry.target.classList.add('harmonogram-visible'); // Přidá classu pro form animaci
                    } else if (entry.target.classList.contains('item-animate')) {
                        entry.target.classList.add('visible'); // Přidá classu pro obecnou animaci
                    }
                    observer.unobserve(entry.target); // Přestane sledovat po animaci
                }
            });
        },
        { threshold: 0.5 } // Aktivace při viditelnosti 50 %
    );

    // Sledujeme všechny nalezené prvky
    animatedElements.forEach(element => observer.observe(element));
});
