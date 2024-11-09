import "./App.css";
import HomePage from "./routes/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ProjectPage from "./routes/ProjectPage/ProjectPage";

const App = () => {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen">
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
