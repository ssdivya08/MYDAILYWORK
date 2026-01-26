import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
export default function Apply() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    resume: null
  });
  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const submitApplication = async () => {
    const data = new FormData();
    data.append("jobId", id);
    data.append("name", form.name);
    data.append("email", form.email);
    data.append("resume", form.resume);

    try {
      await axios.post("http://localhost:5000/apply", data);
      alert("Application submitted");
    } catch (err) {
      alert("Error submitting application");
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>

      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      /><br />

      <input
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
      /><br />

      <input
        type="file"
        name="resume"
        onChange={handleChange}
      /><br />

      <button onClick={submitApplication}>Submit Application</button>
    </div>
  );
}
