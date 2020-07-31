import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../app/store';
import { MockedProvider } from '@apollo/client/testing'
import ResetData, { RESET_DATA } from './ResetData';

describe("reset data button", () => {
    test("it renders reset button ",  () => {
        const { getByText } = render(
          <MockedProvider>
            <Provider store={store}>
              <ResetData />
            </Provider>
          </MockedProvider>
        );
        
        expect(getByText(/reset data/i)).toBeInTheDocument();
      });
  });
