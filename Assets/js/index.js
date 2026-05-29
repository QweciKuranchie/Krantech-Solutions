// Mobile menu toggle and nav overlay for side drawer
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.getElementById("nav");
let navOverlay = document.querySelector('.nav-overlay');
if (!navOverlay) {
  navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);
}
function closeNavDrawer() {
  nav.classList.remove("active");
  navOverlay.classList.remove("active");
}
if (mobileMenu && nav) {
  mobileMenu.addEventListener("click", function (e) {
    nav.classList.toggle("active");
    if (nav.classList.contains("active")) {
      navOverlay.classList.add("active");
    } else {
      navOverlay.classList.remove("active");
    }
  });
  navOverlay.addEventListener('click', closeNavDrawer);
  // Close nav when clicking a link (mobile)
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNavDrawer);
  });
}
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        // Only smooth scroll for in-page anchors
        const href = this.getAttribute("href");
        if (href.startsWith("#")) {
          e.preventDefault();
          document.querySelector(href).scrollIntoView({ behavior: "smooth" });
          document.getElementById("nav").classList.remove("active");
        }
      });
    });

    // Banner slider logic
    (function() {
      const banners = document.querySelectorAll('#banner-slider .banner');
      const prevBtn = document.querySelector('.banner-prev');
      const nextBtn = document.querySelector('.banner-next');
      if (banners.length === 0) return;
      
      let current = 0;
      let timer;
      function showSlide(idx) {
        banners.forEach((b, i) => b.classList.toggle('active', i === idx));
      }
      function nextSlide() {
        current = (current + 1) % banners.length;
        showSlide(current);
      }
      function prevSlide() {
        current = (current - 1 + banners.length) % banners.length;
        showSlide(current);
      }
      
      if (nextBtn && prevBtn && banners.length > 1) {
        nextBtn.addEventListener('click', function() {
          nextSlide();
          resetTimer();
        });
        prevBtn.addEventListener('click', function() {
          prevSlide();
          resetTimer();
        });
        function resetTimer() {
          clearInterval(timer);
          timer = setInterval(nextSlide, 6000);
        }
        timer = setInterval(nextSlide, 6000);
      }
      showSlide(current);
    })();

    // Contact form validation and feedback
    const contactForm = document.querySelector(".contact-form form");
    if (contactForm) {
      contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var name = document.getElementById("name").value.trim();
        var email = document.getElementById("email").value.trim();
        var message = document.getElementById("message").value.trim();
        var msgDiv = document.getElementById("form-message");
        if (!name || !email || !message) {
          msgDiv.style.color = "#e53935";
          msgDiv.textContent = "Please fill in all required fields.";
          return;
        }
        // Simple email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          msgDiv.style.color = "#e53935";
          msgDiv.textContent = "Please enter a valid email address.";
          return;
        }
        msgDiv.style.color = "#43a047";
        msgDiv.textContent = "Thank you for contacting us, " + name + "! We will get back to you soon.";
        this.reset();
      });
    }

// Generic scroll reveal observer for premium buttery-smooth section entrances
const revealSections = document.querySelectorAll('.testimonials, .counters, .services, .about, .why-choose-us, .contact, .our-team, .projects, .testimonials-fluid');
if (revealSections.length > 0) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-section');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealSections.forEach(section => revealObserver.observe(section));
}

// Animated Counters (with fade-in on scroll)
const counterSection = document.querySelector('.counters');
let countersAnimated = false;
function animateCounters() {
  document.querySelectorAll('.counter').forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
      const c = +counter.innerText;
      const increment = Math.ceil(target / 100);
      if (c < target) {
        counter.innerText = c + increment;
        setTimeout(updateCounter, 30);
      } else {
        counter.innerText = target;
      }
    };
    updateCounter();
  });
}
if (counterSection) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
        counterSection.classList.add('fade-in-section');
        countersAnimated = true;
        observer.unobserve(counterSection);
      }
    });
  }, { threshold: 0.3 });
  counterObserver.observe(counterSection);
}

// Animate testimonials on scroll and handle testimonials slider
const testimonialsSection = document.querySelector('.testimonials-fluid');
if (testimonialsSection) {
  // Fade-in on scroll
  const testimonialsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        testimonialsSection.classList.add('fade-in-section');
        observer.unobserve(testimonialsSection);
      }
    });
  }, { threshold: 0.2 });
  testimonialsObserver.observe(testimonialsSection);

  // Testimonials slider logic
  const slides = testimonialsSection.querySelectorAll('.testimonial-slide');
  const prevBtn = testimonialsSection.querySelector('.testimonial-prev');
  const nextBtn = testimonialsSection.querySelector('.testimonial-next');
  const dots = testimonialsSection.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  let testimonialTimer;

  function showTestimonial(idx) {
    slides.forEach((slide, i) => {
      slide.style.display = i === idx ? 'block' : 'none';
      slide.classList.toggle('active', i === idx);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
      dot.style.background = i === idx ? 'var(--primary)' : '#bbb';
    });
    currentSlide = idx;
  }
  function nextTestimonial() {
    let idx = (currentSlide + 1) % slides.length;
    showTestimonial(idx);
  }
  function prevTestimonial() {
    let idx = (currentSlide - 1 + slides.length) % slides.length;
    showTestimonial(idx);
  }
  function resetTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, 7000);
  }
  if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', function() {
      nextTestimonial();
      resetTestimonialTimer();
    });
    prevBtn.addEventListener('click', function() {
      prevTestimonial();
      resetTestimonialTimer();
    });
  }
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function() {
      showTestimonial(i);
      resetTestimonialTimer();
    });
  });
  testimonialTimer = setInterval(nextTestimonial, 7000);
  showTestimonial(currentSlide);
}
// Back to Top Button
{
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Dark mode toggle logic (single handler, persistent)
{
  const darkModeToggleBtn = document.getElementById('darkModeToggle');
  if (darkModeToggleBtn) {
    // Restore mode on load
    if (localStorage.getItem('krantech-dark-mode') === 'true') {
      document.body.classList.add('dark-mode');
      const icon = darkModeToggleBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    }
    darkModeToggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('krantech-dark-mode', 'true');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('krantech-dark-mode', 'false');
      }
    });
  }
}

// Header shrink on scroll
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function() {
  if (!header) return;
  if (window.scrollY > 60) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});