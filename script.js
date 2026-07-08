/* ============================================================
   TITANIO CAFÉ BAR — JavaScript
   Interactividad: Scroll reveal, menú mobile, formularios a WhatsApp
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------
  // 1. SCROLL REVEAL — Intersection Observer
  // --------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // --------------------------------------------------------
  // 2. MOBILE MENU — Hamburger toggle
  // --------------------------------------------------------
  const burger = document.getElementById('burger');
  const nav = document.getElementById('mainNav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        nav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!burger.contains(e.target) && !nav.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------
  // 3. HEADER — Add shadow on scroll
  // --------------------------------------------------------
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // --------------------------------------------------------
  // 4. SMOOTH SCROLL — For anchor links
  // --------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --------------------------------------------------------
  // 5. CONTACT FORM → WhatsApp
  // --------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // Build WhatsApp message
      let whatsappMessage = `Hola! Soy ${name}.`;
      
      if (subject) {
        whatsappMessage += `\n\nNecesito: ${subject}`;
      }
      
      if (message) {
        whatsappMessage += `\n\n${message}`;
      }
      
      if (phone) {
        whatsappMessage += `\n\nMi número de contacto: ${phone}`;
      }
      
      // Encode the message
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // WhatsApp link
      const whatsappUrl = `https://wa.me/5491166651174?text=${encodedMessage}`;
      
      // Open in new tab
      window.open(whatsappUrl, '_blank');
      
      // Show success feedback
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = '¡Abriendo WhatsApp...';
      btn.style.backgroundColor = '#25D366';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        contactForm.reset();
      }, 2000);
    });
  }

  // --------------------------------------------------------
  // 6. NEWSLETTER FORM → WhatsApp
  // --------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = newsletterForm.querySelector('input[type="email"]').value.trim();
      
      if (email) {
        const message = `Hola! Quiero suscribirme al newsletter.\n\nMi email: ${email}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5491166651174?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
        
        // Show success feedback
        const btn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = '¡Gracias!';
        btn.style.backgroundColor = '#25D366';
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          newsletterForm.reset();
        }, 2000);
      }
    });
  }

  // --------------------------------------------------------
  // 7. STAGGERED REVEAL — For grid items
  // --------------------------------------------------------
  const staggerContainers = document.querySelectorAll(
    '.diferenciales__grid, .menu__items, .proceso__steps, .testimonios__grid, .momentos__grid, .prensa__grid, .historia__team'
  );

  staggerContainers.forEach((container) => {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.style.transitionDelay = `${index * 0.1}s`;
    });
  });

  // --------------------------------------------------------
  // 8. COUNTER ANIMATION — For testimonial rating
  // --------------------------------------------------------
  const ratingScore = document.querySelector('.testimonios__rating-score');
  
  if (ratingScore) {
    const targetScore = 4.9;
    let currentScore = 0;
    let animated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          
          const duration = 1500;
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            currentScore = eased * targetScore;
            
            ratingScore.textContent = currentScore.toFixed(1);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              ratingScore.textContent = targetScore.toFixed(1);
            }
          };
          
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.5 });
    
    counterObserver.observe(ratingScore);
  }

  // --------------------------------------------------------
  // 9. WHATSAPP FLOAT — Hide/show on scroll
  // --------------------------------------------------------
  const whatsappFloat = document.querySelector('.whatsapp-float');
  
  if (whatsappFloat) {
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Show button after scrolling down a bit
      if (currentScrollY > 200) {
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.visibility = 'visible';
        whatsappFloat.style.transform = 'scale(1)';
      } else {
        whatsappFloat.style.opacity = '0.5';
      }
      
      lastScrollY = currentScrollY;
    });
    
    // Initially partially visible
    whatsappFloat.style.transition = 'all 0.3s ease';
  }

  // --------------------------------------------------------
  // 10. PARALLAX EFFECT — For hero section
  // --------------------------------------------------------
  const hero = document.querySelector('.hero');
  
  if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = hero.offsetHeight;
      
      if (scrolled < heroHeight) {
        const parallaxOffset = scrolled * 0.3;
        hero.style.backgroundPositionY = `calc(50% + ${parallaxOffset}px)`;
      }
    });
  }

  // --------------------------------------------------------
  // 11. MENU CATEGORY HIGHLIGHT — Active category
  // --------------------------------------------------------
  const menuCategories = document.querySelectorAll('.menu__category');
  
  if (menuCategories.length > 0) {
    const categoryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    menuCategories.forEach((category, index) => {
      category.style.opacity = '0';
      category.style.transform = 'translateX(-20px)';
      category.style.transition = `all 0.6s ease ${index * 0.15}s`;
      categoryObserver.observe(category);
    });
  }

  // --------------------------------------------------------
  // 12. LOADING STATE — Remove loading class
  // --------------------------------------------------------
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

});
