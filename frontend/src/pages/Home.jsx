 // src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
 

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
     
    {
      id: 1,
      image: 'https://d13loartjoc1yn.cloudfront.net/upload/institute/images/large/170406112121_CDGI_Image_Building.webp',
      title: 'Your Dues',
       description: 'Simplify and Speed Up Your No Dues Clearance'

    },
    {
      id: 2,
      image: 'https://assets.collegedunia.com/public/image/Screenshot_521__e248bd09f4f4ca90e28a49eaecb36fa5.png',
      title: 'Digital Transformation',
      description: '“Paperless no dues system for quick, transparent, and easy approvals.”'
    },
    {
      id: 3,
      image: 'http://getwallpapers.com/wallpaper/full/f/8/4/888661-beautiful-library-background-images-1920x1080-iphone.jpg',
       title: 'Smart Library',
description: 'Digital book access with a peaceful and efficient learning environment.'

    },
    {
      id: 4,
      image: 'https://d13loartjoc1yn.cloudfront.net/upload/institute/images/large/170406112121_CDGI_Image_Building.webp',
      title: 'Modern Infrastructure',
      description: 'The online No Dues platform helps students complete their clearance process quickly and efficiently.'


    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Slider Section */}
      <section className="relative w-full h-[70vh] max-h-[500px] overflow-hidden">
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4">
                 <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 animate-fade-in">
  {slide.title}
</h1>

<p className="text-base md:text-lg mb-8 animate-fade-in delay-200">
  {slide.description}
</p>

                <div className="flex gap-4 justify-center">
                  {/* <a 
                    href="/login" 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition transform hover:scale-105"
                  >
                    Get Started
                  </a>
                  <a 
                    href="/about" 
                    className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-lg text-lg transition"
                  >
                    Learn More
                  </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

         
      </section>

       

      {/* Main Content */}
      <main className="flex-grow py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-800 mb-6">
            Streamline Your No Dues Process
          </h1>
          <p className="text-gray-600 text-lg text-center mb-10 max-w-3xl mx-auto">
            A complete digital solution for final-year students to clear all departmental dues 
            efficiently and transparently. Say goodbye to long queues and paperwork.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Processing</h3>
              <p className="text-gray-600">Complete clearance in minimum time with real-time tracking.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy to Use</h3>
              <p className="text-gray-600">User-friendly interface accessible from any device.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 text-center transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure</h3>
              <p className="text-gray-600">Your data is protected with advanced security measures.</p>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-800 mb-8">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Login', desc: 'Access your student portal' },
                { step: '2', title: 'Apply', desc: 'Submit no dues application' },
                { step: '3', title: 'Track', desc: 'Monitor clearance status' },
                { step: '4', title: 'Download', desc: 'Get your clearance certificate' }
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <a href="/login" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition transform hover:scale-105 shadow-lg">
              Start Your Clearance Now
            </a>
            <p className="text-gray-500 mt-4">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline font-medium">Login here</a>
            </p>
          </div>
        </div>
      </main>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default Home;