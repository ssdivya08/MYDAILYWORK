import axios from "axios";
import { useState } from "react";

export default function Employer() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const postJob = async () => {
    try {
      await axios.post("http://localhost:5000/jobs", job);
      alert("Job posted successfully");
      setJob({ title: "", company: "", location: "", description: "" });
    } catch (err) {
      alert("Error posting job");
    }
  };

  return (
    <div>
      <h2>Employer – Post a Job</h2>

      <input
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      /><br />

      <input
        name="company"
        placeholder="Company"
        value={job.company}
        onChange={handleChange}
      /><br />

      <input
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
      /><br />

      <textarea
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
      /><br />

      <button onClick={postJob}>Post Job</button>
    </div>
  );
}
