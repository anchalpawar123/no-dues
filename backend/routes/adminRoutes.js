import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import NoDuesApplication from "../models/NoDuesApplication.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ================= ADMIN STATS ================= */
router.get(
  "/stats",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const totalStudents = await User.countDocuments({ role: "student" });
      const totalDepartments = await User.countDocuments({ role: "department" });
      const totalHODs = await User.countDocuments({ role: "hod" });
      const totalApplications = await NoDuesApplication.countDocuments();

      res.json({
        totalStudents,
        totalDepartments,
        totalHODs,
        totalApplications,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= GET ALL USERS ================= */
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const users = await User.find().select("-password").sort({ createdAt: -1 });
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= ADD STUDENT ================= */
 router.post(
  "/add-student",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, rollNumber, branch, email } = req.body;

      if (!name || !rollNumber || !branch) {
        return res.status(400).json({ message: "Required fields missing" });
      }

      const exists = await User.findOne({ rollNumber });
      if (exists) {
        return res.status(400).json({ message: "Student already exists" });
      }

      const hashedPassword = await bcrypt.hash(rollNumber, 10);

      await User.create({
        name,
        rollNumber,
        branch,
        email,
        password: hashedPassword,
        role: "student",
      });

      res.json({ message: "Student added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= ADD DEPARTMENT ================= */
router.post(
  "/add-department",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { departmentName, email, password } = req.body;

      if (!departmentName || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "Department already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name: departmentName,
        email,
        password: hashedPassword,
        role: "department",
        department: departmentName.toLowerCase(),
      });

      res.json({ message: "Department added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= ADD HOD ================= */
router.post(
  "/add-hod",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
      }

      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ message: "HOD already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        name,
        email,
        password: hashedPassword,
        role: "hod",
      });

      res.json({ message: "HOD added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= DELETE USER ================= */
router.delete(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
