import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get amount from URL (e.g. /payment?amount=500)
  const amount = searchParams.get('amount') || '0';

  // State for form handling
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const words = ["Secure", "Fast", "Trusted"];

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

  // --- 3. Payment Simulation Handler ---
  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    setIsProcessing(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false);
      alert(`Payment Successful!\nAmount: ₹${amount}\nMethod: ${paymentMethod}\nTransaction ID: TXN${Date.now()}`);
      navigate('/thankyou'); // Redirect to Thank You page
    }, 2000);
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
              <li><Link to="/login" className="cta-button-nav">Login</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-header">
          <div className="container">
            <h1 className="page-header-title">
              <span style={{ color: '#ffab17' }}>{text}</span><span className="cursor">|</span> Payment
            </h1>
          </div>
        </section>

        <section className="donation-section">
          <div className="container">
            <div className="donation-form" style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h2>Complete Your Payment</h2>
              <div className="amount-box" style={{ background: '#fff8ec', padding: '15px', borderRadius: '8px', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold', textAlign: 'center', border: '1px solid #ffab17' }}>
                Amount to Pay: ₹{amount}
              </div>

              <div className="methods" style={{ textAlign: 'left', marginBottom: '20px' }}>
                {/* UPI Option */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="method" 
                      value="UPI" 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      checked={paymentMethod === 'UPI'}
                    /> 
                    <strong>UPI</strong>
                  </label>
                  {paymentMethod === 'UPI' && (
                    <div className="details" style={{ marginTop: '10px', marginLeft: '25px' }}>
                      <input type="text" placeholder="Enter UPI ID (e.g. user@upi)" style={{ width: '100%', padding: '8px' }} />
                    </div>
                  )}
                </div>

                {/* Card Option */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="method" 
                      value="Card" 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      checked={paymentMethod === 'Card'}
                    /> 
                    <strong>Debit/Credit Card</strong>
                  </label>
                  {paymentMethod === 'Card' && (
                    <div className="details" style={{ marginTop: '10px', marginLeft: '25px' }}>
                      <input type="text" placeholder="Card Number (16 digits)" style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="MM/YY" style={{ width: '50%', padding: '8px' }} />
                        <input type="text" placeholder="CVV" style={{ width: '50%', padding: '8px' }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Net Banking Option */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="method" 
                      value="NetBanking" 
                      onChange={(e) => setPaymentMethod(e.target.value)} 
                      checked={paymentMethod === 'NetBanking'}
                    /> 
                    <strong>Net Banking</strong>
                  </label>
                  {paymentMethod === 'NetBanking' && (
                    <div className="details" style={{ marginTop: '10px', marginLeft: '25px' }}>
                      <input type="text" placeholder="Bank Name" style={{ width: '100%', padding: '8px', marginBottom: '5px' }} />
                      <input type="text" placeholder="Account Number" style={{ width: '100%', padding: '8px' }} />
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handlePayment} 
                className="cta-button" 
                style={{ width: '100%', opacity: isProcessing ? 0.7 : 1, cursor: isProcessing ? 'not-allowed' : 'pointer' }}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Payment;