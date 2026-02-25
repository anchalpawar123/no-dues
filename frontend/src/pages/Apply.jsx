 // src/pages/Apply.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Smartphone ,ShieldCheck,Lock} from "lucide-react";
import { Building, BookOpen, Wallet, UserCog, BadgeCheck, ArrowRight } from "lucide-react";

const Apply = () => {
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
          Apply For Your Dues
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-16 px-4 relative bg-gradient-to-b from-sky-50 to-blue-50">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-blue-800 font-bold mb-4">
              How No Dues Process Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Follow the simple step-by-step clearance process across all departments
            </p>
          </div>

          {/* Workflow Visualization */}
           {/* Workflow Visualization */}
<div className="flex justify-center items-center mt-12 flex-wrap relative z-10">
  <div className="flex flex-wrap items-center bg-white p-6 rounded-xl shadow-lg border-2 border-sky-100 justify-center gap-4">
    
    {[
      { icon: <Building size={26} />, title: 'Hostel', step: 'Step 1', color: 'from-blue-500 to-blue-700' },
      { icon: <BookOpen size={26} />, title: 'Library', step: 'Step 2', color: 'from-purple-500 to-purple-700' },
      { icon: <Wallet size={26} />, title: 'Accounts', step: 'Step 3', color: 'from-amber-500 to-amber-700' },
      { icon: <UserCog size={26} />, title: 'HOD', step: 'Step 4', color: 'from-pink-500 to-pink-700' },
      { icon: <BadgeCheck size={26} />, title: 'Approved', step: 'Complete', color: 'from-green-500 to-green-700' }
    ].map((item, index) => (
      <React.Fragment key={index}>
        
        <div className="text-center mx-4">
          <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white border-4 border-white shadow-lg transition-transform duration-300 hover:scale-110`}>
            {item.icon}
          </div>

          <span className="text-sm font-semibold text-blue-800 block">
            {item.title}
          </span>

          <span className="text-xs text-gray-500 block mt-1">
            {item.step}
          </span>
        </div>

        {index < 4 && (
          <ArrowRight className="text-blue-500 mx-2" size={22} />
        )}

      </React.Fragment>
    ))}

  </div>
</div>


          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-sky-100 text-center transition-all hover:scale-105 hover:shadow-xl">
               <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-5">
  <ShieldCheck size={28} color="white" />
</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Quick Process</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your no dues clearance in just a few simple steps
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-100 text-center transition-all hover:scale-105 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-5">
  <Lock size={28} color="white" />
</div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Secure & Safe</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data is protected with advanced security measures
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-100 text-center transition-all hover:scale-105 hover:shadow-xl">
               <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center mx-auto mb-5">
  <Smartphone size={28} color="white" />
</div>

              <h3 className="text-xl font-semibold text-blue-800 mb-3">Mobile Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Access the system anytime, anywhere from any device
              </p>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mt-16 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 text-center">How to Apply</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <p className="text-gray-700">Log in to your student account using your enrollment number</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <p className="text-gray-700">Navigate to the "Apply for No Dues" section</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <p className="text-gray-700">Fill out the required information and submit your application</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">4</div>
                <p className="text-gray-700">Track the approval status from each department in real-time</p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg inline-block transition">
                Start Application Process
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Apply;