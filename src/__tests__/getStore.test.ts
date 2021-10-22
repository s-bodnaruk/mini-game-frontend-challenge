import getStore, {
  appReducer,
  initialState,
  appStartAction,
  playerWinAction,
  computerWinAction,
  drawAction,
  nextRoundAction,
} from '../getStore';

describe('redux related tests', () => {
  it('reducer should return initial state', () => {
    const state = appReducer(undefined, { type: 'something' });
    expect(state).toEqual(initialState);
  });

  it('reducer should return started state', () => {
    const testAction = appStartAction();
    const expectedState = {
      ...initialState,
      started: true,
    };
    const state = appReducer(initialState, testAction);
    expect(state).toEqual(expectedState);
  });

  it('reducer should return valid score after player win', () => {
    const playerAction = playerWinAction();
    const expectedState = {
      ...initialState,
      score: {
        player: 1,
        computer: -1,
      },
    };
    const state = appReducer(initialState, playerAction);
    expect(state).toEqual(expectedState);
  });

  it('reducer should return valid score after computer win', () => {
    const computerAction = computerWinAction();
    const expectedState = {
      ...initialState,
      score: {
        player: -1,
        computer: 1,
      },
    };
    const state = appReducer(initialState, computerAction);
    expect(state).toEqual(expectedState);
  });

  it('reducer should return valid score after draw', () => {
    const drawAct = drawAction();
    const expectedState = {
      ...initialState,
      score: {
        player: -1,
        computer: -1,
      },
    };
    const state = appReducer(initialState, drawAct);
    expect(state).toEqual(expectedState);
  });

  it('reducer should return valid round', () => {
    const nextAction = nextRoundAction();
    const expectedState = {
      ...initialState,
      round: 2,
    };
    const state = appReducer(initialState, nextAction);
    expect(state).toEqual(expectedState);
  });

  it('creates redux store without crashing', () => {
    const store = getStore();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });
});
