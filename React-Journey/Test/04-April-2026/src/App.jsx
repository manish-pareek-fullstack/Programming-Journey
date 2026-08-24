import Home from "./Home";
import { createContext } from "react";
export const AbcContect = createContext("mno");
function App() {
  return (
    <>
      <AbcContect.Provider value="mukesh">
        <Home />
      </AbcContect.Provider>
    </>
  );
}

export default App;
