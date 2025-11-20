import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Donate = () => {
  const navigate = useNavigate();

  // --- Script Loading ---
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

  // --- Typing Animation Logic ---
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ["Donation", "Difference", "Change"];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const amount = formData.get('amount');

    if (!amount || isNaN(amount) || Number(amount) < 1) {
      alert('Please enter a valid amount.');
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
        alert("Something went wrong sending your details. Please try again.");
      }
    } catch (error) {
      console.error("Form Error:", error);
      alert("Network error. Please try again later.");
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
        <section className="donation-section">
          <div className="donation-form">
            <h2>
               Make a <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
            </h2>
            <p>Your support helps us continue our mission. Thank you for your generosity.</p>

            <form id="donationForm" onSubmit={handleSubmit}>
              <input type="hidden" name="access_key" value="54a34215-7ff7-4847-bd8f-62192c90065d" />
              <input type="hidden" name="subject" value="New Donation Pledge from ShareCycle Website" />

              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />

              <label htmlFor="amount">Donation Amount (INR)</label>
              <input type="number" id="amount" name="amount" min="100" placeholder="e.g., 1000" required />
              
              <label htmlFor="cause">Donate To</label>
              <select id="cause" name="cause" required>
                <option value="">--Select a Cause--</option>
                <option value="Scholarship">School Girls Scholarship</option>
                <option value="Flood Relief">Flood Relief</option>
                <option value="School Supplies">School Supplies</option>
                <option value="General">General Fund</option>
              </select>

              <button type="submit" className="cta-button auth-button">Donate Now</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer"></footer>
    </div>
  );
};

export default Donate;