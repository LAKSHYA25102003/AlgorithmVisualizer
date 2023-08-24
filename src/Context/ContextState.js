import Context from "./Context.js";
import { useState } from "react";

export default function ContextState(props) {
  const algorithms = [
    {
      name: "Bubble Sort",
      text: "Bubble Sort is the simplest sorting algorithm .This sorting algorithm is slow.It compares between two elements,larger element among those comparable element swap with small element and placed in right.It used loop that's why it's time complexity is high.",
      url: "/bubble-sort",
    },
    {
      name: "Quick Sort",
      text: "Quick Sort is also sorting algorithm .It's name Quick sort that does n't mean it is Fastest Algorithm . It is faster than Bubble sort. It is divide and conquer algorithm so , It's use Recursion .So time complexity is less compair to Bubble Sort .  ",
      url: "/quick-sort",
    },
    {
      name: "Merge Sort",
      text: "Bubble Sort is the simplest sorting algorithm .This sorting algorithm is slow.It compares between two elements,larger element among those comparable element swap with small element and placed in right.It used loop that's why it's time complexity is high.",
      url: "/merge-sort",
    },
  ];

  const speedMap = {
    slow: 1000,
    normal: 500,
    fast: 250,
  };

  const [sortingState, setSortingState] = useState({
    array: [],
    delay: speedMap["slow"],
    algorithm: "bubbleSort",
    sorted: false,
    sorting: false,
  });

  function awaitTimeout(timeout) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, timeout);
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

  const changeSortingSpeed = (e) => {
    setSortingState((prev) => ({
      ...prev,
      delay: speedMap[e.target.value] || 500,
    }));
  };

  const algorithmMap = {
    bubbleSort: bubbleSort,
  };

  const showRun = async () => {
    setSortingState((prev) => ({
      ...prev,
      sorting: true,
    }));

    await algorithmMap[sortingState.algorithm]();

    setSortingState((prev) => ({
      ...prev,
      sorted: true,
      sorting: false,
    }));
  };

  const languageOptions = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <Context.Provider
      value={{
        algorithms,
        generateSortingArray,
        sortingState,
        bubbleSort,
        changeSortingSpeed,
        showRun,
        languageOptions,
        themes
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
