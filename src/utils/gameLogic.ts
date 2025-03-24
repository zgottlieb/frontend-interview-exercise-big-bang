export type Choice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export const choices: Choice[] = [
  'rock',
  'paper',
  'scissors',
  'lizard',
  'spock',
];

export const determineWinner = (
  player1Choice: string,
  player2Choice: string
): 'player1' | 'player2' | 'tie' => {
  const rules: Record<string, string[]> = {
    Rock: ['Scissors', 'Lizard'], // Rock crushes Scissors and flattens Lizard
    Paper: ['Rock', 'Spock'], // Paper smothers Rock and disproves Spock's theories
    Scissors: ['Paper', 'Lizard'], // Scissors shred Paper and decapitate Lizard
    Lizard: ['Spock', 'Paper'], // Lizard poisons Spock and devours Paper
    Spock: ['Scissors', 'Rock'], // Spock vaporizes Rock and smashes Scissors
  };

  if (player1Choice === player2Choice) return 'tie';
  if (rules[player1Choice].includes(player2Choice)) return 'player1';
  return 'player2';
};
