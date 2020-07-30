import React from "react";
import { useDispatch } from "react-redux";
import {
  Dessert,
  getDessertsSuccess,
} from "../features/dessertsSlice";
import Button from "./common/Button";
import { gql } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";

interface IProps {
  selected: string[];
}

interface Data {
  deleteDesserts: Dessert[];
}

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

const DeleteDessert = (props: IProps) => {
  const { selected } = props;
  const dispatch = useDispatch();

  return (
    <Mutation<Data>
      mutation={DELETE_DESSERTS}
      onCompleted={(data) => {
        const { deleteDesserts } = data;
        dispatch(getDessertsSuccess({ desserts: deleteDesserts }));
      }}
    >
      {(deleteDesserts) => (
        <Button
          buttonText="DELETE"
          onClick={() => {
            if (selected.length > 0) {
              deleteDesserts({ variables: { dessert: selected } });
            } else {
              console.log("Please select something first");
            }
          }}
        />
      )}
    </Mutation>
  );
};

export default DeleteDessert;
