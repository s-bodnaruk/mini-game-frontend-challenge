import { render } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import UnitCard from '../components/UnitCard';

import { Unit } from '../types';

describe('UnitCard component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UnitCard title={Unit.ARCHERS} onChoose={() => null} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders valid title', () => {
    const wrapper = render(<UnitCard title={Unit.ARCHERS} onChoose={() => null} />);
    expect(wrapper.text()).toContain(Unit.ARCHERS);
  });
});
