 import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  UserPlus, 
  Building2, 
  Shield, 
  Users, 
  LogOut,
  Search,
  Trash2
} from "lucide-react";
import axios from "axios";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalDepartments: 0,
    totalHODs: 0,
    totalApplications: 0
  });
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  // Form states for Add Student
  const [studentForm, setStudentForm] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    email: "",
    password: ""
  });

  // Form states for Add Department
  const [deptForm, setDeptForm] = useState({
    departmentName: "",
    email: "",
    password: ""
  });

  // Form states for Add HOD
  const [hodForm, setHodForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  useEffect(() => {
    if (activePage === "users") {
      fetchUsers();
    }
  }, [activePage]);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!studentForm.name || !studentForm.rollNumber || !studentForm.branch || !studentForm.password) {
      alert("⚠️ Please fill all required fields!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/add-student",
        studentForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Student added successfully!");
      setStudentForm({ name: "", rollNumber: "", branch: "", email: "", password: "" });
      fetchDashboardStats();
    } catch (err) {
      alert("❌ Failed to add student: " + (err.response?.data?.message || "Error"));
      console.error(err);
    }
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!deptForm.departmentName || !deptForm.email || !deptForm.password) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/add-department",
        deptForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Department added successfully!");
      setDeptForm({ departmentName: "", email: "", password: "" });
      fetchDashboardStats();
    } catch (err) {
      alert("❌ Failed to add department: " + (err.response?.data?.message || "Error"));
      console.error(err);
    }
  };

  const handleAddHOD = async (e) => {
    e.preventDefault();
    if (!hodForm.name || !hodForm.email || !hodForm.password) {
      alert("⚠️ Please fill all fields!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/add-hod",
        hodForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ HOD added successfully!");
      setHodForm({ name: "", email: "", password: "" });
      fetchDashboardStats();
    } catch (err) {
      alert("❌ Failed to add HOD: " + (err.response?.data?.message || "Error"));
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/admin/delete-user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ User deleted successfully!");
      fetchUsers();
      fetchDashboardStats();
    } catch (err) {
      alert("❌ Failed to delete user");
      console.error(err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const resetStudentForm = () => {
    setStudentForm({ name: "", rollNumber: "", branch: "", email: "", password: "" });
  };

  const resetDeptForm = () => {
    setDeptForm({ departmentName: "", email: "", password: "" });
  };

  const resetHODForm = () => {
    setHodForm({ name: "", email: "", password: "" });
  };

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.rollNumber?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ============ LEFT SIDEBAR (FIXED) ============ */}
      <div className="w-60 bg-gradient-to-b from-blue-800 to-blue-900 text-white flex flex-col fixed h-screen">
        {/* Admin Header */}
        <div className="p-6 border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-blue-200 mt-1">Control Center</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActivePage("dashboard")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activePage === "dashboard"
                ? "bg-white text-blue-700 shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <LayoutDashboard className="mr-3 w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </button>

          <button
            onClick={() => setActivePage("add-student")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activePage === "add-student"
                ? "bg-white text-blue-700 shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <UserPlus className="mr-3 w-5 h-5" />
            <span className="font-medium">Add Student</span>
          </button>

          <button
            onClick={() => setActivePage("add-department")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activePage === "add-department"
                ? "bg-white text-blue-700 shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <Building2 className="mr-3 w-5 h-5" />
            <span className="font-medium">Add Department</span>
          </button>

          <button
            onClick={() => setActivePage("add-hod")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activePage === "add-hod"
                ? "bg-white text-blue-700 shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <Shield className="mr-3 w-5 h-5" />
            <span className="font-medium">Add HOD</span>
          </button>

          <button
            onClick={() => setActivePage("users")}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
              activePage === "users"
                ? "bg-white text-blue-700 shadow-md"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <Users className="mr-3 w-5 h-5" />
            <span className="font-medium">User List</span>
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-lg font-medium transition-colors"
          >
            <LogOut className="mr-2 w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* ============ MAIN CONTENT AREA (RIGHT SIDE) ============ */}
      <div className="flex-1 ml-60">
        {/* Top Header */}
        <div className="bg-white border-b px-6 py-4 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800">
            {activePage === "dashboard" && "Dashboard Overview"}
            {activePage === "add-student" && "Add New Student"}
            {activePage === "add-department" && "Add New Department"}
            {activePage === "add-hod" && "Add New HOD"}
            {activePage === "users" && "User Management"}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* ============ DASHBOARD HOME ============ */}
          {activePage === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total Students Card */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
              </div>

              {/* Total Departments Card */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Building2 className="w-7 h-7 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Departments</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalDepartments}</p>
              </div>

              {/* Total HODs Card */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Shield className="w-7 h-7 text-purple-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total HODs</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalHODs}</p>
              </div>

              {/* Total No Dues Forms Card */}
              <div className="bg-white rounded-lg shadow border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <LayoutDashboard className="w-7 h-7 text-orange-600" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total No Dues Forms</p>
                <p className="text-3xl font-bold text-gray-800">{stats.totalApplications}</p>
              </div>
            </div>
          )}

          {/* ============ ADD STUDENT PAGE ============ */}
          {activePage === "add-student" && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-lg shadow border p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Student Information</h3>
                <form onSubmit={handleAddStudent}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={studentForm.name}
                        onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter student name"
                      />
                    </div>

                    {/* Roll Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Roll Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={studentForm.rollNumber}
                        onChange={(e) => setStudentForm({ ...studentForm, rollNumber: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 0832CS221001"
                      />
                    </div>

                    {/* Branch */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Branch <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={studentForm.branch}
                        onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Branch</option>
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="EE">Electrical Engineering</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-gray-500">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="student@example.com"
                      />
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        value={studentForm.password}
                        onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold transition-colors"
                    >
                      Save Student
                    </button>
                    <button
                      type="button"
                      onClick={resetStudentForm}
                      className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-semibold transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============ ADD DEPARTMENT PAGE ============ */}
          {activePage === "add-department" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow border p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Department Information</h3>
                <form onSubmit={handleAddDepartment}>
                  <div className="space-y-6">
                    {/* Department Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department Name <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={deptForm.departmentName}
                        onChange={(e) => setDeptForm({ ...deptForm, departmentName: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Department</option>
                        <option value="Library">Library</option>
                        <option value="Accounts">Accounts</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Sports">Sports</option>
                        <option value="Training & Placement">Training & Placement</option>
                        <option value="Exam">Exam</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={deptForm.email}
                        onChange={(e) => setDeptForm({ ...deptForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="department@college.com"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        value={deptForm.password}
                        onChange={(e) => setDeptForm({ ...deptForm, password: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded font-semibold transition-colors"
                    >
                      Save Department
                    </button>
                    <button
                      type="button"
                      onClick={resetDeptForm}
                      className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-semibold transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============ ADD HOD PAGE ============ */}
          {activePage === "add-hod" && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow border p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-6">HOD Information</h3>
                <form onSubmit={handleAddHOD}>
                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={hodForm.name}
                        onChange={(e) => setHodForm({ ...hodForm, name: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter HOD name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={hodForm.email}
                        onChange={(e) => setHodForm({ ...hodForm, email: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="hod@college.com"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="password"
                        value={hodForm.password}
                        onChange={(e) => setHodForm({ ...hodForm, password: e.target.value })}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded font-semibold transition-colors"
                    >
                      Save HOD
                    </button>
                    <button
                      type="button"
                      onClick={resetHODForm}
                      className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded font-semibold transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ============ USER LIST PAGE ============ */}
          {activePage === "users" && (
            <div className="bg-white rounded-lg shadow border overflow-hidden">
              {/* Search and Filter Header */}
              <div className="px-6 py-4 border-b bg-gray-50">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Search Box */}
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or roll number..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Role Filter */}
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="department">Departments</option>
                    <option value="hod">HODs</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
                    <p className="text-gray-600">Loading users...</p>
                  </div>
                ) : filteredUsers.length === 0 ? (
                  <div className="p-16 text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No Users Found</h3>
                    <p className="text-gray-600">No users match your search criteria</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email / Roll</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                              user.role === 'student' ? 'bg-blue-100 text-blue-800' :
                              user.role === 'department' ? 'bg-green-100 text-green-800' :
                              user.role === 'hod' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {user.role === 'student' ? user.rollNumber : user.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {user.department || user.branch || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}