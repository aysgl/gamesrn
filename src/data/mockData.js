import React from 'react';
import RockSvg from '../assets/rock.svg';
import PaperSvg from '../assets/paper.svg';
import ScissorsSvg from '../assets/scissors.svg';

export const choices = [
  {id: 0, name: 'Rock', img: <RockSvg width={50} height={50} />},
  {id: 1, name: 'Paper', img: <PaperSvg width={70} height={70} />},
  {id: 2, name: 'Scissors', img: <ScissorsSvg width={80} height={80} />},
];
