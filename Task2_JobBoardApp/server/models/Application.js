const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: String,
  name: String,
  email: String,
  resume: String
});

module.exports = mongoose.model("Application", ApplicationSchema);
