import Landing from "./Pages/Landing";
import ContextState from "./Context/ContextState";

function App() {
  return (
    <ContextState>
      <div>
        <Landing />
      </div>
    </ContextState>
  );
}

export default App;
