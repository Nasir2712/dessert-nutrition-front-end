import React from "react";
import { useDispatch } from "react-redux";
import Button from "./common/Button";
import { Dessert, getDessertsSuccess } from "../features/dessertsSlice";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";

export const RESET_DATA = gql`
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

interface Data {
  resetData: Dessert[];
}

const ResetData = () => {
  const dispatch = useDispatch();

  return (
    <Mutation<Data>
      mutation={RESET_DATA}
      onCompleted={(data) => {
        const { resetData } = data;
        dispatch(getDessertsSuccess({ desserts: resetData }));
      }}
    >
      {(resetData) => (
        <Button buttonText="RESET DATA" onClick={() => resetData()} />
      )}
    </Mutation>
  );
};

export default ResetData;
