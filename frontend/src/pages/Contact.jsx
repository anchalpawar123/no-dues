 // src/pages/Contact.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] max-h-[300px]" style={{
        backgroundImage: `url('https://d13loartjoc1yn.cloudfront.net/upload/institute/images/large/170406112121_CDGI_Image_Building.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl md:text-4xl font-bold text-center px-2.5 text-shadow-lg">
          Contact Us
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 flex flex-wrap justify-center items-start gap-10">
        
        {/* Left: Contact Info */}
        <div className="flex-1 min-w-[400px] bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-blue-600 text-center text-2xl mb-5">Get in Touch With Us</h2>
          <p className="text-base leading-relaxed mb-5">
            We'd love to hear from you! Whether you have a question about your no dues process, 
            pending approvals, or clearance details — our team is ready to help.
          </p>

          <h3 className="text-sky-400 text-lg font-semibold mb-2">📍 College Address</h3>
          <p className="mb-4">
            Chameli Devi Group of Institutions,<br />
            Khandwa Road, Village Umrikheda,<br />
            Near Toll Booth, Indore, Madhya Pradesh 452020
          </p>

          <h3 className="text-sky-400 text-lg font-semibold mb-2">📞 Contact</h3>
          <p className="mb-6">
            Phone: +91 98765 43210<br />
            Email: info@cdgi.edu.in
          </p>
        </div>

        {/* Right: Map */}
        <div className="flex-1 min-w-[400px] h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe 
            title="CDGI Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.659509799586!2d75.86931557512067!3d22.87276937927263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd02a965f6f3%3A0x49a89df5bdf70347!2sIndore%20Institute%20of%20Science%20and%20Technology!5e0!3m2!1sen!2sin!4v1703321140173!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }}
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;