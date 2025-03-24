export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export const choices: Choice[] = [
  'rock',
  'paper',
  'scissors',
  'lizard',
  'spock',
];

export enum Messages {
  Rock = 'Rock crushes Scissors and flattens Lizard!',
  Paper = 'Paper covers Rock and disproves Spock!',
  Scissors = 'Scissors cut Paper and trim Lizard!',
  Lizard = 'Lizard eats Paper and poisons Spock!',
  Spock = 'Spock vaporizes Rock and breaks Scissors!',
}

export const determineWinner = (
  player1Choice: string,
  player2Choice: string
): 'player1' | 'player2' | 'tie' => {
  const rules: Record<string, string[]> = {
    Rock: ['Scissors', 'Lizard'],
    Paper: ['Rock', 'Spock'],
    Scissors: ['Paper', 'Lizard'],
    Lizard: ['Spock', 'Paper'],
    Spock: ['Scissors', 'Rock'],
  };

  if (player1Choice === player2Choice) return 'tie';
  if (rules[player1Choice].includes(player2Choice)) return 'player1';
  return 'player2';
};
