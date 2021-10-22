import { shallow } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import RoundResult, { RoundResultProps } from '../components/RoundResult';

import { Unit } from '../types';

const mockProps: RoundResultProps = {
  roundWinner: 'Player',
  playerChoice: Unit.ARCHERS,
  computerChoice: Unit.PIKEMEN,
};

describe('FightArea component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RoundResult {...mockProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders valid wineer and valid className', () => {
    const wrapper = shallow(<RoundResult {...mockProps} />);
    expect(wrapper.find('.player-win')).toHaveLength(1);

    const props: RoundResultProps = {
      ...mockProps,
      roundWinner: 'Computer',
    };

    const wrapper1 = shallow(<RoundResult {...props} />);
    expect(wrapper1.find('.computer-win')).toHaveLength(1);

    const props1: RoundResultProps = {
      ...mockProps,
      roundWinner: 'Draw',
    };

    const wrapper2 = shallow(<RoundResult {...props1} />);
    expect(wrapper2.find('.round-loser')).toHaveLength(2);
  });
});
