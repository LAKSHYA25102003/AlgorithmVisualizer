import React from "react";
import { useNavigate } from "react-router-dom";

function LandingNavbar() {
  const navigate = useNavigate();
  return (
    <div className="main shadow-md fixed z-50 top-0 right-0 left-0 bg-white h-[50px] md:h-[70px]">
      <div className="h-[100%] pt-[10px] pb-[10px] flex justify-between items-center px-4">
        <div
          onClick={() => {
            navigate("/");
          }}
          className=" text-blue-600 ml-[10px] text-[15px] md:text-[27px] font-bold cursor-pointer"
        >
          Algorithms Visualizer
        </div>
        <div className="mr-[10px] flex gap-4 justify-center items-center">
          <button
            onClick={() => {
              navigate("/bubble-sort");
            }}
            className="bg-blue-600 text-white p-2 md:p-[6px] md:font-bold rounded-[5px] hover:scale-[1.03] ease-in-out duration-300 cursor-pointer"
          >
            Bubble Sort
          </button>
          <button
            onClick={() => {
              navigate("/merge-sort");
            }}
            className="bg-blue-600 text-white p-2 md:p-[6px] md:font-bold rounded-[5px] hover:scale-[1.03] ease-in-out duration-300 cursor-pointer"
          >
            Merge Sort
          </button>
          <button
            onClick={() => {
              navigate("/quick-sort");
            }}
            className="bg-blue-600 text-white p-2 md:p-[6px] md:font-bold rounded-[5px] hover:scale-[1.03] ease-in-out duration-300 cursor-pointer "
          >
            Quick Sort
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingNavbar;
