import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  remark: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
  },
});

const noDuesSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },
    branch: String,
    semester: String,
    email: String,
    phone: String,
    graduationType: String,
    reason: String,




    // ===== EXAM DETAILS (ADD HERE) =====
examStatus: {
  type: String,
  enum: ["regular", "backlog", "sem_break", "year_break"],
  default: "regular",
},

examRemark: {
  type: String,
  default: "",
},
    // ✅ YAHI ADD KARNA HAI
    isHosteller: {
      type: Boolean,
      default: false,
    },
    isSportsMember: {
      type: Boolean,
      default: false,
    },

    departments: [departmentSchema], // ⭐ single source of truth

    // hod
    hodStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    hodRemark: {
      type: String,
      default: "",
    },

    hodApprovedAt: {
      type: Date,
    },

    hodApprovedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    finalStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("NoDuesApplication", noDuesSchema);
