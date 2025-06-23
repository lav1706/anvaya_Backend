const express = require("express");
const {
  addAgents,
  showAgents,
  editAgents,
  deleteAgents,
} = require("../controllers/agents.controller");
const { checkUser } = require("../middleware/middleware");

const router = express.Router();

router.post("/", addAgents);
router.get("/:userId/", checkUser, showAgents);
router.put("/:userId/:agentId", checkUser, editAgents);
router.delete("/:userId/:agentId", checkUser, deleteAgents);
module.exports = router;
