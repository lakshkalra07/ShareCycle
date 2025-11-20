import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
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

  const words = ["Impact", "Change", "Hope", "Smile"];

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

      <header className="header">
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
              <li><Link to="/login" className="cta-button-nav">Login / Sign Up</Link></li>
            </ul>
          </nav>

          <div className="hero">
            <div className="hero-content">
              {/* Animated Header */}
              <h1 className="hero-title">
                Small Act.<br />
                Big <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span>
              </h1>
              <p className="hero-subtitle">Join us in changing lives - one donation at a time</p>
              <Link to="/campaigns" className="cta-button">Explore Causes</Link>
            </div>
            <div className="hero-image">
              <img 
                src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 400'><rect fill='%23fff8ec' width='500' height='400' rx='20'/><circle cx='250' cy='150' r='60' fill='%23ffab17'/><path d='M220 130h60v40H220z' fill='white'/><text x='250' y='320' text-anchor='middle' font-family='Arial' font-size='24' fill='%23333'>Making a Difference</text></svg>" 
                alt="People helping community" 
              />
            </div>
          </div>

          <div className="category-tags">
            <div className="category-tag">Emergency</div>
            <div className="category-tag">Animal</div>
            <div className="category-tag">Disaster Relief</div>
            <div className="category-tag">Education</div>
          </div>
        </div>
      </header>

      <section className="featured-causes">
        <div className="container">
          <h2 className="section-title">Featured Causes</h2>
          <div className="causes-grid">
            <div className="cause-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23e8f4f8' width='400' height='250'/><circle cx='200' cy='125' r='50' fill='%23ffab17'/><path d='M175 105h50v40H175z' fill='white'/><text x='200' y='220' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'>School Girls Scholarship</text></svg>" alt="School Girls" className="cause-image" />
              <div className="cause-content">
                <h3 className="cause-title">Help School Girls for Scholarship</h3>
                <div className="progress-bar"><div className="progress-fill"></div></div>
                <div className="cause-stats"><span>₹3 Lakh Raised</span><span>21 Days Left</span></div>
                <Link to="/login" className="donate-button">Donate Now</Link>
              </div>
            </div>
            <div className="cause-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23f0f8e8' width='400' height='250'/><circle cx='200' cy='125' r='50' fill='%23ffab17'/><path d='M175 105h50v40H175z' fill='white'/><text x='200' y='220' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'>Flood Relief</text></svg>" alt="Flood Relief" className="cause-image" />
              <div className="cause-content">
                <h3 className="cause-title">Help Rebuild Homes After Floods</h3>
                <div className="progress-bar"><div className="progress-fill"></div></div>
                <div className="cause-stats"><span>₹3 Lakh Raised</span><span>21 Days Left</span></div>
                <Link to="/login" className="donate-button">Donate Now</Link>
              </div>
            </div>
            <div className="cause-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 250'><rect fill='%23f8f0e8' width='400' height='250'/><circle cx='200' cy='125' r='50' fill='%23ffab17'/><path d='M175 105h50v40H175z' fill='white'/><text x='200' y='220' text-anchor='middle' font-family='Arial' font-size='16' fill='%23333'>School Supplies</text></svg>" alt="School Supplies" className="cause-image" />
              <div className="cause-content">
                <h3 className="cause-title">Provide School Supplies for Children</h3>
                <div className="progress-bar"><div className="progress-fill"></div></div>
                <div className="cause-stats"><span>₹3 Lakh Raised</span><span>21 Days Left</span></div>
                <Link to="/login" className="donate-button">Donate Now</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="community-support">
        <div className="container">
          <div className="support-content">
            <h2 className="support-title">We stand by Local Communities by providing essential Support and resources.</h2>
            <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '60px' }}>
              Our Donation Centers help you to donate in a convenient way and towards a meaningful goal.
            </p>
          </div>
          <div className="support-grid">
            <div className="support-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23e8f4f8' width='400' height='300'/><circle cx='200' cy='120' r='40' fill='%23ffab17'/><path d='M180 100h40v40H180z' fill='white'/><text x='200' y='250' text-anchor='middle' font-family='Arial' font-size='18' fill='%23333'>Emergency Relief</text></svg>" alt="Emergency Relief" />
              <div className="support-tag">Emergency</div>
            </div>
            <div className="support-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23f0f8e8' width='400' height='300'/><circle cx='200' cy='120' r='40' fill='%23ffab17'/><path d='M185 105h30v30H185z' fill='white'/><text x='200' y='250' text-anchor='middle' font-family='Arial' font-size='18' fill='%23333'>Disaster Relief</text></svg>" alt="Disaster Relief" />
              <div className="support-tag">Disaster Relief</div>
            </div>
            <div className="support-card">
              <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'><rect fill='%23f8f0e8' width='400' height='300'/><circle cx='200' cy='120' r='40' fill='%23ffab17'/><path d='M180 105h40v30H180z' fill='white'/><text x='200' y='250' text-anchor='middle' font-family='Arial' font-size='18' fill='%23333'>Education</text></svg>" alt="Education" />
              <div className="support-tag">Education</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='45' fill='%23fff8ec'/><path d='M35 40c0-8 7-15 15-15s15 7 15 15c0 8-7 15-15 15s-15-7-15-15z' fill='%23ffab17'/><path d='M30 65h40v10H30z' fill='%23ffab17'/></svg>" alt="Charity Icon" style={{ width: '80px', height: '80px' }} />
            <p className="cta-text">Be the reason someone smiles today!</p>
            <Link to="/login" className="cta-button-large">Donate Now</Link>
          </div>
        </div>
      </section>

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

export default Index;