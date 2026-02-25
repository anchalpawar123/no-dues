import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", async (req, res) => {
  let { role, email, rollNumber, password } = req.body;

  role = role?.trim().toLowerCase();
  email = email?.trim().toLowerCase();
  rollNumber = rollNumber?.trim();
  password = password?.trim();

  try {
    /* ================= STUDENT ================= */
   if (role === "student") {
  const user = await User.findOne({
    rollNumber,
    role: "student",
  });

  if (!user) {
    return res.status(400).json({ message: "Roll number is incorrect" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    token,
    role: user.role,
    name: user.name,
  });
}



    /* ================= DEPARTMENT ================= */
   /* ================= DEPARTMENT ================= */
const departmentRoles = [
  "library",
  "accounts",
  "tp",
  "hostel",
  "sports",
   "scholarship",
  "hod",
    
];

if (departmentRoles.includes(role)) {
  const emailExists = await User.findOne({
    email,
    role,
  });

  if (!emailExists) {
    return res.status(400).json({ message: "Email is incorrect" });
  }

  if (emailExists.password !== password) {
    return res.status(400).json({ message: "Password is incorrect" });
  }

  const token = jwt.sign(
    { id: emailExists._id, role: emailExists.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return res.json({
    token,
    role: emailExists.role,
  });
}


    /* ================= ADMIN ================= */
    if (role === "admin") {
      const emailExists = await User.findOne({
        email,
        role: "admin",
      });

      const passwordExists = await User.findOne({
        password,
        role: "admin",
      });

      if (!emailExists && !passwordExists) {
        return res
          .status(400)
          .json({ message: "Email and password are incorrect" });
      }

      if (!emailExists) {
        return res
          .status(400)
          .json({ message: "Email is incorrect" });
      }

      if (!passwordExists) {
        return res
          .status(400)
          .json({ message: "Password is incorrect" });
      }

      const token = jwt.sign(
        { id: emailExists._id, role: emailExists.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        role: emailExists.role,
      });
    }

    return res.status(400).json({
      message: "Invalid role selected",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
