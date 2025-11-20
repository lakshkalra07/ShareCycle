import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Donation = () => {
  const navigate = useNavigate();

  // --- 1. Script Loading (Existing) ---
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

  // --- 2. Typing Animation Logic (New) ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Words specific to the Donation page
  const words = ["Difference", "Change", "Contribution", "Future"];

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

  // --- 3. Form Handling (Existing) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const amount = formData.get('amount');

    if (!amount || isNaN(amount) || Number(amount) < 1) {
      alert('Please enter a valid donation amount.');
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        navigate(`/payment?amount=${amount}`);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div className="page-root">
      {/* CSS for Blinking Cursor */}
      <style>
        {`
          @keyframes blink { 50% { opacity: 0; } }
          .cursor { animation: blink 1s step-end infinite; color: #333; }
        `}
      </style>

      {/* Header Section */}
      <header className="header-short">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#000' }}>
                <img 
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23ffab17'/><path d='M30 40h40v5H30zm0 10h40v5H30zm0 10h25v5H30z' fill='white'/></svg>" 
                  alt="ShareCycle Logo" 
                />
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
              <li><Link to="/login" className="cta-button-nav">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* NEW: Animated Page Header */}
        <section className="page-header">
          <div className="container">
            <h1 className="page-header-title">
              Make a <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
            </h1>
          </div>
        </section>

        <section className="donation-section">
          <div className="container">
            <div className="donation-form" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h2>Quick Donation</h2>
              <p>Support our cause directly. Every contribution counts.</p>

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="access_key" value="54a34215-7ff7-4847-bd8f-62192c90065d" />
                <input type="hidden" name="subject" value="New Quick Donation from ShareCycle" />

                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="amount">Amount (USD)</label>
                  <input type="number" id="amount" name="amount" min="1" required />
                </div>

                <div style={{ marginBottom: '12px' }}>
                  <label htmlFor="message">Message (Optional)</label>
                  <textarea id="message" name="message" rows="3"></textarea>
                </div>

                <button type="submit" className="cta-button" style={{ width: '100%' }}>Proceed to Pay</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img 
                src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'><circle cx='40' cy='40' r='35' fill='%23ffab17'/><path d='M25 30h30v4H25zm0 8h30v4H25zm0 8h20v4H25z' fill='white'/></svg>" 
                alt="ShareCycle" 
                className="footer-logo" 
              />
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
                  <input type="hidden" name="subject" value="New Newsletter Subscription" />
                  <div className="email-signup">
                    <input type="email" name="email" placeholder="Enter your Email Address" className="email-input" required />
                    <button type="submit" className="subscribe-button">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Donation;