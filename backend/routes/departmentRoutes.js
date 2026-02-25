  import express from "express";
import NoDuesApplication from "../models/NoDuesApplication.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
 

const router = express.Router();

/* ================= PENDING APPLICATIONS ================= */
router.get(
  "/:dept",
  authMiddleware,
  roleMiddleware(["library", "accounts", "tp", "hostel", "sports", "scholarship"]),
  async (req, res) => {
    try {
      const dept = req.params.dept;

      let filter = {
        departments: {
          $elemMatch: {
            name: dept,
            status: "pending",
          },
        },
      };

//       if (dept === "hostel") filter.isHosteller = true;
//       if (dept === "sports") filter.isSportsMember = true;
// if (dept === "scholarship") filter.isScholarshipHolder = true;

      const apps = await NoDuesApplication.find(filter).sort({ createdAt: -1 });
      res.json(apps);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= HISTORY ================= */
router.get(
  "/:dept/history",
  authMiddleware,
  roleMiddleware(["library", "accounts", "tp", "hostel", "sports", "scholarship" ]),
  async (req, res) => {
    try {
      const dept = req.params.dept;

      let filter = {
        departments: {
          $elemMatch: {
            name: dept,
            status: { $in: ["approved", "rejected"] },
          },
        },
      };

//       if (dept === "hostel") filter.isHosteller = true;
//       if (dept === "sports") filter.isSportsMember = true;
// if (dept === "scholarship") filter.isScholarshipHolder = true;

      const apps = await NoDuesApplication.find(filter).sort({ updatedAt: -1 });
      res.json(apps);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= UPDATE STATUS ================= */
 router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["library", "accounts", "tp", "hostel", "sports", "scholarship"]),
  async (req, res) => {
    try {
      const { department, status, remark } = req.body;

      const app = await NoDuesApplication.findById(req.params.id);
      if (!app) {
        return res.status(404).json({ message: "Application not found" });
      }

      const deptObj = app.departments.find((d) => d.name === department);
      if (!deptObj) {
        return res.status(400).json({ message: "Department not found" });
      }

      // ✅ ONLY THIS
      deptObj.status = status;
      deptObj.remark = remark || "";
      deptObj.updatedAt = new Date();

      await app.save();

      // ❌ NO finalStatus
      // ❌ NO notification
      // ❌ NO mail

      res.json({ message: "Updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);


export default router;   