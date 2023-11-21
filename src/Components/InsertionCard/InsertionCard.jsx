import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../../Context/Context";

function InsertionCard() {
  const navigate = useNavigate();
  const{setSortingState} = useContext(Context);
  const changeAlgo=(algo)=>{
    setSortingState((prev)=>({
        ...prev,
        algorithm:algo
    }))
  
  }
  let text =
    "Insertion sort is a simple sorting algorithm that works by repeatedly inserting elements from an unsorted array into a sorted sub-array at the correct position. The algorithm starts by considering the first element of the array as a sorted sub-array. It then picks the next element and compares it to the elements in the sorted sub-array, moving elements to the right until it finds the correct position to insert the new element. This process is repeated for each subsequent element until the entire array is sorted.";
  return (
    <div className="flex justify-center items-center ">
      <div
        onClick={() => {
          changeAlgo("insertionSort");
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
              Insertion Sort
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

export default InsertionCard;
