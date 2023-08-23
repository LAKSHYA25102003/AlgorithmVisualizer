import Landing from "./Pages/Landing";
import ContextState from "./Context/ContextState";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ContextState>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </Router>
    </ContextState>
  );
}

export default App;
