import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Header from '../components/Header';

import getStore from '../getStore';

const store = getStore();

describe('Header component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Header />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
