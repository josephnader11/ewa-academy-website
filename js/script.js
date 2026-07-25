document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. SCROLL REVEAL (STAGGERED WATERFALL)
  // ==========================================
  // Dynamically monitors when elements enter the screen to trigger smooth entries
  const scrollElements = document.querySelectorAll('.impact-card, .video-banner, .footer-left');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
  };

  const displayScrollElement = (element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px) scale(0.98)";
    element.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), 
                                 transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)`;
    
    // Creates a staggered delay so cards load 1-2-3 sequentially
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0) scale(1)";
    }, index * 150); 
  };

  const handleScrollAnimation = () => {
    let revealedCount = 0;
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.1) && !el.classList.contains('js-revealed')) {
        el.classList.add('js-revealed');
        displayScrollElement(el, revealedCount);
        revealedCount++;
      }
    });
  };

  // Run on scroll and once on load
  window.addEventListener("scroll", handleScrollAnimation);
  handleScrollAnimation();


  // ==========================================
  // 2. MAGNETIC HOVER EFFECTS
  // ==========================================
  // Captures the exact mouse coordinates to pull elements towards the cursor gently
  const magneticLinks = document.querySelectorAll('.main-nav a, .social-anchor, .globe-lang-picker');

  magneticLinks.forEach(link => {
    link.addEventListener('mousemove', (e) => {
      const rect = link.getBoundingClientRect();
      // Calculate cursor position relative to the button center
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Pull element slightly towards coordinates (divided by 2.5 to keep it controlled)
      link.style.transform = `translate(${x / 2.5}px, ${y / 2.5}px) scale(1.08)`;
      link.style.transition = 'transform 0.1s linear';
    });

    link.addEventListener('mouseleave', () => {
      // Snap safely back to rest position
      link.style.transform = 'translate(0px, 0px) scale(1)';
      link.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
  });


  // ==========================================
  // 3. CAROUSEL DOT INTERACTION WITH WEIGHT SLIDING
  // ==========================================
  // Smoothly swaps active status and animates widths when you click pagination rings
  const dots = document.querySelectorAll('.dot');
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Clear previous active dots
      dots.forEach(d => d.classList.remove('active'));
      
      // Target active dot
      dot.classList.add('active');
      
      // Optional trigger hook: scroll to respective card track index view smoothly
      const targetGrid = document.querySelector('.impact-grid');
      if (targetGrid) {
        const cards = targetGrid.querySelectorAll('.impact-card');
        if (cards[index]) {
          cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    });
  });


  // ==========================================
  // 4. HEADER BACKGROUND DYNAMIC GLOW
  // ==========================================
  // Adds a subtle translucent background drop shadow as soon as the user scrolls away from the top
  const header = document.querySelector('.site-header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.style.backgroundColor = "rgba(19, 154, 157, 0.95)";
      header.style.backdropFilter = "blur(8px)";
      header.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
      header.style.transition = "all 0.4s ease";
    } else {
      header.style.backgroundColor = "#139a9d";
      header.style.backdropFilter = "none";
      header.style.boxShadow = "none";
    }
  });

});
// ==========================================
  // 1. SCROLL REVEAL (STAGGERED WATERFALL)
  // ==========================================
  // Add '.card' to the querySelectorAll list!
  const scrollElements = document.querySelectorAll('.impact-card, .video-banner, .footer-left, .card');