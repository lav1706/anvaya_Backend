const express = require("express");
const {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
} = require("../controllers/tag.controller");
const { checkUser } = require("../middleware/middleware");

const router = express.Router();

router.post("/:userId", checkUser, createTag);
router.get("/:userId", checkUser, getAllTags);
router.get("/:userId/:tagId", checkUser, getTagById);
router.put("/:userId/:tagId", checkUser, updateTag);
router.delete("/:userId/:tagId", checkUser, deleteTag);

module.exports = router;
