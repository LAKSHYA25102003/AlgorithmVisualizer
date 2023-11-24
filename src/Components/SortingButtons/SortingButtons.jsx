import React from "react";
import { useContext } from "react";
import Context from "../../Context/Context";

function SortingButtons() {
  const { sortingState,setSortingState} = useContext(Context);
  const changeAlgo=(algo)=>{
   
    setSortingState((prev)=>({
        ...prev,
        algorithm:algo
    }))
  
  }
  return (
    <div className=" flex items-center justify-center mt-10">
      <div className="w-[80%] flex items-center justify-center gap-4 text-white font-medium ">
        <button onClick={()=>{changeAlgo("bubbleSort")}}  className={`${sortingState.algorithm==="bubbleSort"?"bg-[#050814]":"bg-[#05081489]"} hover:bg-[#050814] ease-in-out transition delay-50 hover:scale-105 p-2 rounded-md`}>
          Bubble Sort
        </button>
        <button onClick={()=>{changeAlgo("insertionSort")}} className={`${sortingState.algorithm==="insertionSort"?"bg-[#050814]":"bg-[#05081489]"} hover:bg-[#050814] ease-in-out transition delay-50 hover:scale-105 p-2 rounded-md`}>
          Insertion Sort
        </button>
        <button onClick={()=>{changeAlgo("selectionSort")}} className={`${sortingState.algorithm==="selectionSort"?"bg-[#050814]":"bg-[#05081489]"} hover:bg-[#050814] ease-in-out transition delay-50 hover:scale-105 p-2 rounded-md`}>
          Selection Sort
        </button>
        <button onClick={()=>{changeAlgo("mergeSort")}} className={`${sortingState.algorithm==="mergeSort"?"bg-[#050814]":"bg-[#05081489]"} hover:bg-[#050814] ease-in-out transition delay-50 hover:scale-105 p-2 rounded-md`}>
          Merge Sort
        </button>
      </div>
    </div>
  );
}

export default SortingButtons;
