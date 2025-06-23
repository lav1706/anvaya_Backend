const salesAgentModel = require("../model/salesAgent.model");

const checkUser = async (req, res, next) => {
  try {
    const user = await salesAgentModel.findById(req.params.userId);
    if (user) {
      next();
    } else {
      res.status(401).json({ msg: "Please login" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error verifying user", error: error.message });
  }
};

module.exports = { checkUser };
