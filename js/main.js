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
    }, {offset: '80%'});


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
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
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
const typedText = document.getElementById("typed-text");
const body = document.body; // Reference to the entire body
let isNight = false; // Move this outside to retain its value

// Function to apply theme
function applyTheme() {
    if (isNight) {
        // Night mode
        themeButton.textContent = "🌙";
        home.style.backgroundImage = "url('img/1.png')";

        home.classList.add("bg-dark");
        home.classList.remove("bg-light");
        greeting.classList.add("text-white");
        name.classList.add("text-white");
        qrLabel.classList.add("text-white");
        typedOutput.classList.add("text-white");
        typedOutput.classList.remove("text-dark");
        content.classList.add("text-right");
        content.classList.remove("text-left");
         // Move content to the left
         content.classList.add("move-right");
         content.classList.remove("move-left");

         //body.style.backgroundColor = "#121212"; // Dark background color
         //body.style.color = "#ffffff"; // Light text color

    } else {
        // Day mode
        
        themeButton.textContent = "☀️";
        home.style.backgroundImage = "url('img/2.jpg')";
        
        home.classList.add("bg-light");
        home.classList.remove("bg-dark");
        greeting.classList.remove("text-white");
        name.classList.remove("text-white");
        qrLabel.classList.remove("text-white");
        typedOutput.classList.remove("text-white");
        typedOutput.classList.add("text-dark");
        content.classList.add("text-left");
        content.classList.remove("text-right");
         // Move content to the left
         content.classList.add("move-left");
         content.classList.remove("move-right");

         //body.style.backgroundColor = "#ffffff"; // Light background color
         //body.style.color = "#000000"; // Dark text color
    }
}

// Event Listener for the Theme Button
themeButton.addEventListener("click", function () {
    isNight = !isNight; // Toggle theme
    applyTheme(); // Apply the new theme
});

// Apply initial theme
applyTheme();
