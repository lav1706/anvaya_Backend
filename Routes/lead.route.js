const express = require("express");
const {
  addLead,
  showLead,
  editLead,
  deleteLead,
  getLeadById,
  filterByStatus,
} = require("../controllers/lead.controller");
const { checkUser } = require("../middleware/middleware");

const router = express.Router();

router.post("/:userId", checkUser, addLead);
router.get("/:userId/:leadId", checkUser, getLeadById);
router.get("/:userId", checkUser, showLead);
router.put("/:userId/:leadId", checkUser, editLead);
router.get("/:userId/filter", checkUser, filterByStatus);
router.delete("/:userId/:leadId", checkUser, deleteLead);

module.exports = router;
