import React from "react";
import { useDispatch } from "react-redux";
import Button from "./common/Button";
import { resetData } from "../features/dessertsSlice";


const ResetData = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(resetData());
  };

  return <Button buttonText="RESET DATA" onClick={handleClick}/>;
};

export default ResetData;
