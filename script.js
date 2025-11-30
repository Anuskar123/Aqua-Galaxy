// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar") && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
  }
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  }

  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in effect to sections
document.querySelectorAll("section:not(.hero)").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  fadeInObserver.observe(section);
});

// Gallery image modal (click to enlarge)
document.querySelectorAll(".gallery-card, .preview-card").forEach((card) => {
  card.addEventListener("click", function () {
    const img = this.querySelector("img");
    if (!img) return;

    const modal = document.createElement("div");
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
      animation: fadeIn 0.3s ease;
    `;

    const modalImg = document.createElement("img");
    modalImg.src = img.src;
    modalImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      animation: zoomIn 0.3s ease;
    `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    modal.addEventListener("click", () => {
      document.body.removeChild(modal);
      document.body.style.overflow = "auto";
    });
  });
});

// Video hover preview
document.querySelectorAll(".video-card video").forEach((video) => {
  let playPromise;

  video.addEventListener("mouseenter", function () {
    playPromise = this.play();
  });

  video.addEventListener("mouseleave", function () {
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.pause();
        })
        .catch((error) => {
          // Video play was interrupted
        });
    }
  });
});

// Phone number click tracking (optional)
document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
  link.addEventListener("click", () => {
    console.log("Phone number clicked");
    // You can add analytics tracking here
  });
});

// Add hover effect to service cards
document
  .querySelectorAll(".service-modern, .service-detail-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes zoomIn {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Active page indicator
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-menu a").forEach((link) => {
  const href = link.getAttribute("href");
  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});
