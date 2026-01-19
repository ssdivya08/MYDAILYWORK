import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobListingsPage from "./pages/JobListingsPage";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f5f5f5" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/jobs">Job Listings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobListingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
