import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../app/store";
import { MockedProvider } from "@apollo/client/testing";
import DessertSection, { FETCH_DESSERTS } from "./DessertSection";

describe("dessert section", () => {
  test("it renders dessert table", async () => {
    const listMock = {
        request: {
          query: FETCH_DESSERTS,
        },
        result: {
          data: { desserts:  [ {
            dessert: "Oreo",
            nutritionInfo: {
                calories: 437,
                fat: 18,
                carb: 63,   
                protein: 4,
            }
        },
        {   
            dessert: "Nougat",
            nutritionInfo: {
                calories: 360,
                fat: 19,
                carb: 9,   
                protein: 37,
            }
        },
        ] },
        },
      };
    const { getByText } = render(
      <MockedProvider mocks={[listMock]} addTypename={false}>
        <Provider store={store}>
          <DessertSection />
        </Provider>
      </MockedProvider>
    );
    await waitForElement(() => getByText(/oreo/i))
    
    expect(getByText(/oreo/i)).toBeInTheDocument();
  });
});
