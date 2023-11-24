import Landing from "./Pages/Landing.jsx";
import ContextState from "./Context/ContextState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sorting from "./Pages/Sorting.jsx";

function App() {
  return (
    <ContextState>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/sorting" element={<Sorting />}></Route>
        </Routes>
      </Router>
    </ContextState>
  );
}

export default App;
