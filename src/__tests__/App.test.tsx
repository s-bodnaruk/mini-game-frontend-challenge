import { shallow } from 'enzyme';
import * as React from 'react';
import ReactDOM from 'react-dom';

import getStore, { initialState } from '../getStore';

import { AppRoot, mapStateToProps } from '../App';

import ResultPage from '../components/ResultPage';
import FightArea from '../components/FightArea';

import { units } from '../data';
import { Provider } from 'react-redux';

const mockProps = {
  started: true,
  gameOver: false,
  currentRound: 1,
  computerUnits: units,
  score: {
    player: 0,
    computer: 0,
  },
  onStart: jest.fn(),
  onNextRound: jest.fn(),
  onDraw: jest.fn(),
  onNewGame: jest.fn(),
  onPlayerWin: jest.fn(),
  onComputerWin: jest.fn(),
};

const store = getStore();

describe('Root App component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <AppRoot
          started={true}
          gameOver={false}
          computerUnits={units}
          onStart={() => null}
          onNextRound={() => null}
          onDraw={() => null}
          onPlayerWin={() => null}
          onComputerWin={() => null}
        />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders loading state', () => {
    const props = { ...mockProps, started: false };
    const wrapper = shallow(<AppRoot {...props} />);
    expect(wrapper.find('.loading').exists()).toBe(true);
    expect(wrapper.find('.app').exists()).toBe(false);
  });

  it('renders started state', () => {
    const wrapper = shallow(<AppRoot {...mockProps} />);
    expect(wrapper.find('.loading').exists()).toBe(false);
    expect(wrapper.find('.app').exists()).toBe(true);
  });

  it('properly binds state', () => {
    const state = {
      ...initialState,
      started: true,
    };
    const props = mapStateToProps(state);
    expect(props.started).toEqual(true);
    expect(props.gameOver).toEqual(false);
  });

  it('render result page when game is over', () => {
    const props = {
      ...mockProps,
      gameOver: true,
    };
    const wrapper = shallow(<AppRoot {...props} />);
    expect(wrapper.find(ResultPage)).toHaveLength(1);
  });

  it('render round fight area if game is not over', () => {
    const wrapper = shallow(<AppRoot {...mockProps} />);
    expect(wrapper.find(FightArea)).toHaveLength(1);
  });
});
