const Comment = require("../model/comment.model");

const addComment = async (req, res) => {
  const { commentText } = req.body;
  const { leadId, userId } = req.params;
  if (!commentText) {
    return res.status(400).json({ msg: "Please write a comment." });
  }
  if (!leadId || !userId) {
    return res
      .status(400)
      .json({ msg: "Lead and author are required in the URL parameters." });
  }

  try {
    const comment = new Comment({
      commentText: commentText,
      lead: leadId,
      author: userId,
    });
    await comment.save();
    res.status(201).json({
      msg: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.error("Error saving comment:", error);
    res.status(500).json({ msg: "Error saving comment", error: error.message });
  }
};
const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { commentText } = req.body;

  if (!commentText) {
    return res.status(400).json({ msg: "No updated comment text provided." });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { commentText: commentText },
      { new: true }
    ).populate("author");

    if (updatedComment) {
      res.status(200).json({ msg: "Comment Updated", comment: updatedComment });
    } else {
      res.status(404).json({ msg: "Comment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in Comment Update", error: error.message });
  }
};
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const deleted = await Comment.findByIdAndDelete(commentId).populate(
      "author"
    );
    if (deleted) {
      res
        .status(200)
        .json({ msg: "Comment Deleted Successfully", comment: deleted });
    } else {
      res.status(404).json({ msg: "Comment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in deleting Comment", error: error.message });
  }
};
const showComment = async (req, res) => {
  const { userId } = req.params;

  try {
    const comments = await Comment.find({ author: userId }).populate("author");
    if (comments && comments.length > 0) {
      res.status(200).json({ msg: "Comments found", comments });
    } else {
      res.status(404).json({ msg: "No comments found for this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in showing Comment", error: error.message });
  }
};
const showCommentByLead = async (req, res) => {
  const { userId, leadId } = req.params;

  try {
    const comments = await Comment.find({
      author: userId,
      lead: leadId,
    }).populate("author");
    if (comments && comments.length > 0) {
      res.status(200).json({ msg: "Comments found", comments });
    } else {
      res.status(404).json({ msg: "No comments found for this user" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in showing Comment", error: error.message });
  }
};
module.exports = {
  addComment,
  editComment,
  deleteComment,
  showComment,
  showCommentByLead,
};
