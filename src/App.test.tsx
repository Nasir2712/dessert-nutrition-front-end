import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { MockedProvider } from '@apollo/client/testing'



test('renders learn react link', () => {
  const { getByText } = render(<MockedProvider><Provider store={store}><App /></Provider></MockedProvider>);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
