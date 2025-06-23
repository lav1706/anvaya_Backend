const salesAgentModel = require("../model/salesAgent.model");
const Agents = require("../model/salesAgent.model");

const addAgents = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    return res.status(400).json({
      msg: "Missing required fields",
    });
  }

  try {
    const user = await Agents.findOne({ email });
    if (!user) {
      const agents = new Agents(req.body);
      await agents.save();
      res.status(201).json({ msg: "Agent created successfully", data: agents });
    } else {
      res.status(400).json({
        msg: "Agent already registered",
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error creating Agent", error: error.message });
  }
};

const showAgents = async (req, res) => {
  try {
    const agents = await Agents.find();
    if (agents.length) {
      res.status(201).json({ msg: "Agents created successfully", agents });
    } else {
      res.status(400).json({ msg: "Agents not created " });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error creating Agents", error: error.message });
  }
};
const deleteAgents = async (req, res) => {
  try {
    const agents = await Agents.findByIdAndDelete(req.params.agentId, {
      new: true,
    });
    if (agents) {
      res.status(200).json({ msg: "Deleted Agents", agents });
    } else {
      res.status(404).json({ msg: "Agents not Deleted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in Deleting lead", error: error.message });
  }
};
const editAgents = async (req, res) => {
  try {
    const agent = Agents.findByIdAndUpdate(id, req.body, { new: true });
    await agent.save();
    if (agent) {
      res.status(201).json({ msg: "Agent Data Updated", agent });
    } else {
      res.status(400).json({ msg: "Agent not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error in Updating Agent", error });
  }
};
module.exports = { addAgents, showAgents, deleteAgents, editAgents };
