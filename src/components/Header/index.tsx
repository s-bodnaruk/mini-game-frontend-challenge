import React, { FC } from 'react';
import { connect } from 'react-redux';

import { getCurrentRound, getCurrentScore, IAppState } from '../../getStore';

import { IScore } from '../../types';

import './style.css';

interface HeaderProps {
  currentRound: number;
  score: IScore;
}

const Header: FC<HeaderProps> = ({ score, currentRound }) => (
  <div className="header">
    <div>
      <h2>Current score:</h2>
    </div>
    <div>
      YOU <span className="score">{score.player}</span> : <span className="score">{score.computer}</span> Computer
    </div>
    {currentRound <= 20 ? (
      <div>
        <span>Round {currentRound} of 20</span>
      </div>
    ) : null}
  </div>
);

const mapStateToProps = (state: IAppState) => {
  const score = getCurrentScore(state);
  const currentRound = getCurrentRound(state);

  return {
    score,
    currentRound,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
