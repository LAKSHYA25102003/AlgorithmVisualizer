import React from "react";
import LandingNavbar from "../Components/Navbar/LandingNavbar";
import SortingCard from "../Components/SortingCard";
import Footer from "../Components/Footer";
import { useContext } from "react";
import Context from "../Context/Context";

function Landing() {
  const { algorithms } = useContext(Context);
  return (
    <div className="bg-gradient-to-r from-purple-600 via-pink-300 to-blue-600 min-h-screen">
      <LandingNavbar />
      <div className="w-[100%]  min-h-screen flex flex-col gap-5 justify-center items-center">
        <div className="text-white mt-40 mb-10">
          <div className="text-[20px] md:text-[40px] font-bold text-center">
            Visualize Algorithms
          </div>
          <div className="text-center md:text-[20px] font-bold">
            To understand better
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 px-4 mb-5">
          {algorithms.map((algo, idx) => {
            return <SortingCard key={idx} algo={algo} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
