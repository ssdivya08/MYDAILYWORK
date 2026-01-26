import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Job Board Application</h1>
      <p>Welcome! Choose an option below:</p>

      <Link to="/employer">Employer</Link>
      <br /><br />
      <Link to="/jobs">View Jobs</Link>
    </div>
  );
}
