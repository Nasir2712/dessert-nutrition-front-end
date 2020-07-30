import React from "react";
import DessertTable from "../DessertTable";
import { useDispatch } from "react-redux";
import { Dessert, getDessertsSuccess } from "../../features/dessertsSlice";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import "tachyons";

const FETCH_DESSERTS = gql`
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

interface Data {
  desserts: Dessert[];
}

const DessertSection = () => {
  const dispatch = useDispatch();
  return (
    <Query<Data>
      query={FETCH_DESSERTS}
      onCompleted={(data) => {
        const { desserts } = data;
        dispatch(getDessertsSuccess({ desserts }));
      }}
    >
      {({ loading, error }) => {
        if (loading) return <div>Loading</div>;
        if (error) return <div>`Error! ${error}`</div>;

        return <DessertTable />;
      }}
    </Query>
  );
};

export default DessertSection;
