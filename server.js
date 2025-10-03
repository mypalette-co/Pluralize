const express = require("express");
const cors = require("cors");
const pluralize = require("pluralize");

const app = express();
app.use(express.json());
app.use(cors()); // allow Bubble/API-Connector and browser tests

// Health & smoke test
app.get("/", (req, res) => {
  res.send("✅ Pluralize API is running. Try /singularize?text=materials");
});

// Browser-friendly GET endpoints
app.get("/singularize", (req, res) => {
  const text = (req.query.text || "").trim();
  if (!text) return res.status(400).json({ error: "Missing 'text' query param" });
  return res.json({ input: text, singular: pluralize.singular(text) });
});

app.get("/pluralize", (req, res) => {
  const text = (req.query.text || "").trim();
  if (!text) return res.status(400).json({ error: "Missing 'text' query param" });
  return res.json({ input: text, plural: pluralize.plural(text) });
});

// JSON POST endpoints (handy for Bubble API Connector)
app.post("/singularize", (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Missing 'text' in body" });
  return res.json({ input: text, singular: pluralize.singular(text) });
});

app.post("/pluralize", (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: "Missing 'text' in body" });
  return res.json({ input: text, plural: pluralize.plural(text) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Pluralize API running on ${PORT}`));
