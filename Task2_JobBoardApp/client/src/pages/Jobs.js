import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{job.title}</h3>
          <p><b>{job.company}</b> — {job.location}</p>
          <p>{job.description}</p>

          <Link to={`/apply/${job._id}`}>Apply Now</Link>
        </div>
      ))}
    </div>
  );
}
