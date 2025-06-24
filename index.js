const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeConnection } = require("./DB/db.connect");

const leadRoutes = require("./Routes/lead.route");
const agentsRoutes = require("./Routes/agents.route");
const commentRoutes = require("./Routes/comment.route");
const tagRoutes = require("./Routes/tag.route");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "https://spiffy-tanuki-16dc5d.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

initializeConnection();

//  API Routes
app.use("/leads", leadRoutes);
app.use("/agent", agentsRoutes);
app.use("/comment", commentRoutes);
app.use("/tag", tagRoutes);

// Listen on port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
