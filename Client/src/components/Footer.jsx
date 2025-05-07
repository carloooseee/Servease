import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer">
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Servease. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;