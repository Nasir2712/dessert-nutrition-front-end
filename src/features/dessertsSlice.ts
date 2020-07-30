import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { AppThunk } from "../app/store";
import { client } from "../index";

const GET_DESSERTS = gql`
  {
    desserts {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

const DELETE_DESSERTS = gql`
  mutation DeleteDesserts($dessert: [String]) {
    deleteDesserts(dessert: $dessert) {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

const RESET_DATA = gql`
  mutation ResetData {
    resetData {
      dessert
      nutritionInfo {
        calories
        fat
        carb
        protein
      }
    }
  }
`;

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
  loading: boolean;
  error: string | null;
}

const initialState: DessertsState = {
  desserts: [],
  selected: [],
  loading: false,
  error: null,
};

const desserts = createSlice({
  name: "desserts",
  initialState,
  reducers: {
    getDessertsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getDessertsSuccess(state, action: PayloadAction<DessertsLoaded>) {
      const { desserts } = action.payload;
      state.desserts = desserts;
      state.loading = false;
      state.selected = [];
      state.error = null;
    },
    getDessertsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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

export const {
  getDessertsStart,
  getDessertsSuccess,
  getDessertsFailure,
  onSelected,
} = desserts.actions;
export default desserts.reducer;

export const getDesserts = async () => {
  const response = await client.query({
    query: GET_DESSERTS,
  });
  return response.data?.desserts;
};

const deleteDesserts = async (selected: string[]) => {
  const response = await client.mutate({
    mutation: DELETE_DESSERTS,
    variables: { dessert: selected },
  });
  return response.data?.deleteDesserts;
};

const resettingData = async () => {
  const response = await client.mutate({
    mutation: RESET_DATA,
  });
  return response.data?.resetData;
};

export const fetchDesserts = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getDessertsStart());
    const desserts = await getDesserts();
    dispatch(getDessertsSuccess({ desserts }));
  } catch (err) {
    dispatch(getDessertsFailure(err));
  }
};

export const onDeleteDesserts = (selected: string[]): AppThunk => async (
  dispatch
) => {
  try {
    const desserts = await deleteDesserts(selected);
    dispatch(getDessertsSuccess({ desserts }));
  } catch (err) {
    dispatch(getDessertsFailure(err));
  }
};

export const resetData = (): AppThunk => async (dispatch) => {
  try {
    const desserts = await resettingData();
    dispatch(getDessertsSuccess({ desserts }));
  } catch (err) {
    dispatch(getDessertsFailure(err));
  }
};
