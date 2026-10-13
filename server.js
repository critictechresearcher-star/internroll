const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Demo data API. Replace this in-memory data with a database for production.
const internships = [
  { id: 1, title: "Machine Learning Internship", category: "Intelligence", price: 499, duration: "3–4 Weeks", mode: "Online" },
  { id: 2, title: "Backend Development Internship", category: "Development", price: 399, duration: "3–4 Weeks", mode: "Online" },
  { id: 3, title: "Python Programming Internship", category: "Development", price: 399, duration: "3–4 Weeks", mode: "Online" },
  { id: 4, title: "Digital Marketing Internship", category: "Marketing", price: 459, duration: "3–4 Weeks", mode: "Online" }
];
const subscribers = [];
const applications = [];

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.get("/api/internships", (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  const category = String(req.query.category || "").toLowerCase();
  res.json(internships.filter(x =>
    (!q || x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q)) &&
    (!category || x.category.toLowerCase() === category)
  ));
});
app.post("/api/subscribe", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase();
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
  if (!subscribers.includes(email)) subscribers.push(email);
  res.status(201).json({ message: "Subscription saved.", email });
});
app.post("/api/applications", (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const internshipId = Number(req.body.internshipId);
  if (!name || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) || !internships.some(x => x.id === internshipId)) {
    return res.status(400).json({ error: "Name, valid email and a valid internshipId are required." });
  }
  const application = { id: applications.length + 1, name, email, internshipId, createdAt: new Date().toISOString() };
  applications.push(application);
  res.status(201).json({ message: "Demo application received.", application });
});

app.listen(PORT, () => console.log(`Internroll recreation running at http://localhost:${PORT}`));
