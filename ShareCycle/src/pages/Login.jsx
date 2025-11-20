import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // --- 1. Script Loading ---
  useEffect(() => {
    // Load external scripts
    const authScript = document.createElement("script");
    authScript.src = "/assets/js/auth.js";
    authScript.defer = true;

    const mainScript = document.createElement("script");
    mainScript.src = "/assets/js/script.js";
    mainScript.defer = true;

    document.body.appendChild(authScript);
    document.body.appendChild(mainScript);

    // Cleanup scripts on unmount
    return () => {
      const s1 = document.querySelector("script[src='/assets/js/auth.js']");
      if (s1) s1.remove();

      const s2 = document.querySelector("script[src='/assets/js/script.js']");
      if (s2) s2.remove();
    };
  }, []);

  // --- 2. Typing Animation Logic ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Back", "Home"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  // --- 3. Login Handler ---
  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login validation
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(email && password) {
      // On successful login, redirect to Donate page (as per your original flow)
      navigate('/donate'); 
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="page-root">
      {/* Animation CSS */}
      <style>{`@keyframes blink { 50% { opacity: 0; } } .cursor { animation: blink 1s step-end infinite; color: #333; }`}</style>

      <header className="header-short">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}>
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23ffab17'/><path d='M30 40h40v5H30zm0 10h40v5H30zm0 10h25v5H30z' fill='white'/></svg>" alt="ShareCycle Logo" />
                <span>ShareCycle</span>
              </Link>
            </div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/campaigns">Campaigns</Link></li>
              <li><Link to="/impact">Our Impact</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/volunteer">Volunteer</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="auth-section">
          <div className="auth-form">
            <div id="login-form">
              {/* Animated Header */}
              <h2>
                Welcome <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
              </h2>
              <p>Please enter your details to login.</p>
              
              <form onSubmit={handleLogin}>
                <input type="email" name="email" id="login-email" placeholder="Email" required />
                <input type="password" name="password" id="login-password" placeholder="Password" required />
                <button type="submit" className="cta-button auth-button" id="login-btn" style={{width: '100%', border: 'none', cursor: 'pointer'}}>Login</button>
              </form>

              <p className="auth-switch">
                Don't have an account? <Link to="/signup" id="show-signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><circle cx='40' cy='40' r='35' fill='%23ffab17'/><path d='M25 30h30v4H25zm0 8h30v4H25zm0 8h20v4H25z' fill='white'/></svg>" alt="ShareCycle" className="footer-logo" />
              <div className="footer-info">
                <h3 className="footer-title">ShareCycle</h3>
                <div className="footer-links">
                  <Link to="#">Privacy Policy</Link>
                  <Link to="#">Terms & Conditions</Link>
                  <a href="tel:1234567890">123-456-7890</a>
                  <a href="mailto:lakshkalra9@gmail.com">lakshkalra9@gmail.com</a>
                  <Link to="#">FAQ's</Link>
                  <Link to="#">Help Center</Link>
                </div>
              </div>
            </div>
            <div className="footer-forms">
              <div className="newsletter">
                <h3 className="newsletter-title">Subscribe Newsletter</h3>
                <p className="newsletter-text">Receive updates on urgent campaigns and volunteering events every Monday.</p>
                <form action="https://api.web3forms.com/submit" method="POST">
                  <input type="hidden" name="access_key" value="54a34215-7ff7-4847-bd8f-62192c90065d" />
                  <input type="hidden" name="subject" value="New Newsletter Subscription from ShareCycle" />
                  <div className="email-signup">
                    <input type="email" name="email" placeholder="Enter your Email Address" className="email-input" required />
                    <button type="submit" className="subscribe-button">Subscribe</button>
                  </div>
                </form>
              </div>
              <div className="feedback">
                <h3 className="feedback-title">Give us your Feedback</h3>
                <form action="https://api.web3forms.com/submit" method="POST">
                  <input type="hidden" name="access_key" value="54a34215-7ff7-4847-bd8f-62192c90065d" />
                  <input type="hidden" name="subject" value="New Feedback from ShareCycle Website" />
                  <input type="text" name="name" placeholder="Your Name" required />
                  <input type="email" name="email" placeholder="Your Email" required />
                  <textarea name="message" placeholder="Your Feedback" rows="3" required></textarea>
                  <button type="submit" className="subscribe-button">Submit Feedback</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;