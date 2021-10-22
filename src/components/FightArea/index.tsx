import React, { FC } from 'react';

import UnitCard from '../UnitCard';

import { units } from '../../data';
import { Unit } from '../../types';

import './style.css';

interface FightAreaProps {
  handleChooseUnit: (title: Unit) => void;
}

const FightArea: FC<FightAreaProps> = ({ handleChooseUnit }) => (
  <div className="unit-wrapper">
    <h3 className="unit-title">Choose the unit to start the fight!</h3>
    <div className="player-units">
      {units.map((unit) => (
        <UnitCard key={unit} title={unit} onChoose={handleChooseUnit} />
      ))}
    </div>
  </div>
);

export default FightArea;
