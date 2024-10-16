(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
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
        }
    });


    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        //console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '80%' });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
    $(document).ready(function () {
        var startDate = new Date(2022, 7, 13); // Starting date: August 13, 2022
        var endDate = new Date(2024, 10, 15); // Ending date: November 15, 2024

        // Calculate the difference in years and months
        var years = endDate.getFullYear() - startDate.getFullYear();
        var months = endDate.getMonth() - startDate.getMonth();
        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }
        var totalExpStr = years + " Years " + months + " Months";
        document.getElementById('totalWorkExpSummary').innerText = totalExpStr;
        document.getElementById('totalWorkExp').innerText = totalExpStr;
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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });

    let arr = ["https://github-readme-streak-stats.herokuapp.com/?user=aravind-govindhasamy&", "https://github-readme-stats.vercel.app/api/top-langs/?username=aravind-govindhasamy", "https://github-readme-stats.vercel.app/api?username=aravind-govindhasamy&show_icons=true&locale=en"];

    let j = 0;
    function slides2() {
        document.getElementById("image2").src = arr[j];
        if (j < arr.length - 1) j++;
        else j = 0;
    }
    setInterval(slides2, 3000);

})(jQuery);

const themeButton = document.getElementById("theme-button");
const home = document.getElementById("home");
const content = document.getElementById("content");
const greeting = document.getElementById("greeting");
const name = document.getElementById("name");
const qrLabel = document.getElementById("qr-label");
const typedOutput = document.getElementById("typed-output");
let isNight = false; // Retain value across theme changes

// Function to apply theme
function applyTheme() {
     home.classList.add("bg-dark");
        home.classList.remove("bg-light");
        greeting.classList.add("text-white");
        name.classList.add("text-white");
        qrLabel.classList.add("text-white");
    if (isNight) {
        themeButton.textContent = "🌙";
        home.style.backgroundImage = "url('img/1.png')";
       
        typedOutput.classList.add("text-white");
        typedOutput.classList.remove("text-dark");
        //content.classList.add("move-right");
        //content.classList.remove("move-left");
    } else {
        themeButton.textContent = "☀️";
        home.style.backgroundImage = "url('img/3.png')";
        // home.classList.add("bg-light");
        // home.classList.remove("bg-dark");
        // greeting.classList.remove("text-white");
        // name.classList.remove("text-white");
        // qrLabel.classList.remove("text-white");
        typedOutput.classList.remove("text-white");
        typedOutput.classList.add("text-dark");
        //content.classList.add("move-left");
        //content.classList.remove("move-right");
    }
}

// Event Listener for the Theme Button
themeButton.addEventListener("click", function () {
    isNight = !isNight; // Toggle theme
    applyTheme(); // Apply the new theme
});

// Apply initial theme
applyTheme();



$(document).ready(function() {
    const data = [
        {
            "name": "John Doe",
            "position": "CEO, Example Co.",
            "testimonial": "Aravind's expertise in backend development helped us streamline our processes significantly. His innovative solutions made a real difference!"
        },
        {
            "name": "Jane Smith",
            "position": "Project Manager, Tech Solutions",
            "testimonial": "Working with Aravind was a fantastic experience. He was always available to answer questions and provided exceptional quality work."
        },
        {
            "name": "Alice Johnson",
            "position": "Lead Developer, Web Innovations",
            "testimonial": "Aravind is a talented developer who consistently delivers high-quality solutions. I highly recommend him for any software projects!"
        }
    ];

    let testimonials = '';
    $.each(data, function(index, testimonial) {
        testimonials += `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <div class="testimonial-container"> <!-- Boxed layout -->
                <p class="testimonial-text">"${testimonial.testimonial}"</p>
                <h5 class="mt-3">${testimonial.name}</h5>
                <small class="text-muted">${testimonial.position}</small>
            </div>
        </div>
    `;
    });
    $('#testimonial-content').html(testimonials);
});

