import * as React from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';
import ResultPage from './components/ResultPage';
import RoundResult from './components/RoundResult';
import FightArea from './components/FightArea';

import {
  IAppState,
  isAppStarted,
  appStartAction,
  nextRoundAction,
  drawAction,
  playerWinAction,
  computerWinAction,
  getComputerUnits,
  getGameOver,
} from './getStore';

import { IFightCondition, Unit, Winner } from './types';

import './App.css';

export interface AppProps {
  started: boolean;
  gameOver: boolean;
  computerUnits: Unit[];
  onStart: () => void;
  onNextRound: () => void;
  onDraw: () => void;
  onPlayerWin: () => void;
  onComputerWin: () => void;
}

export const AppRoot: React.FC<AppProps> = ({
  started,
  gameOver,
  computerUnits,
  onStart,
  onNextRound,
  onDraw,
  onPlayerWin,
  onComputerWin,
}) => {
  const [roundWinner, setRoundWinner] = React.useState<Winner | null>(null);
  const [playerChoice, setPlayerChoice] = React.useState<Unit | null>(null);
  const [computerChoice, setComputerChoice] = React.useState<Unit | null>(null);

  React.useEffect(() => {
    onStart();
  }, [onStart]);

  const clearChoices = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
  };

  const startFight = (playerChoice: Unit) => {
    const computerChoice = computerUnits[Math.floor(Math.random() * 4)];

    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);

    const fightLogic: IFightCondition = {
      Cavalry: Unit.ARCHERS,
      Archers: Unit.PIKEMEN,
      Pikemen: Unit.CAVALRY,
    };

    if (playerChoice && computerChoice) {
      if (playerChoice === computerChoice) {
        onDraw();
        setRoundWinner('Draw');

        return setTimeout(() => {
          clearChoices();
          onNextRound();
        }, 0);
      }

      if (fightLogic[playerChoice] === computerChoice) {
        onPlayerWin();
        setRoundWinner('Player');
      } else {
        onComputerWin();
        setRoundWinner('Computer');
      }

      setTimeout(() => {
        clearChoices();
        onNextRound();
      }, 0);
    }
  };

  if (!started) {
    return <span className="loading">Loading...</span>;
  }

  const handleChooseUnit = (title: Unit) => {
    if (!playerChoice) {
      startFight(title);
    }
  };

  return (
    <div className="app">
      <Header />
      {!gameOver ? <FightArea handleChooseUnit={handleChooseUnit} /> : <ResultPage />}
      {computerChoice && playerChoice && !gameOver ? (
        <RoundResult roundWinner={roundWinner} computerChoice={computerChoice} playerChoice={playerChoice} />
      ) : null}
    </div>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const started = isAppStarted(state);
  const computerUnits = getComputerUnits(state);
  const gameOver = getGameOver(state);

  return {
    started,
    computerUnits,
    gameOver,
  };
};

export const mapDispatchToProps = {
  onStart: appStartAction,
  onNextRound: nextRoundAction,
  onDraw: drawAction,
  onPlayerWin: playerWinAction,
  onComputerWin: computerWinAction,
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppRoot);
export default App;
