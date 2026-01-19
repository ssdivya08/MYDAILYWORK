import React from "react";

function HomePage() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Job Board</h1>
      <p>Discover the latest job opportunities and find your dream role.</p>

      <div style={{ marginTop: "30px" }}>
        <h2>Featured Jobs</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ margin: "10px 0", border: "1px solid #ccc", padding: "15px" }}>
            <h3>Frontend Developer</h3>
            <p>Company: TechCorp</p>
            <p>Location: Hyderabad</p>
          </li>
          <li style={{ margin: "10px 0", border: "1px solid #ccc", padding: "15px" }}>
            <h3>Backend Engineer</h3>
            <p>Company: CodeWorks</p>
            <p>Location: Bengaluru</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
