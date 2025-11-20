import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      id="backToTopBtn"
      aria-label="Scroll to top"
      onClick={handleClick}
      style={{ display: visible ? 'block' : 'none' }}
    >
      ↑ Top
    </button>
  );
};

export default ScrollToTopButton;
