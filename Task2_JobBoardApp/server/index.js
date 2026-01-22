const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/jobboard")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
app.use("/jobs", require("./routes/jobs"));
app.use("/apply", require("./routes/apply"));

// Test route
app.get("/", (req, res) => {
  res.send("Job Board Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
