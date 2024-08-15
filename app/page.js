"use client"
import React from "react";
import Navbar from "./Components/Navbar"; // Renamed Head to Navbar
import Section from "./Components/Section";
import Footer from "./Components/Footer";


const Home = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Section />
      <div>
        <img src="/next.svg" alt="" />
      </div>
      <Footer/>
    </>
  );
};

export default Home;
