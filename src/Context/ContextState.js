import Context from "./Context.js";
import { useState } from "react";

export default function ContextState(props) {
  
  const speedMap = {
    slow: 1000,
    normal: 500,
    fast: 250,
  };

  

  const [sortingState,setSortingState] = useState({
    array:[],
    delay:500,
    algorithm:"bubbleSort",
    sorted:false,
    sorting:false
  })

  function awaitTimeout(timeout){
    return new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(true);
      },timeout);
    });
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const generateSortingArray = (sorting) => {
    const generatedArray = [];
    for (let i = 0; i < 15; i++) {
      generatedArray.push({
        value: getRandomNumber(100, 999),
        state: "idle",
      });
    }

    setSortingState((prev) => ({
      ...prev,
      array: generatedArray,
      sorted: false,
      sorting: sorting || false,
    }));
  };

  const changeBar = (index, status) => {
    if (status.state) {
      let updatedArray = sortingState.array;
      updatedArray[index] = { ...updatedArray[index], state: status.state };
      setSortingState({ ...sortingState, array: updatedArray });
    } else {
      let updatedArray = sortingState.array;
      updatedArray[index] = { ...updatedArray[index], value: status.value };
      setSortingState({ ...sortingState, array: updatedArray });
    }
  };

  const bubbleSort = async () => {
    const arr = sortingState.array.map((item) => item.value);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        changeBar(j, { state: "selected" });
        changeBar(j + 1, { state: "selected" });
        await awaitTimeout(sortingState.delay);
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          changeBar(j, { value: arr[j + 1] });
          arr[j + 1] = temp;
          changeBar(j + 1, { value: temp });
          await awaitTimeout(sortingState.delay);
        }

        changeBar(j, { state: "idle" });
        changeBar(j + 1, { state: "idle" });
      }
    }
  };

  const insertionSort= async ()=>{
    let arr=[];
    sortingState.array.map((a)=>{
      arr.push(a.value);
    })
    for(let i=1;i<arr.length;i++)
    {
      let j=i-1;
      while(j>=0&&arr[j+1]<arr[j])
      {
        changeBar(j,{state:"selected"});
        changeBar(j+1,{state:"selected"});
        await awaitTimeout(sortingState.delay);
        let temp=arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=temp;
        changeBar(j,{value:arr[j]});
        changeBar(j+1,{value:arr[j+1]});
        await awaitTimeout(sortingState.delay);
        changeBar(j,{state:"idle"});
        changeBar(j+1,{state:"idle"});
        j--;
      }

    }
  }

  const changeSortingSpeed = (e) => {
    setSortingState((prev) => ({
      ...prev,
      delay: speedMap[e.target.value] || 500,
    }));
  };

  const algorithmMap = {
    bubbleSort: bubbleSort,
    insertionSort:insertionSort
  };

  

  const showRun = async (algo) => {
    setSortingState((prev) => ({
      ...prev,
      sorting: true,
    }));
    await algorithmMap[algo]();
    setSortingState((prev) => ({
      ...prev,
      sorted: true,
      sorting: false,
    }));
  };
 

  const languageOptions = [
    { value: "C", label: "C" },
    { value: "CPP14", label: "C++14" },
    { value: "CPP17", label: "C++17" },
    { value: "JAVASCRIPT_NODE", label: "JavaScript(Nodejs)" },
    { value: "JAVA8", label: "Java 8" },
    { value: "JAVA14", label: "Java 14" },
    { value: "PYTHON3_8", label: "Python 3.8" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <Context.Provider
      value={{
        generateSortingArray,
        sortingState,
        bubbleSort,
        changeSortingSpeed,
        showRun,
        languageOptions,
        themes,
        insertionSort,
        setSortingState,
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
