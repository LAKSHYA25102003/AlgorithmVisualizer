import React from "react";
import LandingNavbar from "../Components/Navbar/LandingNavbar";
import Login from "../Components/Login";
import { useContext } from "react";
import Context from "../Context/Context";

function Landing() {
  const {num}=useContext(Context);
  return (
    <div className="bg-blue-600 min-h-screen">
      <LandingNavbar />
      {num === 1 && (
        <div className="w-[100%]  min-h-screen flex justify-center items-center">
          <div className="text-white">
            <div className="text-[30px] md:text-[50px] font-bold text-center">
              Visualize Algorithms
            </div>
            <div className="text-center md:text-[20px] font-bold">
              To understand better
            </div>
          </div>
        </div>
      )}
      {num === 2 && <Login />}
    </div>
  );
}

export default Landing;
