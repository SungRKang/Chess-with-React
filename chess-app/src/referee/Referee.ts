import { PieceType, TeamType, Piece } from "../components/Chessboard/Chessboard";

export default class Referee {
  tileIsOccupied(x:number, y:number, boardState: Piece[]): boolean {
    const piece = boardState.find(p => p.x === x && p.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(x: number, y:number, boardState: Piece[], team: TeamType): boolean {

    const piece = boardState.find((p) => p.x === x && p.y === y && p.team !== team);

    if (piece) {
      return true;
    } else {
      return false;
    }

  } 

  isValidMove(px: number, py:number, x:number, y:number, type: PieceType, team: TeamType, boardState: Piece[] ) {
    if (type === PieceType.PAWN) {
      const startingRow = (team === TeamType.WHITE) ? 1 : 6;
      const pawnDirection = (team === TeamType.WHITE) ? 1 : -1;

      //movement logic
      if(px === x && py === startingRow && y-py === 2*pawnDirection) {
        if(!this.tileIsOccupied(x,y,boardState) && !this.tileIsOccupied(x,y-pawnDirection,boardState)){
          return true;
        }
      } else if(px === x && y-py === pawnDirection){
        if(!this.tileIsOccupied(x,y,boardState)){
          return true;
        } 
      }
      //attack logic
      else if(x-px === -1 && y-py === pawnDirection) {
        //attacking upper left or bottom left corner
        if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
          return true;
        }
      } else if (x-px === 1 && y-py === pawnDirection) {
        //attacking upper right or bottom right corner
        if(this.tileIsOccupiedByOpponent(x,y,boardState,team)){
          return true; 
        }
      }
    }







  return false;
  }
}