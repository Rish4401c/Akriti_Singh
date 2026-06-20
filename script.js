document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // 1. ENGINE PRELOADER CLOSURE
  // ==========================================
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.visibility = "hidden";
      }, 600);
    });
    
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 2500);
  }

  // ==========================================
  // 2. TEXT TYPEWRITER ENGINE
  // ==========================================
  const typingSpan = document.getElementById("typing");
  if (typingSpan) {
    const roles = [
      "Junior Accountant",
      "Accounts Executive",
      "Ledger Reconciliation Specialist",
      "GST & TDS Compliance Expert"
    ];
    let roleIdx = 0, charIdx = 0;
    let isDeleting = false;

    function executeTypecycle() {
      const currentRole = roles[roleIdx];
      if (isDeleting) {
        typingSpan.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        typingSpan.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let dynamicSpeed = isDeleting ? 40 : 80;

      if (!isDeleting && charIdx === currentRole.length) {
        dynamicSpeed = 1800; 
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        dynamicSpeed = 400; 
      }

      setTimeout(executeTypecycle, dynamicSpeed);
    }
    executeTypecycle();
  }

  // ==========================================
  // 3. MOTION VECTOR CURSOR LOGIC
  // ==========================================
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");

  if (dot && ring) {
    window.addEventListener("mousemove", (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;

      ring.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
      }, { duration: 120, fill: "forwards" });
    });

    document.querySelectorAll("a, button, .btn, .stat-card, .skill-tags span, .contact-item, .icon-card").forEach(item => {
      item.addEventListener("mouseenter", () => ring.classList.add("active"));
      item.addEventListener("mouseleave", () => ring.classList.remove("active"));
    });
  }

  // ==========================================
  // 4. METRIC PROGRESS OVERRIDE & INTERSECTION REVEALS
  // ==========================================
  const progressBar = document.getElementById("progress-bar");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        if (entry.target.classList.contains("stat-card")) {
          triggerNumericalCounter(entry.target);
        }
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".section, .stat-card, .skill-category, .timeline-item, .edu-card, .contact-item").forEach(el => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  window.addEventListener("scroll", () => {
    const top = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0 && progressBar) {
      progressBar.style.width = `${(top / height) * 100}%`;
    }
  });

  // ==========================================
  // 5. MATH ENGINE: NUMERICAL STAT COUNTERS
  // ==========================================
  function triggerNumericalCounter(card) {
    const textTarget = card.querySelector(".counter");
    if (!textTarget || textTarget.classList.contains("counted")) return;

    textTarget.classList.add("counted");
    const parsedTarget = parseInt(textTarget.getAttribute("data-target"), 10);
    let startVal = 0;
    const runtime = 1500; 
    const paceStep = parsedTarget / (runtime / 16);

    function computeFrame() {
      startVal += paceStep;
      if (startVal < parsedTarget) {
        textTarget.textContent = Math.floor(startVal);
        requestAnimationFrame(computeFrame);
      } else {
        textTarget.textContent = parsedTarget;
      }
    }
    requestAnimationFrame(computeFrame);
  }

  // ==========================================
  // 6. BAR ANALYSIS SYSTEM (CHART.JS REBUILD)
  // ==========================================
  const canvasTarget = document.getElementById("skillChart");
  if (canvasTarget) {
    Chart.defaults.color = "#a39bb3";
    Chart.defaults.font.family = "'Poppins', sans-serif";

    new Chart(canvasTarget, {
      type: "bar",
      data: {
        labels: [
          "Tally Prime ERP", 
          "Busy Software", 
          "GST Portal Filings", 
          "TDS Processing", 
          "Advanced MS Excel", 
          "Bank Reconciliation", 
          "Ledger Auditing"
        ],
        datasets: [{
          label: "Core Task Mastery Level (%)",
          data: [95, 92, 86, 82, 88, 96, 90],
          backgroundColor: [
            "rgba(255, 0, 127, 0.65)",  // Neon Pink
            "rgba(0, 240, 255, 0.65)",  // Electric Cyan
            "rgba(112, 0, 255, 0.65)"   // Rich Purple
          ],
          borderColor: ["#ff007f", "#00f0ff", "#7000ff"],
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: ["#ff007f", "#00f0ff", "#7000ff"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { 
            beginAtZero: true, 
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { callback: val => val + "%" }
          }
        }
      }
    });
  }

  // ==========================================
  // 7. RESPONSIVE LAYER HEADER TOGGLES
  // ==========================================
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const subIcon = menuBtn.querySelector("i");
      subIcon.className = navLinks.classList.contains("active") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.querySelector("i").className = "fa-solid fa-bars";
      });
    });
  }

  // ==========================================
  // 8. PARTICLES BACKGROUND GENERATION (CYBER NET)
  // ==========================================
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 65, density: { enable: true, value_area: 1200 } },
        color: { value: ["#ff007f", "#00f0ff", "#7000ff"] },
        shape: { type: "circle" },
        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
        line_linked: {
          enable: true, distance: 160, color: "#7000ff", opacity: 0.3, width: 1.5
        },
        move: { enable: true, speed: 1.2, direction: "none", random: true, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" },
          resize: true
        },
        modes: {
          grab: { distance: 220, line_linked: { opacity: 0.8 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });
  }
});