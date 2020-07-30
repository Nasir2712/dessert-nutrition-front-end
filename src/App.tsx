import React from "react";
import "./App.css";
import DessertSection from "./components/sections/DessertSection";
import ResetData from "./components/ResetData";
import SelectionSection from "./components/sections/SelectionSection";

function App() {
  return (
    <div className="App">
      <div className="pa4">
        <div className="overflow-auto">
          <div className="flex items-center center pa2 mw8">
            <div className="fl w-50">
              <h2>Nutrition List</h2>
            </div>
            <div className="fl w-50">
              <div className="fr w-25">
                <ResetData />
              </div>
            </div>
          </div>
          <SelectionSection />
          <DessertSection />
        </div>
      </div>
    </div>
  );
}

export default App;
