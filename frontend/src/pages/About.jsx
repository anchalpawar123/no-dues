 // src/pages/About.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
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
          About Your Dues
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 items-start">
          
          {/* Image Side */}
          <div className="flex-1 min-w-[200px] text-center">
            <img 
              src="https://tse1.mm.bing.net/th/id/OIP.Rv-aeZdB_Ob3ty0ZG9AMZgHaE8?pid=Api&P=0&h=180" 
              alt="No Dues System" 
              className="w-[90%] max-w-[400px] h-auto max-h-[300px] object-cover rounded-lg mx-auto"
            />
          </div>
          
          {/* Content Side */}
          <div className="flex-1 min-w-[250px] text-left">
            <h2 className="text-2xl md:text-3xl mb-5 text-blue-600">About Your Dues</h2>
            <p className="text-base text-gray-600 leading-relaxed">
              The Digital No Dues System is specially designed for final-year students who are about to graduate. 
              It helps students complete all clearance procedures before leaving college - including Hostel, Library, 
              Accounts, and Head of Department approvals - in a fully online, paperless system.
            </p>
            <p className="text-base text-gray-600 leading-relaxed mt-4">
              With this platform, graduating students can track their clearance status step-by-step, 
              get timely notifications for each department, and ensure a smooth exit without any 
              pending dues or last-minute hassles.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;