import Context from "./Context.js";
import { useState } from "react";

export default function ContextState(props) {
  const algorithms = [
    {
      name: "Bubble Sort",
      text: "Bubble Sort is the simplest sorting algorithm .This sorting algorithm is slow.It compares between two elements,larger element among those comparable element swap with small element and placed in right.It used loop that's why it's time complexity is high.",
    },
    {
      name: "Quick Sort",
      text: "Quick Sort is also sorting algorithm .It's name Quick sort that does n't mean it is Fastest Algorithm . It is faster than Bubble sort. It is divide and conquer algorithm so , It's use Recursion .So time complexity is less compair to Bubble Sort .  ",
    },
    {
      name: "Merge Sort",
      text: "Bubble Sort is the simplest sorting algorithm .This sorting algorithm is slow.It compares between two elements,larger element among those comparable element swap with small element and placed in right.It used loop that's why it's time complexity is high.",
    }
  ];
  return (
    <Context.Provider value={{ algorithms }}>{props.children}</Context.Provider>
  );
}
