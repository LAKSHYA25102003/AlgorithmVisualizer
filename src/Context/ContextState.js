import Context from "./Context.js";
import { useState } from "react";

export default function ContextState(props) {
  const speedMap = {
    slow: 1000,
    normal: 500,
    fast: 250,
  };

  const [sortingState, setSortingState] = useState({
    array: [],
    delay: 500,
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
      sorting: false,
    }));
  };

  const changeBar = (index, payload) => {
    setSortingState((prev) => ({
      ...prev,
      array: prev.array.map((item, i) =>
        i === index ? { ...item, ...payload } : item
      ),
    }));
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

  const insertionSort = async () => {
    let arr = [];
    sortingState.array.map((a) => {
      arr.push(a.value);
    });
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      while (j >= 0 && arr[j + 1] < arr[j]) {
        changeBar(j, { state: "selected" });
        changeBar(j + 1, { state: "selected" });
        await awaitTimeout(sortingState.delay);
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        changeBar(j, { value: arr[j] });
        changeBar(j + 1, { value: arr[j + 1] });
        await awaitTimeout(sortingState.delay);
        changeBar(j, { state: "idle" });
        changeBar(j + 1, { state: "idle" });
        j--;
      }
    }
  };

  const selectionSort = async () => {
    let arr = [];
    sortingState.array.map((a) => {
      arr.push(a.value);
    });
    for (let i = 0; i < arr.length; i++) {
      let mini = i;
      changeBar(mini, { state: "selected" });
      for (let j = i + 1; j < arr.length; j++) {
        changeBar(j, { state: "selected" });
        await awaitTimeout(sortingState.delay);
        if (arr[j] < arr[mini]) {
          changeBar(mini, { state: "idle" });
          mini = j;
          changeBar(mini, { state: "selected" });
        } else {
          changeBar(j, { state: "idle" });
        }
        awaitTimeout(sortingState.delay);
      }
      let temp = arr[i];
      arr[i] = arr[mini];
      changeBar(i, { value: arr[i] });
      changeBar(mini, { state: "idle" });
      arr[mini] = temp;
      changeBar(mini, { value: arr[mini] });
    }
  };

  const mergeSortMerger = async (arr, start, mid, end) => {
    let left=[];
    let right=[];
    let temp=0;
    for(let i=start;i<=mid;i++)
    {
      left[temp]=arr[i];
      temp++;
    }
    temp=0;
    for(let i=mid+1;i<=end;i++)
    {
      right[temp]=arr[i];
      temp++;
    }
    let k = start;
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        changeBar(k, { value: left[i], state: "selected" });
        arr[k++] = left[i++];
      } else {
        changeBar(k, { value: right[j], state: "selected" });
        arr[k++] = right[j++];
      }
      await awaitTimeout(sortingState.delay);
    }

    while (i < left.length) {
      changeBar(k, { value: left[i], state: "selected" });
      arr[k++] = left[i++];
      await awaitTimeout(sortingState.delay);
    }

    while (j < right.length) {
      changeBar(k, { value: right[j], state: "selected" });
      arr[k++] = right[j++];
      await awaitTimeout(sortingState.delay);
    }

    for (let i = start; i <= end; i++) {
      changeBar(i, { value: arr[i], state: "idle" });
    }
  };

  async function mergeSortHelper(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return;
    const middle = Math.floor((start + end) / 2);
    await mergeSortHelper(arr, start, middle);
    await mergeSortHelper(arr, middle + 1, end);
    await mergeSortMerger(arr, start, middle, end);
  }

  const mergeSort = async () => {
    const arr = sortingState.array.map((item) => item.value);
    mergeSortHelper(arr);
  };

  const changeSortingSpeed = (e) => {
    setSortingState((prev) => ({
      ...prev,
      delay: speedMap[e.target.value] || 500,
    }));
  };

  const algorithmMap = {
    bubbleSort: bubbleSort,
    insertionSort: insertionSort,
    selectionSort: selectionSort,
    mergeSort: mergeSort,
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
        selectionSort,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
