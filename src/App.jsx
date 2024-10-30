import "./App.css";
import HomePage from "./routes/HomePage/HomePage";
import ProjectPage from "./routes/ProjectPage/ProjectPage";
import Footer from "./components/Footer/Footer";
import NotFoundPage from "./routes/NotFound/NotFound";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const location = useLocation();

  // Check if the current route is the NotFoundPage
  const isNotFoundPage =
    location.pathname === "*" || location.pathname.includes("NotFound");

  return (
    <div>
      {/* Render Navbar only if not on NotFoundPage */}
      {!isNotFoundPage && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {/* Render Footer only if not on NotFoundPage */}
      {!isNotFoundPage && <Footer />}
    </div>
  );
};

export default App;
