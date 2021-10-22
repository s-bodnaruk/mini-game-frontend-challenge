import React, { FC } from 'react';

import { Unit, Winner } from '../../types';

import './style.css';

export interface RoundResultProps {
  roundWinner: Winner | null;
  playerChoice: Unit | null;
  computerChoice: Unit | null;
}

const RoundResult: FC<RoundResultProps> = ({ roundWinner, playerChoice, computerChoice }) => {
  return (
    <>
      <h3>Round result:</h3>
      <div className={`result-area ${roundWinner === 'Player' ? 'player-win' : 'computer-win'}`}>
        <div>
          <h3>Your choice</h3>
          <div className={`result-card round-${roundWinner === 'Player' ? 'winner' : 'loser'}`}>{playerChoice}</div>
        </div>
        <div>
          <h3>Computer choice</h3>
          <div className={`result-card round-${roundWinner === 'Computer' ? 'winner' : 'loser'}`}>{computerChoice}</div>
        </div>
      </div>
    </>
  );
};

export default RoundResult;
