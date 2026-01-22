import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Employer from "./pages/Employer";
import Jobs from "./pages/Jobs";
import Apply from "./pages/Apply";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employer" element={<Employer />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/apply/:id" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
