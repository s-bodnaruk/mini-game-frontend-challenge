import * as React from 'react';

import { Unit } from '../../types';

import './style.css';

export interface Props {
  title: Unit;
  onChoose: (title: Unit) => void;
}

const UnitCard: React.FC<Props> = ({ title, onChoose }) => {
  return (
    <div className="unit-card-wrapper" onClick={() => onChoose(title)}>
      <span className="unit-card-title">{title}</span>
    </div>
  );
};

export default UnitCard;
