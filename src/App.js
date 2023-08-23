import Landing from "./Pages/Landing";
import ContextState from "./Context/ContextState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BubbleSort from "./Pages/BubbleSort";
import MergeSort from "./Pages/MergeSort";
import QuickSort from "./Pages/QuickSort";

function App() {
  return (
    <ContextState>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/bubble-sort" element={<BubbleSort />}></Route>
          <Route path="/quick-sort" element={<QuickSort />}></Route>
          <Route path="/merge-sort" element={<MergeSort />}></Route>
        </Routes>
      </Router>
    </ContextState>
  );
}

export default App;
