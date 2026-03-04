document.addEventListener('DOMContentLoaded', () => {
    // تشغيل الأنيميشن
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // سكرول ناعم للهيدر
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.style.padding = '10px 0';
            nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            nav.style.padding = '15px 0';
            nav.style.boxShadow = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-btn i');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // 1. تفعيل أو إخفاء القائمة
            navLinks.classList.toggle('active');

            // 2. تغيير شكل الأيقونة من (3 شرطات) لـ (X) والعكس
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // إغلاق القائمة تلقائياً عند الضغط على أي رابط داخلها
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.replace('fa-times', 'fa-bars');
        });
    });
});

// تشغيل سلايدر العملاء
const container = document.querySelector('.clients-container');
const nextBtn = document.querySelector('.client-arrow.next');
const prevBtn = document.querySelector('.client-arrow.prev');

if(container && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
        container.scrollLeft -= 250; // السكرول لليسار (RTL)
    });

    prevBtn.addEventListener('click', () => {
        container.scrollLeft += 250; // السكرول لليمين (RTL)
    });
}

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlides(index) {
    // إزالة الحالة النشطة من الجميع
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // ضبط الاندكس
    if (index >= slides.length) currentSlideIndex = 0;
    if (index < 0) currentSlideIndex = slides.length - 1;

    // تفعيل السلايد والنقطة الحالية
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// التغيير التلقائي كل 5 ثوانٍ
let slideInterval = setInterval(() => {
    currentSlideIndex++;
    showSlides(currentSlideIndex);
}, 5000);

// دالة التحكم اليدوي بالنقاط
function currentSlide(index) {
    clearInterval(slideInterval); // إيقاف المؤقت عند الضغط اليدوي
    currentSlideIndex = index;
    showSlides(currentSlideIndex);
    // إعادة تشغيل المؤقت
    slideInterval = setInterval(() => {
        currentSlideIndex++;
        showSlides(currentSlideIndex);
    }, 5000);
}