const Lead = require("../model/lead.model");

// Add new Lead
const addLead = async (req, res) => {
  const { name, source, salesAgent, status, timeToClose, priority } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("name");
  if (!source) missingFields.push("source");
  if (!salesAgent) missingFields.push("salesAgent");
  if (!status) missingFields.push("status");
  if (!timeToClose) missingFields.push("timeToClose");
  if (!priority) missingFields.push("priority");

  if (missingFields.length > 0) {
    return res.status(400).json({
      msg: "Missing required fields",
      missing: missingFields.join(", "),
    });
  }

  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).json({ msg: "Lead created successfully", lead });
  } catch (error) {
    res.status(500).json({ msg: "Error creating lead", error: error.message });
  }
};

// Get all Leads
const showLead = async (req, res) => {
  try {
    const leads = await Lead.find().populate("salesAgent");

    if (!leads.length) {
      return res.status(404).json({ msg: "No leads found" });
    }

    res.status(200).json({ msg: "Leads fetched successfully", leads });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching leads", error: error.message });
  }
};
//Edit the lead
const editLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.leadId, req.body, {
      new: true,
    }).populate("salesAgent");
    if (lead) {
      res.status(200).json({ msg: "Updated Lead", lead: lead });
    } else {
      res.status(404).json({ msg: "Lead not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error Updating lead", error: error.message });
  }
};

//Delete the lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.leadId, {
      new: true,
    }).populate("salesAgent");
    if (lead) {
      res.status(200).json({ msg: "Deleted Lead", lead });
    } else {
      res.status(404).json({ msg: "Lead not Deleted" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in Deleting lead", error: error.message });
  }
};

const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.leadId).populate("salesAgent");

    if (!lead) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.status(200).json({ msg: "Lead fetched successfully", lead });
  } catch (error) {
    res.status(500).json({ msg: "Error fetching lead", error: error.message });
  }
};
const filterByStatus = async (req, res) => {
  try {
    const status = req.query.status;
    const data = await Lead.find({ status });
    if (data) {
      res.status(201).json({ msg: "Lead with status", data: data });
    } else {
      res.status(400).json({ msg: "Lead with status not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error in finding lead by status", error: error.message });
  }
};
module.exports = {
  addLead,
  showLead,
  editLead,
  deleteLead,
  getLeadById,
  filterByStatus,
};
