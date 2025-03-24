export type PlayerChoice = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';

export interface GameResult {
  winner: 'player' | 'computer' | 'tie';
  playerChoice: PlayerChoice;
  computerChoice: PlayerChoice;
}

export interface Score {
  playerScore: number;
  computerScore: number;
}

export type Player = 'player1' | 'player2';
export type Choice =
  | 'Rock' // Crushes Scissors and flattens Lizard
  | 'Paper' // Smothers Rock and disproves Spock's theories
  | 'Scissors' // Shreds Paper and decapitates Lizard
  | 'Lizard' // Poisons Spock and devours Paper
  | 'Spock'; // Vaporizes Rock and smashes Scissors
