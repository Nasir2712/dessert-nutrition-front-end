import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import { AppThunk } from "../app/store";
import { client } from "../index";
import { getDessertsSuccess, NutritionInfo} from "./dessertsSlice";


const ADD_DESSERT = gql`

  mutation AddDessert($dessert: DessertInput){
      addDessert(dessert: $dessert) {
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
    saveDessertsSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    saveDessertsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  onChange,
  saveDessertsSuccess,
  saveDessertsFailure,
} = newDessert.actions;

export default newDessert.reducer;

const saveDesserts = async (dessert: string, nutritionInfo: NutritionInfo) => {
    const dessertInfo = {
        dessert,
        nutritionInfo
    }
    const response = await client.mutate({mutation: ADD_DESSERT, variables: { dessert: dessertInfo}});
    return response.data?.addDessert;
};

export const addDessert = (dessert: string, nutritionInfo: NutritionInfo): AppThunk => async (dispatch) => {
  try {
    const desserts = await saveDesserts(dessert, nutritionInfo)
    dispatch(getDessertsSuccess({ desserts }));
  } catch (err) {
    dispatch(saveDessertsFailure(err));
  }
};
