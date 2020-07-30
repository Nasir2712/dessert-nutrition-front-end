import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import "tachyons";
import AddNewForm from "./AddNewForm";
import DeleteDessert from "./DeleteDessert";
import ResetData from "./ResetData";
import DessertTable from "./DessertTable";

export default function Desserts() {
  const dessertsData = (state: RootState) => state.desserts;
  const { selected } = useSelector(dessertsData);
  return (
      <div className="pa4">
        <div className="overflow-auto">
          <div className="flex items-center center pa2 mw8">
            <div className="fl w-50">
              <h1>Nutrition List</h1>
            </div>
            <div className="fl w-50">
              <div className="fr w-25">
                <ResetData />
              </div>
            </div>
          </div>
          <div className="flex items-center center pa2 mw8 bg-light-pink">
            <div className="fl w-50">{selected.length} rows selected</div>
            <div className="fl w-50">
              <div className="fr w-25">
                <DeleteDessert selected={selected} />
              </div>
              <div className="fr w-25">
                <AddNewForm />
              </div>
            </div>
          </div>
          <DessertTable/>
        </div>
      </div>
  );
}
