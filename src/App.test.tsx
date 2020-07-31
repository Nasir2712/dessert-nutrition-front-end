import React from "react";
import { render, screen, waitForElement } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { MockedProvider } from "@apollo/client/testing";
import user from "@testing-library/user-event";
import { ADD_DESSERT } from "./components/AddNewForm";
import { FETCH_DESSERTS } from "./components/sections/DessertSection";

// integration test

test("submits the desset form", async () => {
  const mutationMock = {
    request: {
      query: ADD_DESSERT,
      variables: {
        dessert: {
          dessert: "Ice-cream",
          nutritionInfo: { calories: 400, fat: 80, carb: 100, protein: 20 },
        },
      },
    },
    result: {
      data: {
        addDessert:  [
            {
              dessert: "Ice-cream",
              nutritionInfo: {
                calories: 400,
                fat: 80,
                carb: 100,
                protein: 20,
              },
            },
          ],
        },
      },
    }

  const queryMock = {
    request: {
      query: FETCH_DESSERTS,
      variables: {},
    },
    result: {
      data: {
          desserts: [
            {
              dessert: "Oreo",
              nutritionInfo: {
                calories: 400,
                fat: 80,
                carb: 100,
                protein: 20,
              },
            },
          ],
        },
      },
    }
  render(
    <MockedProvider mocks={[queryMock, mutationMock]} addTypename={false}>
      <Provider store={store}>
        <App />
      </Provider>
    </MockedProvider>
  );
  expect(screen.getByText(/nutrition list/i)).toBeInTheDocument();
  expect(screen.getByText(/add new/i)).toBeInTheDocument();
  const addNewButton = screen.getByText(/add new/i);
  expect(addNewButton).toBeEnabled();
  user.click(addNewButton);
  expect(screen.getByText(/add new dessert/i)).toBeInTheDocument();
  user.type(screen.getByLabelText(/dessert name/i), "Ice-cream");
  user.type(screen.getByLabelText(/calories/i), "400");
  user.type(screen.getByLabelText(/fat/i), "80");
  user.type(screen.getByLabelText(/carbs/i), "100");
  user.type(screen.getByLabelText(/protein/i), "20");
  const submitButton = screen.getByText(/submit/i);
  expect(submitButton).toBeEnabled();
  user.click(submitButton);
  await waitForElement(() => screen.getByText(/ice-cream/i));
  expect(screen.getByText(/Ice-cream/i)).toBeInTheDocument();
});
