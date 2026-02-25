import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import axios from "axios";
const token = localStorage.getItem("token");
export default function StudentDashboard() {
  const [notifications, setNotifications] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-xl">
        <div className="p-6 border-b border-blue-500">
          <h2 className="text-xl font-bold">Student Portal</h2>
          <p className="text-blue-200 text-sm mt-1">No Dues System</p>
        </div>

        <div className="p-4 border-b border-blue-500 flex flex-col items-center">
          {/* PROFILE IMAGE */}
          <label className="relative cursor-pointer">
            <img
              src={localStorage.getItem("profilePic") || ""}
              alt="Profile"
              className={`w-20 h-20 rounded-full object-cover border 
        ${localStorage.getItem("profilePic") ? "" : "bg-white"}`}
            />

            {/* ADD IMAGE TEXT */}
            {!localStorage.getItem("profilePic") && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-500 font-medium">
                Add Image
              </div>
            )}

            {/* FILE INPUT */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = () => {
                  localStorage.setItem("profilePic", reader.result);
                  window.location.reload();
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>

          {/* REMOVE IMAGE BUTTON (sirf tab dikhe jab image ho) */}
          {localStorage.getItem("profilePic") && (
            <button
              onClick={() => {
                localStorage.removeItem("profilePic");
                window.location.reload();
              }}
              className="mt-2 text-xs text-red-600 hover:underline"
            >
              Remove Image
            </button>
          )}

          {/* NAME + ROLL */}
          <p className="mt-3 font-semibold">
            {localStorage.getItem("studentName")}
          </p>
          <p className="text-xs text-blue-200">
            {localStorage.getItem("rollNumber")}
          </p>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            <SidebarItem
              label="Dashboard"
              active={activePage === "dashboard"}
              onClick={() => setActivePage("dashboard")}
            />
            <SidebarItem
              label="Apply No Dues"
              active={activePage === "apply"}
              onClick={() => setActivePage("apply")}
            />
            <SidebarItem
              label="View Status"
              active={activePage === "view"}
              onClick={() => setActivePage("view")}
            />
            <SidebarItem
              label="Track Progress"
              active={activePage === "track"}
              onClick={() => setActivePage("track")}
            />
            <SidebarItem
              label="Download Certificate"
              active={activePage === "download"}
              onClick={() => setActivePage("download")}
            />
            <SidebarItem
              label="Profile"
              active={activePage === "profile"}
              onClick={() => setActivePage("profile")}
            />
          </ul>

          <div className="mt-8 pt-4 border-t border-blue-500">
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activePage === "dashboard" && <DashboardHome />}
        {activePage === "apply" && <ApplyNoDues />}
        {activePage === "view" && <ViewStatus />}
        {activePage === "track" && <TrackStatus />}
        {activePage === "download" && <DownloadCertificate />}
        {activePage === "profile" && <StudentProfile />} {/* 👈 YAHAN */}
      </main>
    </div>
  );
}

function SidebarItem({ label, active, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg cursor-pointer transition-all font-medium ${
        active ? "bg-white text-blue-600 shadow-md" : "hover:bg-blue-600"
      }`}
    >
      {label}
    </li>
  );
}

/* ================= DASHBOARD HOME ================= */
function DashboardHome() {
  const rollNumber = localStorage.getItem("rollNumber")?.trim();

  const [statusData, setStatusData] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // 🔹 STATUS CHECK
  useEffect(() => {
    if (!rollNumber) return;

    axios
      .get(`http://localhost:5000/api/student/check/${rollNumber}`)
      .then((res) => {
        if (!res.data.applied) {
          setStatusData({});
          return;
        }
        return axios.get(
          `http://localhost:5000/api/student/status/${rollNumber}`,
        );
      })
      .then((res) => {
        if (!res) return;

        const statusObj = {};
        res.data.departments.forEach((d) => {
          statusObj[d.name] = d.status;
        });
        setStatusData(statusObj);
      })
      .catch(() => {
        setStatusData({});
      });
  }, [rollNumber]);

  // 🔔 NOTIFICATIONS
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/student/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setNotifications(res.data))
      .catch(() => {});
  }, []);

  if (!statusData) return <p>Loading dashboard...</p>;

  return (
    <div>
      {notifications.length > 0 && (
        <div className="bg-green-50 border border-green-200 p-4 rounded mb-6">
          {notifications.map((n, i) => (
            <p key={i} className="text-green-700 text-sm">
              {n.message}
            </p>
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(statusData).map(([dept, status]) => (
          <StatusCard
            key={dept}
            title={dept.toUpperCase()}
            status={
              status === "approved"
                ? "Cleared"
                : status === "rejected"
                  ? "Rejected"
                  : "Pending"
            }
            color={
              status === "approved"
                ? "green"
                : status === "rejected"
                  ? "red"
                  : "yellow"
            }
          />
        ))}
      </div>
    </div>
  );
}

function StatusCard({ title, status, color }) {
  const colorMap = {
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
    },
    red: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
  };

  const colors = colorMap[color];

  return (
    <div
      className={`${colors.bg} border ${colors.border} p-6 rounded-lg shadow-sm`}
    >
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      <p className={`font-medium mt-2 ${colors.text}`}>{status}</p>
    </div>
  );
}

/* ================= APPLY NO DUES ================= */
function ApplyNoDues() {
  //   const [submitted, setSubmitted] = useState(
  //   localStorage.getItem("noDuesApplied") === "true"
  // );
  const [submitted, setSubmitted] = useState(false);

  const rollNumber = localStorage.getItem("rollNumber")?.trim();

  const [alreadyApplied, setAlreadyApplied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    semester: "",
    email: "",
    phone: "",
    reason: "",
    graduationType: "",
    isHosteller: "",
    isSportsMember: "",
     isScholarshipHolder: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      rollNumber: rollNumber || "",
      name: localStorage.getItem("studentName") || "",
    }));
  }, [rollNumber]);

  useEffect(() => {
    if (!rollNumber) return;

    axios
      .get(`http://localhost:5000/api/student/check/${rollNumber}`)
      .then((res) => {
        setAlreadyApplied(res.data.applied === true);
      })
      .catch((err) => {
        // 👇 404 means NOT applied
        if (err.response?.status === 404) {
          setAlreadyApplied(false);
        }
      });
  }, [rollNumber]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = () => {
  //   alert("Application submitted successfully!");
  // };
  const handleSubmit = async () => {
    try {
      const payload = {
        // rollNumber: formData.rollNumber.trim(),
        name: formData.name,
        branch: formData.branch,
        semester: formData.semester,
        email: formData.email,
        phone: formData.phone,
        reason: formData.reason,
        graduationType: formData.graduationType,
         
        isHosteller: formData.isHosteller === "true",
  isSportsMember: formData.isSportsMember === "true",
  isScholarshipHolder: formData.isScholarshipHolder === "true",
      };

      console.log("ROLL =>", payload.rollNumber); // ✅ YAHAN

      const res = await axios.post(
        "http://localhost:5000/api/student/apply",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert(res.data.message);

      setSubmitted(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting application");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      rollNumber: "",
      branch: "",
      semester: "",
      email: "",
      phone: "",
      reason: "",
      graduationType: "",
      isHosteller: "",
       isScholarshipHolder: "",
    });
  };

  return (
    <div className="max-w-4xl">
      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Apply for No Dues Certificate
        </h1>
        <p className="text-gray-600 mt-1">
          Fill in all required details to submit your application
        </p>
      </div>

      {/* ✅ CONDITIONAL RENDERING */}
      {alreadyApplied ? (
        /* ===== SUCCESS VIEW ===== */
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            ✅ Application Submitted
          </h2>
          <p className="text-gray-700">
            Your No Dues application has been submitted successfully.
          </p>
          <p className="text-blue-600 mt-2">
            Please check “Track Progress” for updates.
          </p>
        </div>
      ) : (
        /* ===== FORM VIEW ===== */
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-8">
            {/* ================= PERSONAL INFORMATION ================= */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

                <InputField
                  label="Roll Number"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={() => {}}
                  readOnly
                  required
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@university.edu"
                  required
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>
            </div>

            {/* ================= ACADEMIC INFORMATION ================= */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Academic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectField
                  label="Branch/Department"
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="ME">Mechanical Engineering</option>
                  <option value="CE">Civil Engineering</option>
                  <option value="EE">Electrical Engineering</option>
                </SelectField>

                <SelectField
                  label="Current Semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="8">8th Semester</option>
                </SelectField>
              </div>
            </div>

            {/* ================= APPLICATION DETAILS ================= */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                Application Details
              </h2>

              <div className="space-y-6">
                <SelectField
                  label="Graduation Type"
                  name="graduationType"
                  value={formData.graduationType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="final">Final Year Graduation</option>
                </SelectField>
                <SelectField
                  label="Are you a hostel resident?"
                  name="isHosteller"
                  value={formData.isHosteller}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes (Hosteller)</option>
                  <option value="false">No (Hosteller)</option>
                </SelectField>
                <SelectField
                  label="Are you a sports team member?"
                  name="isSportsMember"
                  value={formData.isSportsMember}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="true">Yes (Sports Member)</option>
                  <option value="false">No (Sports Member)</option>
                </SelectField>

                <SelectField
  label="Are you a scholarship student?"
  name="isScholarshipHolder"
  value={formData.isScholarshipHolder}
  onChange={handleChange}
  required
>
  <option value="">Select</option>
  <option value="true">Yes (Scholarship Student)</option>
  <option value="false">No</option>
</SelectField>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Application{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    rows="4"
                    required
                    placeholder="Provide a detailed reason for your no dues application..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* ================= NOTICE ================= */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> Your application will be reviewed by
                Library, Accounts, and Hostel departments.
              </p>
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, required, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {children}
      </select>
    </div>
  );
}

/* ================= VIEW STATUS ================= */
const ALL_DEPARTMENTS = [
  "library",
  "accounts",
  "hostel",
  "tp",
  "sports",
   "scholarship"
  // "hod"
];

function ViewStatus() {
  const rollNumber = localStorage.getItem("rollNumber")?.trim();
  const [applicationId, setApplicationId] = useState(null);

  const [statusData, setStatusData] = useState(null);

  useEffect(() => {
    if (!rollNumber) return;

    axios
      .get(`http://localhost:5000/api/student/check/${rollNumber}`)
      .then((res) => {
        if (!res.data.applied) {
          setStatusData({});
          return;
        }

        return axios.get(
          `http://localhost:5000/api/student/status/${rollNumber}`,
        );
      })
      .then((res) => {
        if (!res) return;

        const statusObj = {};

        // departments status
        res.data.departments.forEach((d) => {
  statusObj[d.name] = d.status;
});

setApplicationId(res.data._id);

        // 👇 HOD STATUS ALAG SE (VERY IMPORTANT)
        statusObj.hod =
          res.data.finalStatus === "approved" ? "approved" : "pending";

        setStatusData(statusObj);
      })

      .catch(() => {
        setStatusData({});
      });
  }, [rollNumber]);

  if (!statusData) return <p>Loading status...</p>;

  return (
  <div className="max-w-4xl">
    <h1 className="text-3xl font-bold mb-6">Clearance Status</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ALL_DEPARTMENTS.map((dept) => {
        const deptStatus = statusData[dept] || "pending";

        const color =
          deptStatus === "approved"
            ? "green"
            : deptStatus === "rejected"
            ? "red"
            : "yellow";

        return (
          <div
            key={dept}
            className={`border rounded-lg p-5 bg-${color}-50 border-${color}-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">
                  {dept.toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {deptStatus}
                  </span>
                </p>

                {deptStatus === "rejected" && (
                  <button
                    onClick={async () => {
                      await axios.put(
                        `http://localhost:5000/api/student/resubmit/${applicationId}`,
                        {},
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                          },
                        }
                      );
                      window.location.reload();
                    }}
                    className="mt-3 px-4 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Fix & Resubmit
                  </button>
                )}
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-600 text-white`}
              >
                {deptStatus}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

}

 function DepartmentStatus({
  department,
  status,
  statusType,
  message,
}) {
  const statusStyles = {
    success: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600" },
    warning: { bg: "bg-yellow-50", border: "border-yellow-200", badge: "bg-yellow-600" },
    error: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-600" },
  };

  const styles = statusStyles[statusType];

  return (
    <div className={`${styles.bg} border ${styles.border} rounded-lg p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{department}</h3>
          <p className="text-sm text-gray-600 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-2">Last Updated: —</p>
        </div>

        <span className={`${styles.badge} text-white px-3 py-1 rounded-full text-sm`}>
          {status}
        </span>
      </div>
    </div>
  );
}


/* ================= TRACK STATUS ================= */
function TrackStatus() {
  const rollNumber = localStorage.getItem("rollNumber")?.trim();

  const [departments, setDepartments] = useState(null);

  useEffect(() => {
    if (!rollNumber) return;

    axios
      .get(`http://localhost:5000/api/student/check/${rollNumber}`)
      .then((res) => {
        if (!res.data.applied) {
          setDepartments([]);
          return;
        }

        return axios.get(
          `http://localhost:5000/api/student/status/${rollNumber}`,
        );
      })
      .then((res) => {
        if (!res) return;
        setDepartments(res.data.departments);
      })
      .catch(() => {
        setDepartments([]);
      });
  }, [rollNumber]);

  if (!departments) return <p>Loading progress...</p>;

   const steps = [
  { label: "Application Submitted", completed: true },
  ...departments
    .filter((d) => d.name !== "exam")
    .map((d) => ({
      label: `${d.name.toUpperCase()} - ${d.status.toUpperCase()}`,
      completed: d.status === "approved",
    })),
];


  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Track Progress</h1>

      <div className="bg-white p-6 rounded shadow">
        {steps.map((step, i) => (
          <ProgressStep
            key={i}
            label={step.label}
            completed={step.completed}
            isLast={i === steps.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function ProgressStep({ label, completed, date, isLast }) {
  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center mr-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
            completed
              ? "bg-green-600 border-green-600"
              : "bg-white border-gray-300"
          }`}
        >
          {completed && <span className="text-white text-sm">✓</span>}
        </div>
        {!isLast && (
          <div
            className={`w-0.5 h-12 ${completed ? "bg-green-600" : "bg-gray-300"}`}
          />
        )}
      </div>
      <div className="flex-1 pb-6">
        <h3
          className={`font-semibold ${completed ? "text-gray-900" : "text-gray-500"}`}
        >
          {label}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{date}</p>
      </div>
    </div>
  );
}

/* ================= DOWNLOAD CERTIFICATE ================= */
function DownloadCertificate() {
  const navigate = useNavigate(); // 👈 YE LINE MISS THI
  const rollNumber = localStorage.getItem("rollNumber")?.trim();
  const [applicationId, setApplicationId] = useState(null);

  const [allCleared, setAllCleared] = useState(false);

  useEffect(() => {
    if (!rollNumber) return;

    axios
      .get(`http://localhost:5000/api/student/check/${rollNumber}`)
      .then((res) => {
        if (!res.data.applied) {
          setAllCleared(false);
          return;
        }

        return axios.get(
          `http://localhost:5000/api/student/status/${rollNumber}`,
        );
      })
      .then((res) => {
        if (!res) return;

        const depts = res.data.departments || [];
        const cleared =
          depts.length > 0 && depts.every((d) => d.status === "approved");

        setAllCleared(cleared);

        // ✅ NOW THIS WILL WORK
        setApplicationId(res.data._id);
      })

      .catch(() => {
        setAllCleared(false);
      });
  }, [rollNumber]);

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Download Certificate</h1>

      {allCleared ? (
        <button
          onClick={() => navigate(`/certificate/${applicationId}`)}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Download Certificate
        </button>
      ) : (
        <p className="text-red-600">
          Certificate will be available after all departments approve.
        </p>
      )}
    </div>
  );
}
