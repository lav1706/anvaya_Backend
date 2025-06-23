const Tag = require("../model/tag.model");

// CREATE Tag
const createTag = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ msg: "Tag name is required" });
    }

    const existingTag = await Tag.findOne({ name });
    if (existingTag) {
      return res.status(409).json({ msg: "Tag already exists" });
    }

    const newTag = new Tag({ name });
    await newTag.save();

    res.status(201).json({ msg: "Tag created successfully", tag: newTag });
  } catch (error) {
    res.status(500).json({ msg: "Error creating tag", error: error.message });
  }
};

// READ All Tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json({ msg: "Tags fetched successfully", tags });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tags", error: error.message });
  }
};

// READ Single Tag by ID
const getTagById = async (req, res) => {
  const { tagId } = req.params;
  try {
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ msg: "Tag not found" });
    }
    res.status(200).json({ msg: "Tag fetched successfully", tag });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching tag", error: error.message });
  }
};

// UPDATE Tag
const updateTag = async (req, res) => {
  const { tagId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ msg: "Tag name is required" });
  }

  try {
    const existingTag = await Tag.findOne({ name });
    if (existingTag && existingTag._id.toString() !== tagId) {
      return res
        .status(409)
        .json({ msg: "Another tag with this name already exists" });
    }

    const updatedTag = await Tag.findByIdAndUpdate(
      tagId,
      { name },
      { new: true }
    );

    if (!updatedTag) {
      return res.status(404).json({ msg: "Tag not found" });
    }

    res.status(200).json({ msg: "Tag updated successfully", tag: updatedTag });
  } catch (error) {
    res.status(500).json({ msg: "Error updating tag", error: error.message });
  }
};

// DELETE Tag
const deleteTag = async (req, res) => {
  const { tagId } = req.params;
  try {
    const deletedTag = await Tag.findByIdAndDelete(tagId);
    if (!deletedTag) {
      return res.status(404).json({ msg: "Tag not found" });
    }
    res.status(200).json({ msg: "Tag deleted successfully", tag: deletedTag });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting tag", error: error.message });
  }
};

module.exports = {
  createTag,
  getAllTags,
  getTagById,
  updateTag,
  deleteTag,
};
