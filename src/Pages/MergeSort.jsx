import React, { useEffect } from "react";
import LandingNavbar from "../Components/Navbar/LandingNavbar";
import Footer from "../Components/Footer";
import { useContext } from "react";
import Context from "../Context/Context";

function MergeSort() {
  const { sortingState, generateSortingArray } = useContext(Context);
  useEffect(() => {
    generateSortingArray();
  }, []);
  return (
    <div className="bg-gradient-to-r flex flex-col justify-between from-purple-600 via-pink-300 to-blue-600 min-h-screen">
      <LandingNavbar />
      <div className="flex justify-center items-center mt-32">
        <div className="max-w-3xl w-full">
          <div className="mb-4 chart-container">
            {sortingState.array.map((bar, i) => (
              <div key={i} className="bar-container">
                <div
                  className={`select-none bar bar-${bar.state}`}
                  style={{ height: `${Math.floor((bar.value / 1000) * 100)}%` }}
                >
                  <p
                    className={`pl-1.5 ${
                      bar.state === "idle" ? "text-[#B1D2CF]" : "text-[#D8B7BE]"
                    }`}
                  >
                    {bar.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bottom-0 left-0 right-0">
        <Footer />
      </div>
    </div>
  );
}

export default MergeSort;
