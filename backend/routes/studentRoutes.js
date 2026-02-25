import express from "express";
import auth from "../middleware/authMiddleware.js";
import NoDuesApplication from "../models/NoDuesApplication.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= APPLY NO DUES ================= */
router.post("/apply", auth, async (req, res) => {
  try {
    const already = await NoDuesApplication.findOne({
      rollNumber: req.user.rollNumber,
    });

    if (already) {
      return res.status(400).json({ message: "Already applied" });
    }

    const departments = [
      { name: "library" },
      { name: "accounts" },
      { name: "tp" },
      // { name: "scholarship" },

      // { name: "hod" },
       
    ];

    req.body.isSportsMember =
      req.body.isSportsMember === true || req.body.isSportsMember === "true";

    req.body.isHosteller =
      req.body.isHosteller === true || req.body.isHosteller === "true";

      // ✅ ADD THIS BELOW isSportsMember
req.body.isScholarshipHolder =
  req.body.isScholarshipHolder === true ||req.body.isScholarshipHolder === "true";
    if (req.body.isHosteller) {
      departments.push({ name: "hostel" });
    } else {
      departments.push({
        name: "hostel",
        status: "approved",
        remark: "Not a hostel resident",
      });
    }

    if (req.body.isSportsMember) {
      departments.push({ name: "sports" });
    } else {
      departments.push({
        name: "sports",
        status: "approved",
        remark: "Not a sports team member",
      });
    }

    // ✅ ADD THIS BELOW SPORTS BLOCK
if (req.body.isScholarshipHolder) {
  departments.push({ name: "scholarship" });
} else {
  departments.push({
    name: "scholarship",
    status: "approved",
    remark: "Not a scholarship student",
  });
}

    const application = new NoDuesApplication({
      ...req.body,
      rollNumber: req.user.rollNumber,
      studentId: req.user._id,
      departments,
      finalStatus: "pending", // ✅ ADD HERE
      hodStatus: "pending", // ✅ ADD HERE
    });

    await application.save();
    res.json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= STUDENT STATUS ================= */
router.get("/status/:rollNumber", async (req, res) => {
  try {
    const app = await NoDuesApplication.findOne({
      rollNumber: req.params.rollNumber,
    });

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({
      _id: app._id,
      departments: app.departments,
      finalStatus: app.finalStatus,
      examStatus: app.examStatus,
      examRemark: app.examRemark,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= CHECK APPLIED ================= */
router.get("/check/:rollNumber", async (req, res) => {
  const record = await NoDuesApplication.findOne({
    rollNumber: req.params.rollNumber,
  });

  if (!record) {
    return res.json({ applied: false });
  }

  res.json({ applied: true });
});

router.get("/certificate/:id", auth, async (req, res) => {
  try {
    const app = await NoDuesApplication.findById(req.params.id);

    if (!app || app.finalStatus !== "approved") {
      return res.status(404).json({ message: "Certificate not available" });
    }

    res.json({
      _id: app._id,
      name: app.name,
      rollNumber: app.rollNumber,
      branch: app.branch,
      semester: app.semester,
      examStatus: app.examStatus,
      departments: app.departments,
      hodRemark: app.hodRemark,
      approvalDate: app.updatedAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/notifications", auth, async (req, res) => {
  const notes = await Notification.find({
    studentId: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(notes);
});


/* ================= RESUBMIT APPLICATION ================= */
router.put("/resubmit/:id", auth, async (req, res) => {
  try {
    const app = await NoDuesApplication.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ security: sirf wahi student resubmit kare
    if (app.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    // 🔁 sirf rejected departments ko pending banao
    app.departments.forEach((d) => {
      if (d.status === "rejected") {
        d.status = "pending";
        d.remark = "";
        d.updatedAt = new Date();
      }
    });

    await app.save();

    res.json({ message: "Resubmitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

 

router.put("/profile-pic", authMiddleware, async (req, res) => {
  try {

    const { image } = req.body;

    await User.findByIdAndUpdate(req.user._id, {
      profilePic: image,
    });

    res.json({ message: "Profile updated" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/profile", authMiddleware, async (req, res) => {

  const user = await User.findById(req.user._id);

  res.json({
    name: user.name,
    rollNumber: user.rollNumber,
    profilePic: user.profilePic
  });

});

export default router;
