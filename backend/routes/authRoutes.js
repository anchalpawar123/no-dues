import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

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
      const rollExists = await User.findOne({
        rollNumber,
        role: "student",
      });

      const passwordExists = await User.findOne({
        password,
        role: "student",
      });

      if (!rollExists && !passwordExists) {
        return res
          .status(400)
          .json({ message: "Roll number and password are incorrect" });
      }

      if (!rollExists) {
        return res
          .status(400)
          .json({ message: "Roll number is incorrect" });
      }

      if (!passwordExists) {
        return res
          .status(400)
          .json({ message: "Password is incorrect" });
      }

      const token = jwt.sign(
        { id: rollExists._id, role: rollExists.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

       return res.json({
  token,
  role: rollExists.role,
  name: rollExists.name,   // 👈 YAHI ADD KARNA HAI
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
  "hod",
  "exam",
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
