import React from "react";
import Autocomplete from "./components/Autocomplete";

const suggestions = [
  { id: 1, value: "Apple" },
  { id: 2, value: "Banana" },
  { id: 3, value: "Cherry" },
  { id: 4, value: "Date" },
  { id: 5, value: "Elderberry" },
  { id: 6, value: "Fig" },
  { id: 7, value: "Grape" },
  { id: 8, value: "Honeydew" },
];

const App: React.FC = () => {
  return (
    <div className="autocomplete-container">
      <h1>Autocomplete Component</h1>
      <Autocomplete suggestions={suggestions}/>
    </div>
  );
};

export default App;
