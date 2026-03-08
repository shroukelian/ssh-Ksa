document.addEventListener('DOMContentLoaded', () => {

    // 1. تهيئة مكتبة AOS للأنيميشن (تعمل مع كل سكرول صعوداً ونزولاً)
    AOS.init({
        duration: 800,
        once: false,   // الأنيميشن يتكرر ولا يظهر مرة واحدة فقط
        mirror: true,  // تكرار الحركة عند السكرول للأعلى
        offset: 50     // يبدأ الأنيميشن بسرعة بمجرد ظهور العنصر
    });

    // 2. تغيير شكل الهيدر (Navbar) عند التمرير
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. ميكانيكية القائمة الجانبية للموبايل (Mobile Menu)
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-btn i');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // تبديل الأيقونة بين (3 شرطات) و (X)
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.replace('fa-bars', 'fa-times');
            } else {
                menuIcon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط (للسكرول الناعم)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 4. تشغيل سلايدر العملاء (تلقائي + يدوي)
    const clientsContainer = document.querySelector('.clients-container');
    const cNextBtn = document.querySelector('.client-arrow.next');
    const cPrevBtn = document.querySelector('.client-arrow.prev');

    if (clientsContainer) {
        const scrollAmount = 300; // مسافة التحرك
        const autoTime = 3000;   // يتحرك كل 3 ثوانٍ

        const moveNext = () => {
            // إذا وصل للنهاية يرجع للبداية
            if (Math.abs(clientsContainer.scrollLeft) >= (clientsContainer.scrollWidth - clientsContainer.clientWidth - 10)) {
                clientsContainer.scrollLeft = 0;
            } else {
                clientsContainer.scrollLeft -= scrollAmount; // التحرك لليسار في RTL
            }
        };

        const movePrev = () => {
            clientsContainer.scrollLeft += scrollAmount;
        };

        // تشغيل الحركة التلقائية
        let clientAutoRun = setInterval(moveNext, autoTime);

        // توقف الحركة عند وضع الماوس لسهولة الرؤية
        clientsContainer.addEventListener('mouseenter', () => clearInterval(clientAutoRun));
        clientsContainer.addEventListener('mouseleave', () => clientAutoRun = setInterval(moveNext, autoTime));

        // الأزرار اليدوية
        if (cNextBtn) cNextBtn.addEventListener('click', moveNext);
        if (cPrevBtn) cPrevBtn.addEventListener('click', movePrev);
    }

    // 5. نظام السلايدر الرئيسي (HERO Slider - 5 واجهات)
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let heroAutoRun;

    function showHeroSlides(index) {
        if (slides.length === 0) return;

        // ضبط الاندكس
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        // حذف النشاط من الكل وتفعيله للحالي
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

    // دالة التحكم اليدوي بالنقط (Dot Navigation)
    window.currentSlide = function(index) {
        clearInterval(heroAutoRun);
        showHeroSlides(index);
        startHeroAuto();
    };

    // تشغيل سلايدر الهيرو لأول مرة
    if (slides.length > 0) {
        showHeroSlides(0);
        startHeroAuto();
    }
});