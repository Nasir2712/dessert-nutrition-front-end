import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dessert, onSelected } from "../features/dessertsSlice";
import "tachyons";
import { RootState } from "../app/rootReducer";

interface sortConfig {
  name: string;
  order: string;
}

type InputEvent = ChangeEvent<HTMLInputElement>;

// custom hook for sorting
const useSorting = (desserts: Dessert[]) => {
  const [sortOrder, setSortOrder] = React.useState<null | sortConfig>(null);

  const newSortedDesserts = React.useMemo(() => {
    let sortedDesserts = [...desserts]; // to make a copy of the original desserts so that sort does not sort the original array
    if (sortOrder !== null) {
      sortedDesserts?.sort((a, b) => {
        if (
          a[sortOrder.name] < b[sortOrder.name] ||
          a.nutritionInfo[sortOrder.name] < b.nutritionInfo[sortOrder.name]
        ) {
          return sortOrder.order === "ascending" ? -1 : 1;
        }
        if (
          a[sortOrder.name] > b[sortOrder.name] ||
          a.nutritionInfo[sortOrder.name] > b.nutritionInfo[sortOrder.name]
        ) {
          return sortOrder.order === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortedDesserts;
  }, [desserts, sortOrder]);

  const sort = (name: string) => {
    let order = "ascending";
    if (sortOrder?.name === name && sortOrder?.order === "ascending") {
      order = "descending";
    }
    setSortOrder({ name, order });
  };

  return { sortedDesserts: newSortedDesserts, sort };
};

export default function DessertTable() {
  const dispatch = useDispatch();

  // get state from the redux store
  const dessertsState = (state: RootState) => state.desserts;
  const { selected, desserts } = useSelector(dessertsState);
  const { sortedDesserts, sort } = useSorting(desserts);

  const rowSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleClick = (name: string) => (event: InputEvent) => {
    dispatch(onSelected(name));
  };

  const renderBody = () => {
    return sortedDesserts.map(
      ({ dessert, nutritionInfo }: Dessert, index: number) => {
        return (
          <tr key={index} className="stripe-dark">
            <td className="pa3">
              <input
                type="checkbox"
                onChange={handleClick(dessert)}
                checked={rowSelected(dessert)}
              />
            </td>
            <td className="pa3">{dessert}</td>
            <td className="pa3">{nutritionInfo.calories}</td>
            <td className="pa3">{nutritionInfo.fat}</td>
            <td className="pa3">{nutritionInfo.carb}</td>
            <td className="pa3">{nutritionInfo.protein}</td>
          </tr>
        );
      }
    );
  };

  return (
    <table className="f6 w-100 mw8 center" cellSpacing="0">
      <thead>
        <tr className="stripe-dark">
          <th className="fw6 t1 pa3 bg-white"></th>
          <th className="fw6 t1 pa3 bg-white">
            <button
              data-testid="dessert-button"
              type="button"
              onClick={() => sort("dessert")}
            >
              Dessert (100g serving)
            </button>
          </th>
          <th className="fw6 t1 pa3 bg-white">
            <button type="button" onClick={() => sort("calories")}>
              Calories
            </button>
          </th>
          <th className="fw6 t1 pa3 bg-white">
            <button type="button" onClick={() => sort("fat")}>
              Fat
            </button>
          </th>
          <th className="fw6 t1 pa3 bg-white">
            <button type="button" onClick={() => sort("carb")}>
              Carbs
            </button>
          </th>
          <th className="fw6 t1 pa3 bg-white">
            <button type="button" onClick={() => sort("protein")}>
              Protein
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="1h-copy">{renderBody()}</tbody>
    </table>
  );
}
