import "./App.css";
import HomePage from "./routes/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <Navbar/>
        </div>

        <div className="">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>

        <div className="">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
