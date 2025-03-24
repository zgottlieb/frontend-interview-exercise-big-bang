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
export type Choice = 'Rock' | 'Paper' | 'Scissors' | 'Lizard' | 'Spock';
