const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Get all jobs
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// Post a job
router.post("/", async (req, res) => {
  const job = await Job.create(req.body);
  res.json(job);
});

module.exports = router;
