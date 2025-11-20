import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Removed 'Link' as it is no longer used here
import Campaigns from './pages/Campaigns.jsx';
import Contact from './pages/Contact.jsx';
import Donate from './pages/Donate.jsx';
import How_it_works from './pages/How_it_works.jsx';
import Impact from './pages/Impact.jsx';
import Index from './pages/Index.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Thankyou from './pages/Thankyou.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Payment from './pages/Payment.jsx';
import Donation from './pages/Donation.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';

// Assumption: Your styled Navbar is either inside the individual pages (like Index.jsx)
// or you have a separate <Navbar /> component.

const App = () => {
  return (
    <div>
      <ScrollToTopButton />
      {/* I removed the raw <nav> block here. 
         Now, only the styled content from your pages will appear.
      */}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/how-it-works" element={<How_it_works />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/thankyou" element={<Thankyou />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/donation" element={<Donation />} />
        
        {/* Catch-all route for 404s */}
        <Route path="*" element={<div style={{padding:20}}>Page not found</div>} />
      </Routes>
    </div>
  );
};

export default App;