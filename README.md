# 🚀 Anvaya CRM – Backend API

Welcome to the **Anvaya CRM Tool Backend**, a powerful and scalable RESTful API built using **Node.js**, **Express**, and **MongoDB**. It handles everything from **Lead Management**, **Sales Agents**, **Comments**, to **Tagging System** for your CRM needs.

---
```bash
## 📂 Folder Structure

📦 backend/
├── 📁 DB/
│ └── db.connect.js # MongoDB connection setup
│
├── 📁 controllers/
│ ├── agent.controller.js # All logic for agents
│ ├── comment.controller.js # Add/get comments on leads
│ ├── lead.controller.js # Core lead operations
│ └── tag.controller.js # Tag logic
│
├── 📁 middleware/
│ └── auth.middleware.js # Auth check middleware
│
├── 📁 models/
│ ├── agent.model.js # Sales agent schema
│ ├── comment.model.js # Comment schema
│ ├── lead.model.js # Lead schema
│ └── tag.model.js # Tag schema
│
├── 📁 routes/
│ ├── agent.routes.js
│ ├── comment.routes.js
│ ├── lead.routes.js
│ └── tag.routes.js
│
├── 📄 .env # Environment variables
├── 📄 index.js # App entry point


---

## 🧪 Tech Stack

| Tech          | Usage                  |
|---------------|------------------------|
| 🟩 Node.js   | JavaScript runtime     |
| ⚡ Express   | API framework          |
| 🍃 MongoDB   | NoSQL database         |
| 🧬 Mongoose  | MongoDB ODM            |
| 🔐 dotenv    | Environment config     |

---

## 🔐 Authentication

All protected routes use a **custom middleware** (`auth.middleware.js`) that checks if the user is authenticated before allowing access.

---

## 🔧 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/anvaya-crm-backend.git
cd anvaya-crm-backend
2️⃣ Install dependencies
bash

npm install
3️⃣ Create .env file
Add the following content:

ini
Copy
Edit
MONGODB=your_mongo_connection_string
PORT=5000


4️⃣ Run the server
bash
Copy
Edit
npm start
Server will run at: http://localhost:5000

🌐 API Overview
| Method | Endpoint                       | Middleware  | Description                 |
| ------ | ------------------------------ | ----------- | --------------------------- |
| POST   | `/comments/:userId/:leadId`    | `checkUser` | ➕ Add a comment to a lead   |
| PUT    | `/comments/:userId/:commentId` | `checkUser` | ✏️ Edit a specific comment  |
| DELETE | `/comments/:userId/:commentId` | `checkUser` | ❌ Delete a specific comment |
| GET    | `/comments/:userId`            | `checkUser` | 📋 Get all comments by user |
| GET    | `/comments/:userId/:leadId`    | `checkUser` | 📌 Get comments for a lead  |
| POST   | `/tags/:userId`                | `checkUser` | ➕ Create a new tag           |
| GET    | `/tags/:userId`                | `checkUser` | 📋 Get all tags for the user |
| GET    | `/tags/:userId/:tagId`         | `checkUser` | 🔍 Get a specific tag by ID  |
| PUT    | `/tags/:userId/:tagId`         | `checkUser` | ✏️ Update a specific tag     |
| DELETE | `/tags/:userId/:tagId`         | `checkUser` | ❌ Delete a specific tag      |
| POST   | `/leads/:userId`               | `checkUser` | ➕ Create a new lead           |
| GET    | `/leads/:userId/:leadId`       | `checkUser` | 🔍 Get lead by ID             |
| GET    | `/leads/:userId`               | `checkUser` | 📋 Get all leads for the user |
| PUT    | `/leads/:userId/:leadId`       | `checkUser` | ✏️ Edit a lead                |
| GET    | `/leads/:userId/filter`        | `checkUser` | 🔎 Filter leads by status     |
| DELETE | `/leads/:userId/:leadId`       | `checkUser` | ❌ Delete a lead               |
| POST   | `/agents/`                     | –           | ➕ Add a new sales agent      |
| GET    | `/agents/:userId/`             | `checkUser` | 📋 Get all agents for a user |
| PUT    | `/agents/:userId/:agentId`     | `checkUser` | ✏️ Edit agent by ID          |
| DELETE | `/agents/:userId/:agentId`     | `checkUser` | ❌ Delete agent by ID         |




📌 Full CRUD supported across entities with validation & error handling.

📈 Features
✅ Lead creation, editing, status, and priority
✅ Assigning leads to agents
✅ Commenting on leads
✅ Tagging leads for better organization
✅ Filtering & sorting support
✅ Modular controller-service-route structure
✅ Middleware-protected routes

💡 Future Enhancements
🔐 JWT-based user authentication

📊 Dashboard reporting (already in frontend)

📧 Email notifications

🗃️ Pagination and search

🤝 Contribution
Pull requests are welcome!
If you find bugs or want to suggest features, open an issue or create a PR.

📜 License
MIT © 2025 | Developed with ❤️ for Anvaya CRM

