document.addEventListener('DOMContentLoaded', () => {

    AOS.init({
        duration: 800,
        once: false, 
        mirror: true, 
        offset: 50    
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-btn i');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    const clientsContainer = document.querySelector('.clients-container');
    const cNextBtn = document.querySelector('.client-arrow.next');
    const cPrevBtn = document.querySelector('.client-arrow.prev');

    if (clientsContainer) {
        const scrollAmount = 300; 
        const autoTime = 3000;   

        const moveNext = () => {
            if (Math.abs(clientsContainer.scrollLeft) >= (clientsContainer.scrollWidth - clientsContainer.clientWidth - 10)) {
                clientsContainer.scrollLeft = 0;
            } else {
                clientsContainer.scrollLeft -= scrollAmount;
            }
        };

        const movePrev = () => {
            clientsContainer.scrollLeft += scrollAmount;
        };

        let clientAutoRun = setInterval(moveNext, autoTime);

        clientsContainer.addEventListener('mouseenter', () => clearInterval(clientAutoRun));
        clientsContainer.addEventListener('mouseleave', () => clientAutoRun = setInterval(moveNext, autoTime));

        if (cNextBtn) cNextBtn.addEventListener('click', moveNext);
        if (cPrevBtn) cPrevBtn.addEventListener('click', movePrev);
    }

    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let heroAutoRun;

    function showHeroSlides(index) {
        if (slides.length === 0) return;

        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[currentSlideIndex].classList.add('active');
        if (dots[currentSlideIndex]) dots[currentSlideIndex].classList.add('active');
    }

    function startHeroAuto() {
        heroAutoRun = setInterval(() => {
            showHeroSlides(currentSlideIndex + 1);
        }, 5000);
    }

    window.currentSlide = function(index) {
        clearInterval(heroAutoRun);
        showHeroSlides(index);
        startHeroAuto();
    };

    if (slides.length > 0) {
        showHeroSlides(0);
        startHeroAuto();
    }
});