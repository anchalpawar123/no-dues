 // src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-12 pb-8 px-5">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          <div>
            <h3 className="text-xl mb-4 font-semibold">Your Dues</h3>
            <p className="text-white/80 text-sm mb-2">Chameli Devi Group of Institutions</p>
            <p className="text-white/80 text-sm mb-2">Streamlining clearance processes for a better tomorrow</p>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-semibold">Quick Links</h3>
            <Link to="/" className="text-white/80 no-underline block mb-2 text-sm hover:text-white">Home</Link>
            <Link to="/about" className="text-white/80 no-underline block mb-2 text-sm hover:text-white">About</Link>
            <Link to="/apply" className="text-white/80 no-underline block mb-2 text-sm hover:text-white">How To Apply</Link>
            <Link to="/contact" className="text-white/80 no-underline block mb-2 text-sm hover:text-white">Contact Us</Link>
          </div>
          
          <div>
            <h3 className="text-xl mb-4 font-semibold">Contact Us</h3>
            <p className="text-white/80 text-sm mb-2">📧 Email: info@cdgi.edu.in</p>
            <p className="text-white/80 text-sm mb-2">📞 Phone: +91 7314243600</p>
            <p className="text-white/80 text-sm mb-2">📍 Address: Indore, Madhya Pradesh</p>
          </div>

          <div>
            <h3 className="text-xl mb-4 font-semibold">Our Location</h3>
            <iframe
              title="CDGI Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.123456!2d75.877123!3d22.719568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962f1b23456789%3A0xabcdef1234567890!2sChameli%20Devi%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1698300000000!5m2!1sen!2sin"
              width="100%"
              height="150"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t border-white/20 text-white/80 text-sm">
          <p>&copy; 2025 Chameli Devi Group of Institutions. All rights reserved. | Your Dues System</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;