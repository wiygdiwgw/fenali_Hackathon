import React from "react";
import Navbar from "./components/homepage/Navbar";
import MainRoutes from "./routes/MainRoutes";
import Footer from "./components/homepage/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
      <Footer />
    </div>
  );
};

export default App;
