import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../../Context/Context";

function Merge() {
  const {sortingState,setSortingState} = useContext(Context);
  const changeAlgo=(algo)=>{
    setSortingState((prev)=>({
        ...prev,
        algorithm:algo
    }))
  
  }
  const navigate = useNavigate();
  let text =
    "Merge sort is a popular sorting algorithm that follows the divide-and-conquer approach. It works by breaking down an unsorted array into smaller, sorted subarrays and then merging those subarrays to produce a fully sorted array.";
  return (
    <div className="flex justify-center items-center ">
      <div
        onClick={() => {
          changeAlgo("mergeSort")
          navigate("/sorting");
        }}
        className="w-[100%] hover:scale-[1.03] ease-in-out duration-300 cursor-pointer"
      >
        <div class="block  rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <div
            class="relative overflow-hidden bg-cover bg-no-repeat"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <img
              class="rounded-t-lg"
              src="https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"
              alt=""
            />
          </div>
          <div class="p-6">
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
              Merge Sort
            </h5>
            {text.length > 60 ? (
              <p className="text-white ">{text.slice(0, 200)}...</p>
            ) : (
              <p>{text}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merge;
