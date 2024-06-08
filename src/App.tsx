import React from "react";
import Autocomplete from "./components/Autocomplete";

const App: React.FC = () => {
  return (
    //Container for autocomplete component
    <div className="autocomplete-container">
      <h1>Find your Country</h1>
      <Autocomplete />
    </div>
  );
};

export default App;
