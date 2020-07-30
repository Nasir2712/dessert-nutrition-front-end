import React, { useState, ChangeEvent } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { RootState } from "../app/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "../features/newDessertSlice";
import Button from "./common/Button";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { Dessert, getDessertsSuccess } from "../features/dessertsSlice";
import "bootstrap/dist/css/bootstrap.min.css";

type InputEvent = ChangeEvent<HTMLInputElement>;

interface Data {
  addDessert: Dessert[];
}

const ADD_DESSERT = gql`
  mutation AddDessert($dessert: DessertInput) {
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

const AddNewForm = () => {
  const dispatch = useDispatch();

  // Modal Toggling
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const newDessertData = (state: RootState) => state.newDessert;
  const nutritionInfo = useSelector(
    (state: RootState) => state.newDessert.nutritionInfo
  );

  const {
    dessert,
    nutritionInfo: { calories, fat, carb, protein },
  } = useSelector(newDessertData);

  const onChangeEvent = (name: string) => (event: InputEvent) => {
    const value = event.target.value;
    dispatch(onChange({ name, value }));
  };

  return (
    <Mutation<Data>
      mutation={ADD_DESSERT}
      onCompleted={(data) => {
        const { addDessert } = data;
        dispatch(getDessertsSuccess({ desserts: addDessert }));
      }}
    >
      {(addDessert) => (
        <div>
          <Button buttonText="ADD NEW" onClick={toggle} />
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Dessert</ModalHeader>
            <ModalBody>
              <main className="pa4 black-80">
                <form
                  className="measure center"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const dessertInfo = { dessert, nutritionInfo };
                    addDessert({ variables: { dessert: dessertInfo } });
                    toggle();
                  }}
                >
                  <fieldset
                    id="add_new_form"
                    className="ba b--transparent ph0 mh0"
                  >
                    <div className="mt3">
                      <label
                        className="db fw6 lh-copy f6"
                        htmlFor="dessert-name"
                      >
                        Dessert Name
                      </label>
                      <input
                        className="pa2 input-reset ba bg-transparent w-100"
                        name="dessert-name"
                        id="dessert-name"
                        value={dessert}
                        onChange={onChangeEvent("dessert")}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="calories">
                        Calories*
                      </label>
                      <input
                        className="b pa2 input-reset ba bg-transparent w-100"
                        name="calories"
                        type="number"
                        id="calories"
                        value={calories}
                        onChange={onChangeEvent("calories")}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="fat">
                        Fat*
                      </label>
                      <input
                        className="b pa2 input-reset ba bg-transparent w-100"
                        type="number"
                        name="fat"
                        id="fat"
                        value={fat}
                        onChange={onChangeEvent("fat")}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="carbs">
                        Carbs*
                      </label>
                      <input
                        className="b pa2 input-reset ba bg-transparent w-100"
                        type="number"
                        name="carbs"
                        id="carbs"
                        value={carb}
                        onChange={onChangeEvent("carb")}
                      />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="protein">
                        Protein
                      </label>
                      <input
                        className="b pa2 input-reset ba bg-transparent w-100"
                        type="number"
                        name="protein"
                        id="protein"
                        value={protein}
                        onChange={onChangeEvent("protein")}
                      />
                    </div>
                  </fieldset>
                  <div className="">
                    <input
                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>
              </main>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </Modal>
        </div>
      )}
    </Mutation>
  );
};

export default AddNewForm;
