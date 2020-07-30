import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Dessert {
  [index: string]: any;
  dessert: string;
  nutritionInfo: NutritionInfo;
}

export interface NutritionInfo {
  [index: string]: any;
  calories: number;
  fat: number;
  carb: number;
  protein: number;
}

interface DessertsLoaded {
  desserts: Dessert[];
}

interface DessertsState {
  desserts: Dessert[];
  selected: string[];
  error: string | null;
}

const initialState: DessertsState = {
  desserts: [],
  selected: [],
  error: null,
};

const desserts = createSlice({
  name: "desserts",
  initialState,
  reducers: {
    getDessertsSuccess(state, action: PayloadAction<DessertsLoaded>) {
      const { desserts } = action.payload;
      state.desserts = desserts;
      state.selected = [];
      state.error = null;
    },
    onSelected(state, action: PayloadAction<string>) {
      const name = action.payload;
      if (state.selected.indexOf(name) === -1) {
        state.selected = state.selected.concat(name);
      } else {
        state.selected = state.selected.filter((word) => !(word === name));
      }
    },
  },
});

export const { getDessertsSuccess, onSelected } = desserts.actions;

export default desserts.reducer;
