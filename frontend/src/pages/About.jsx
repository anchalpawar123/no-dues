 import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-sky-50 px-6 py-14">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

          {/* TITLE */}
          <h1 className="text-4xl font-bold text-sky-600 mb-4">
            About No Dues Management System
          </h1>

          <p className="text-gray-700 mb-6 leading-relaxed">
            The <strong>No Dues Management System</strong> is a web-based
            platform designed to digitize and simplify the traditional
            no dues clearance process followed by colleges and
            universities. It eliminates paperwork and provides a
            transparent, efficient, and time-saving solution for final
            year students.
          </p>

          {/* WHY NEEDED */}
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">
            Why No Dues System is Needed?
          </h2>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Manual no dues process is time-consuming and error-prone</li>
            <li>Students have to visit multiple departments physically</li>
            <li>Tracking approval status is difficult</li>
            <li>Risk of document loss and delays</li>
          </ul>

          {/* WHAT THIS SYSTEM DOES */}
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">
            What This System Does
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            This system provides a centralized online portal where final
            year students can apply for no dues clearance, track
            department-wise approval status, receive notifications, and
            download the final no dues certificate once all departments
            approve their request.
          </p>

          {/* FEATURES */}
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Online No Dues Application
            </div>
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Department-wise Approval Tracking
            </div>
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Role-Based Login System
            </div>
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Progress Visualization (Graph)
            </div>
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Notifications & Email Alerts
            </div>
            <div className="bg-sky-100 p-4 rounded-lg">
              ✔ Downloadable No Dues Certificate
            </div>
          </div>

          {/* USERS */}
          <h2 className="text-2xl font-semibold text-sky-600 mb-3">
            Who Can Use This System?
          </h2>

          <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
            <li>Final Year Students (BTech – CSE)</li>
            <li>College Departments (Library, Accounts, Hostel, etc.)</li>
            <li>College Administration</li>
          </ul>

           
        </div>
      </div>

      <Footer />
    </>
  );
}
