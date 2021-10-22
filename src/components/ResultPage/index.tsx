import React, { FC } from 'react';

import { connect } from 'react-redux';
import { getCurrentScore, IAppState, newGameAction } from '../../getStore';

import { IScore } from '../../types';

import './style.css';

interface ResultPageProps {
  onNewGame: () => void;
  score: IScore;
}

const ResultPage: FC<ResultPageProps> = ({ onNewGame, score }) => {
  const getWinner = () => {
    if (score.player > score.computer) {
      return 'Player';
    }

    if (score.player < score.computer) {
      return 'Computer';
    }

    if (score.player === score.computer) {
      return 'Draw';
    }
  };

  const isDraw = getWinner() === 'Draw';

  return (
    <div className="main">
      {isDraw ? <h3>Game over! It's DRAW! </h3> : <h3>Game over! {getWinner()} win! </h3>}
      <button onClick={onNewGame}>Start new game!</button>
    </div>
  );
};

const mapStateToProps = (state: IAppState) => {
  const score = getCurrentScore(state);

  return {
    score,
  };
};

const mapDispatchToProps = {
  onNewGame: newGameAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);
