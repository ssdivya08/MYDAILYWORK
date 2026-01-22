const express = require("express");
const multer = require("multer");
const Application = require("../models/Application");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), async (req, res) => {
  await Application.create({
    jobId: req.body.jobId,
    name: req.body.name,
    email: req.body.email,
    resume: req.file?.path
  });
  res.send("Application submitted");
});

module.exports = router;
