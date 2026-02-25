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
        "hostel",
        "sports",
        "tp",
         "scholarship",
      ],
    },

    password: {
      type: String,
      required: true,
    },
     profilePic: {
  type: String,
  default: "",
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
