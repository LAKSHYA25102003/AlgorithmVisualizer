import React, { useEffect } from "react";
import LandingNavbar from "../Components/Navbar/LandingNavbar";
import Footer from "../Components/Footer";
import { useContext } from "react";
import Context from "../Context/Context";
import Editor from "../Components/CodeEditor/Editor";
import SortingButtons from "../Components/SortingButtons/SortingButtons";


function Sorting() {
  const { sortingState, generateSortingArray, showRun, changeSortingSpeed ,setSortingState} =
    useContext(Context);
  useEffect(() => {
    generateSortingArray();
  }, []);
  return (
    <div className="bg-gradient-to-r flex flex-col justify-between from-purple-600 via-pink-300 to-blue-600 min-h-screen">
      <LandingNavbar />
      <SortingButtons/>
      <div className="flex flex-col gap-4 justify-center items-center mt-20">
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
        <div className="flex items-center gap-4 max-w-3xl mb-8">
          <button
            onClick={()=>{
              if(sortingState.sorting) return ;
             
              showRun()
            }}
            className={`${!sortingState.sorting?"bg-blue-600":"bg-blue-300"} text-white cursor-pointer hover:scale-[1.03] ease-in-out duration-300 p-2 rounded-md font-bold`}
          >
            Start
          </button>
          <button
            disabled={sortingState.sorting}
            onClick={() => generateSortingArray()}
            className="bg-blue-600 text-white cursor-pointer hover:scale-[1.03] ease-in-out duration-300 p-2 rounded-md font-bold"
          >
            New Array
          </button>
          <select
            disabled={sortingState.sorting}
            onChange={changeSortingSpeed}
            defaultValue="slow"
            className="bg-blue-400 border-none text-white cursor-pointer hover:scale-[1.03] ease-in-out duration-300 p-2 rounded-md font-bold"
          >
            <option value="slow">Slow</option>
            <option value="normal">Normal</option>
            <option value="fast">Fast</option>
          </select>
        </div>
      </div>
      <div>
        <Editor />
      </div>
    </div>
  );
}

export default Sorting;
