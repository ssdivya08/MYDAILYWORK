import React from "react";

function JobListingsPage() {
  // Sample job data (later we’ll fetch from backend)
  const jobs = [
    { id: 1, title: "Frontend Developer", company: "TechCorp", location: "Hyderabad" },
    { id: 2, title: "Backend Engineer", company: "CodeWorks", location: "Bengaluru" },
    { id: 3, title: "Full Stack Developer", company: "InnovateX", location: "Chennai" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Listings</h1>

      {/* Search bar */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search keyword..."
          style={{ padding: "10px", width: "250px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Location..."
          style={{ padding: "10px", width: "200px", marginRight: "10px" }}
        />
        <button style={{ padding: "10px 20px" }}>Find Job</button>
      </div>

      {/* Job cards */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.map((job) => (
          <li
            key={job.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <button style={{ padding: "8px 15px", marginTop: "10px" }}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobListingsPage;
