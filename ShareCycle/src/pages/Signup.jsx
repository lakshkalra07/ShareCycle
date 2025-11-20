import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // --- 1. Script Loading ---
  useEffect(() => {
    const authScript = document.createElement('script');
    authScript.src = '/assets/js/auth.js';
    authScript.defer = true;

    const mainScript = document.createElement('script');
    mainScript.src = '/assets/js/script.js';
    mainScript.defer = true;

    document.body.appendChild(authScript);
    document.body.appendChild(mainScript);

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

  const words = ["Account", "Community", "Change"];

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

  // --- 3. Signup Handler ---
  const handleSignup = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(name && email && password) {
      // Simulate successful signup and redirect
      navigate('/donate'); 
    } else {
      alert("Please fill in all fields");
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
              <li><Link to="/login" className="cta-button-nav" id="nav-auth-link">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="auth-section">
          <div className="auth-form">
            <div id="signup-form">
              {/* Animated Header */}
              <h2>
                Create <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
              </h2>
              <p>Join our community to make an impact.</p>
              
              <form onSubmit={handleSignup}>
                <input type="text" name="name" id="signup-name" placeholder="Full Name" required />
                <input type="email" name="email" id="signup-email" placeholder="Email" required />
                <input type="password" name="password" id="signup-password" placeholder="Password" required />
                <button type="submit" className="cta-button auth-button" id="signup-btn" style={{width: '100%', border: 'none', cursor: 'pointer'}}>Sign Up</button>
              </form>

              <p className="auth-switch">
                Already have an account? <Link to="/login">Login</Link>
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

export default Signup;