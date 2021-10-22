import { shallow } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import FightArea from '../components/FightArea';
import UnitCard from '../components/UnitCard';

describe('FightArea component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<FightArea handleChooseUnit={() => null} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders unit cards without crashing', () => {
    const wrapper = shallow(<FightArea handleChooseUnit={() => null} />);
    expect(wrapper.find(UnitCard)).toHaveLength(3);
  });
});
