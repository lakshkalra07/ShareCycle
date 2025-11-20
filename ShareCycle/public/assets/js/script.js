// Typing animation + Back to Top button with site color variables

document.addEventListener("DOMContentLoaded", () => {
  // Typing animation for first h1
  const heading = document.querySelector("h1");
  if (heading) {
    const text = heading.textContent.trim();
    heading.textContent = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        heading.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Back to Top button
  const btn = document.createElement("button");
  btn.innerText = "↑ Top";
  btn.id = "backToTopBtn";

  Object.assign(btn.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "none",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    zIndex: "1000",
    transition: "background 0.3s, color 0.3s",
  });

  document.body.appendChild(btn);

  // Apply theme using CSS variables
  const applyThemeColors = () => {
    const root = getComputedStyle(document.documentElement);
    const accent = root.getPropertyValue("--accent-color")?.trim() || "#007bff";
    const textColor = root.getPropertyValue("--button-text-color")?.trim() || "#fff";
    const darkBg = root.getPropertyValue("--background-dark")?.trim() || "#222";
    const lightBg = root.getPropertyValue("--background-light")?.trim() || "#f8f9fa";

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      btn.style.background = accent || darkBg;
      btn.style.color = textColor || "#fff";
    } else {
      btn.style.background = accent || lightBg;
      btn.style.color = textColor || "#000";
    }
  };

  applyThemeColors();
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyThemeColors);

  // Show/hide on scroll
  window.addEventListener("scroll", () => {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  console.log("✅ script.js running with adaptive top button using site colors.");
});
// Add a small mobile nav toggle for pages that include a `.nav` element
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const navLinks = nav.querySelector('.nav-links');
  if (!navLinks) return;

  // create toggle button
  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';
  nav.appendChild(toggle);

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    toggle.classList.toggle('open');
  });

  // ensure menu hidden when resizing to larger screens
  window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
      navLinks.classList.remove('mobile-active');
      toggle.classList.remove('open');
    }
  });
});
// Example of how App.jsx should look if you extract the designed navbar
import Navbar from './components/Navbar'; // Import your designed navbar

const App = () => {
  return (
    <div>
      <Navbar /> {/* This ensures the nice header stays on ALL pages */}
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ... other routes ... */}
      </Routes>
    </div>
  );
};