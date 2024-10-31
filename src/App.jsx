import "./App.css";
import HomePage from "./routes/HomePage/HomePage";
import ProjectPage from "./routes/ProjectPage/ProjectPage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
