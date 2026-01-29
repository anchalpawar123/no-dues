 import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-sky-600">
        No Dues System
      </h1>

      <div className="space-x-6 font-medium text-gray-700">
        <Link to="/" className="hover:text-sky-600">Home</Link>
        <Link to="/about" className="hover:text-sky-600">About</Link>
        <Link to="/contact" className="hover:text-sky-600">Contact</Link>

        {/* ✅ LOGIN BUTTON */}
        <Link
          to="/login"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
