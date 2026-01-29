 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-sky-50 px-6 py-14">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-sky-600 mb-8 text-center">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* LEFT: CONTACT FORM */}
            <div>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">
                Get in Touch
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-400 outline-none"
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-400 outline-none"
                />

                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-sky-400 outline-none"
                ></textarea>

                <button
                  type="submit"
                  className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-600"
                >
                  Send Message
                </button>
              </form>

              {/* CONTACT DETAILS */}
              <div className="mt-6 text-gray-700 space-y-2">
                <p>📧 Email: nodues@college.edu</p>
                <p>📞 Phone: +91 98765 43210</p>
                <p>🏫 Address: College Campus, CSE Department</p>
              </div>
            </div>

            {/* RIGHT: COLLEGE MAP */}
            <div>
              <h2 className="text-2xl font-semibold text-sky-600 mb-4">
                College Location
              </h2>

              <div className="w-full h-80 rounded-lg overflow-hidden border">
                <iframe
                  title="College Location"
                  src="https://www.google.com/maps?q=engineering+college&output=embed"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
