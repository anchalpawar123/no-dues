import express from "express";
import auth from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import NoDuesApplication from "../models/NoDuesApplication.js";
import Notification from "../models/Notification.js";
import nodemailer from "nodemailer";
const router = express.Router();

/* ================= PENDING FOR HOD ================= */
  router.get(
  "/pending",
  auth,
  roleMiddleware(["hod"]),
  async (req, res) => {
    try {
      const apps = await NoDuesApplication.find({
        finalStatus: "pending",
      }).sort({ createdAt: -1 });

      const readyForHOD = apps.filter(app =>
        Array.isArray(app.departments) &&
        app.departments.length > 0 &&
        app.departments.every(d => d.status === "approved")
      );

      res.json(readyForHOD);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);



/* ================= FINAL APPROVE ================= */
 



/* ================= FINAL APPROVE ================= */
 /* ================= FINAL APPROVE ================= */
router.put(
  "/final-approve/:id",
  auth,
  roleMiddleware(["hod"]),
  async (req, res) => {
    try {
      const app = await NoDuesApplication.findById(req.params.id);

      if (!app) {
        return res.status(404).json({ message: "Application not found" });
      }

      // ✅ SAFETY CHECK: all departments approved
      const allApproved =
        Array.isArray(app.departments) &&
        app.departments.length > 0 &&
        app.departments.every(d => d.status === "approved");

      if (!allApproved) {
        return res.status(400).json({
          message: "All departments are not approved yet",
        });
      }

      // ✅ FINAL HOD APPROVAL
      app.hodStatus = "approved";
      app.finalStatus = "approved";
      app.hodRemark = req.body.remark || "";
      app.hodApprovedAt = new Date();
      app.hodApprovedBy = req.user._id;

      await app.save();

      // 🔔 DASHBOARD NOTIFICATION (ONLY HERE)
      await Notification.create({
        studentId: app.studentId,
        rollNumber: app.rollNumber,
        message:
          "🎉 Your No Dues has been approved by HOD. You can now download your certificate.",
      });

      // 📧 SEND MAIL (ONLY AFTER HOD APPROVE)
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: app.email,
        subject: "No Dues Certificate Approved",
        text: `Hello ${app.name},

Your No Dues application has been finally approved by the HOD.

You can now login and download your No Dues Certificate.

Roll Number: ${app.rollNumber}

Regards,
College Administration`,
      });

      res.json({
        message: "Final No Dues Approved by HOD & mail sent",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);


/* ================= HISTORY ================= */
router.get(
  "/history",
  auth,
  roleMiddleware(["hod"]),
  async (req, res) => {
    const apps = await NoDuesApplication.find({
      hodStatus: { $in: ["approved", "rejected"] },
    });

    res.json(apps);
  }
);

export default router;
