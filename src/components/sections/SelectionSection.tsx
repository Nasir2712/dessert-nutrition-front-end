import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import AddNewForm from "../AddNewForm";
import DeleteDessert from "../DeleteDessert";

const SelectionSection = () => {
  const dessertsState = (state: RootState) => state.desserts;
  const { selected } = useSelector(dessertsState);

  return (
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
  );
};

export default SelectionSection;
