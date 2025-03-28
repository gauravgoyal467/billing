import React from "react";
import LandingPage from "../components/Common/LandingPage";
import Footer from "../components/Common/Footer";
import '../App.css'

const Home = () => {
  return (
    <div>
      <div className="separate">
        <LandingPage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
