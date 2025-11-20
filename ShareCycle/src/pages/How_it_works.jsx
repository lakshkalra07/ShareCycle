import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const How_it_works = () => {
  // --- 1. Script Loading ---
  useEffect(() => {
    const s_script_js = document.createElement('script');
    s_script_js.src = '/assets/js/script.js';
    s_script_js.defer = true;
    document.body.appendChild(s_script_js);
    return () => {
      const existing = document.querySelector("script[src='/assets/js/script.js']");
      if (existing) existing.remove();
    };
  }, []);

  // --- 2. Typing Animation Logic ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Words specific to "How It..."
  const words = ["Works", "Helps", "Connects", "Matters"];

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
              <li><Link to="/login" className="cta-button-nav">Login / Sign Up</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-header">
          <div className="container">
            {/* Animated Header */}
            <h1 className="page-header-title">
              How It <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
            </h1>
          </div>
        </section>

        <section className="how-it-works">
          <div className="container">
            <div className="steps-grid">
              {/* Step 1 */}
              <div className="step-card">
                <img 
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect fill='%23fff8ec' width='120' height='120' rx='15'/><circle cx='60' cy='40' r='20' fill='%23ffab17'/><path d='M40 65h40v10H40z' fill='%23ffab17'/><text x='60' y='100' text-anchor='middle' font-family='Arial' font-size='12' fill='%23333'>Choose</text></svg>" 
                  alt="Choose a cause" 
                  className="step-icon" 
                />
                <h3 className="step-title">Choose a cause</h3>
                <p className="step-description">Browse through various verified causes and find one that matches your values.</p>
              </div>

              {/* Step 2 */}
              <div className="step-card">
                <img 
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect fill='%23fff8ec' width='120' height='120' rx='15'/><circle cx='60' cy='40' r='20' fill='%23ffab17'/><path d='M50 35h20v10H50z' fill='white'/><text x='60' y='100' text-anchor='middle' font-family='Arial' font-size='12' fill='%23333'>Donate</text></svg>" 
                  alt="Make a Donation" 
                  className="step-icon" 
                />
                <h3 className="step-title">Make a Donation</h3>
                <p className="step-description">Easily donate online with our protected payment system.</p>
              </div>

              {/* Step 3 */}
              <div className="step-card">
                <img 
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect fill='%23fff8ec' width='120' height='120' rx='15'/><circle cx='60' cy='40' r='20' fill='%23ffab17'/><path d='M45 35h30v10H45z' fill='white'/><text x='60' y='100' text-anchor='middle' font-family='Arial' font-size='12' fill='%23333'>Track</text></svg>" 
                  alt="See Your Impact" 
                  className="step-icon" 
                />
                <h3 className="step-title">See Your Impact</h3>
                <p className="step-description">Receive updates and reports on the progress of causes you supported.</p>
              </div>
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

export default How_it_works;