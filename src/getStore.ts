import { Action, ActionCreator, AnyAction, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IScore, Unit } from './types';
import { getRandomProbabilityUnit } from './utils';

const initialComputerProbabilities = getRandomProbabilityUnit();

// action type(s)
export const APP_START = 'APP_START';
export const NEXT_ROUND = 'NEXT_ROUND';
export const PLAYER_WIN = 'PLAYER_WIN';
export const COMPUTER_WIN = 'COMPUTER_WIN';
export const DRAW = 'DRAW';
export const NEW_GAME = 'NEW_GAME';

export type APP_START = typeof APP_START;
export type NEXT_ROUND = typeof NEXT_ROUND;
export type PLAYER_WIN = typeof PLAYER_WIN;
export type COMPUTER_WIN = typeof COMPUTER_WIN;
export type DRAW = typeof DRAW;
export type NEW_GAME = typeof NEW_GAME;

export type CustomAction<T> = AnyAction & Action<T>;

export interface IAppStartAction extends Action<APP_START> {
  type: APP_START;
}
export interface INextRoundAction extends Action<NEXT_ROUND> {
  type: NEXT_ROUND;
}
export interface IPlayerWinAction extends Action<PLAYER_WIN> {
  type: PLAYER_WIN;
}
export interface IComputerWinAction extends Action<COMPUTER_WIN> {
  type: COMPUTER_WIN;
}
export interface IDrawAction extends Action<DRAW> {
  type: DRAW;
}
export interface INewGameAction extends Action<NEW_GAME> {
  type: NEW_GAME;
}

export type AppActions =
  | IAppStartAction
  | INextRoundAction
  | IComputerWinAction
  | IPlayerWinAction
  | IDrawAction
  | INewGameAction;

// action builder(s)
export const appStartAction: ActionCreator<IAppStartAction> = () => ({
  type: APP_START,
});
export const nextRoundAction: ActionCreator<INextRoundAction> = () => ({
  type: NEXT_ROUND,
});
export const playerWinAction: ActionCreator<IPlayerWinAction> = () => ({
  type: PLAYER_WIN,
});
export const computerWinAction: ActionCreator<IComputerWinAction> = () => ({
  type: COMPUTER_WIN,
});
export const drawAction: ActionCreator<IDrawAction> = () => ({
  type: DRAW,
});
export const newGameAction: ActionCreator<INewGameAction> = () => ({
  type: NEW_GAME,
});

// state definition
export interface IAppState {
  started: boolean;
  gameOver: boolean;
  round: number;
  computerUnits: Unit[];
  score: IScore;
  maxRounds: number;
}

export const initialState: IAppState = {
  started: false,
  gameOver: false,
  round: 1,
  computerUnits: initialComputerProbabilities,
  score: {
    player: 0,
    computer: 0,
  },
  maxRounds: 20,
};

// app reducer
export function appReducer(state: IAppState = initialState, action: AppActions | Action) {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        started: true,
      };
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1,
        gameOver: state.round + 1 === 21 ? true : false,
      };
    case PLAYER_WIN:
      return {
        ...state,
        score: {
          player: state.score.player + 1,
          computer: state.score.computer - 1,
        },
      };
    case COMPUTER_WIN:
      return {
        ...state,
        score: {
          player: state.score.player - 1,
          computer: state.score.computer + 1,
        },
      };
    case DRAW:
      return {
        ...state,
        score: {
          player: state.score.player - 1,
          computer: state.score.computer - 1,
        },
      };
    case NEW_GAME:
      const newComputerProbabilities = getRandomProbabilityUnit();

      return {
        ...initialState,
        computerUnits: newComputerProbabilities,
        started: true,
      };
    default:
      return state;
  }
}

// started state selector
export const isAppStarted = (state: IAppState) => state.started;
export const getCurrentRound = (state: IAppState) => state.round;
export const getComputerUnits = (state: IAppState) => state.computerUnits;
export const getCurrentScore = (state: IAppState) => state.score;
export const getGameOver = (state: IAppState) => state.gameOver;

export type AppStore = Store<IAppState, AppActions | Action>;

export default function getStore(): AppStore {
  const store = createStore(appReducer, composeWithDevTools(applyMiddleware()));
  return store;
}
