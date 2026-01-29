 import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // ===== STUDENT =====
    rollNumber: {
      type: String,
      unique: true,
      sparse: true, // allow null for non-students
    },

    branch: {
      type: String,
    },

    // ===== ADMIN / DEPARTMENT / HOD =====
    email: {
      type: String,
      unique: true,
      sparse: true, // allow null for students
    },

    // only for department users
    department: {
      type: String,
      enum: [
        "library",
        "accounts",
        "exam",
        "hostel",
        "sports",
        "tp",
      ],
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      enum: ["admin", "student", "department", "hod"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
