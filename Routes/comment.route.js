const express = require("express");

const { checkUser } = require("../middleware/middleware");
const {
  addComment,
  editComment,
  deleteComment,
  showComment,
  showCommentByLead,
} = require("../controllers/comment.controller");

const router = express.Router();

router.post("/:userId/:leadId", checkUser, addComment);
router.put("/:userId/:commentId", checkUser, editComment);
router.delete("/:userId/:commentId", checkUser, deleteComment);
router.get("/:userId", checkUser, showComment);
router.get("/:userId/:leadId", checkUser, showCommentByLead);

module.exports = router;
