import React from "react";
import { useDispatch } from "react-redux";
import { onDeleteDesserts } from "../features/dessertsSlice";
import Button from "./common/Button";

interface IProps {
  selected: string[];
}

const DeleteDessert = (props: IProps) => {
  const { selected } = props;
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (selected.length > 0) {
      dispatch(onDeleteDesserts(selected));
    }
  };

  return <Button buttonText="DELETE" onClick={handleDelete}/>;
};

export default DeleteDessert;
