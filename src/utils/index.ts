import { units } from '../data';

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const shuffleProbability = (probabilityArray: number[]): number[] => {
  let currentIndex = probabilityArray.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [probabilityArray[currentIndex], probabilityArray[randomIndex]] = [
      probabilityArray[randomIndex],
      probabilityArray[currentIndex],
    ];
  }

  return probabilityArray;
};

export const getRandomProbabilityUnit = () => {
  const randomUnitIndex = Math.floor(Math.random() * 3);

  return [...units, units[randomUnitIndex]];
};
