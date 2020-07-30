import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NutritionInfo } from "./dessertsSlice";

interface newDessertState {
  [index: string]: any;
  dessert: string;
  nutritionInfo: NutritionInfo;
  loading: boolean;
  error: string | null;
}

const initialState: newDessertState = {
  dessert: "",
  nutritionInfo: {
    calories: 0,
    fat: 0,
    carb: 0,
    protein: 0,
  },
  loading: false,
  error: null,
};

interface onChangeValues {
  name: string;
  value: string;
}

const newDessert = createSlice({
  name: "newDessert",
  initialState,
  reducers: {
    onChange(state, action: PayloadAction<onChangeValues>) {
      const { name, value } = action.payload;
      if (name === "dessert") {
        state[name] = value;
      } else {
        state.nutritionInfo[name] = value ? parseInt(value) : value;
      }
    },
  },
});

export const { onChange } = newDessert.actions;

export default newDessert.reducer;
