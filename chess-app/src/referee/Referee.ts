import { TeamType, PieceType, Piece, Position } from "../Constants";

export default class Referee {
  tileIsOccupied(x:number, y:number, boardState: Piece[]): boolean {
    const piece = boardState.find(p => p.position.x === x && p.position.y === y);
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  tileIsOccupiedByOpponent(x: number, y:number, boardState: Piece[], team: TeamType): boolean {
    const piece = boardState.find((p) => p.position.x === x && p.position.y === y && p.team !== team);
    if (piece) {
      return true;
    } else {
      return false;
    }
  } 

  isEnPassantMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
    const pawnDirection = (team === TeamType.WHITE) ? 1 : -1;
    
    if(type === PieceType.PAWN) {
      if((desiredPosition.x-initialPosition.x === -1 || desiredPosition.x-initialPosition.x === 1) && desiredPosition.y-initialPosition.y === pawnDirection) {
        const piece = boardState.find(p => p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant);
        if(piece) {
          return true;
        }
      }
    }
    //if the attacking piece is a pawn

    //upper left / upper right || bottom left / bottom right
    //if a piece is under  / above the attacked tile
    //if the attacked piece has made an en passant move in the previous turn

    //put the piece in correct position
    //remove en passanted piece
    return false;
    
  }


  isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType, boardState: Piece[]) {
    if (type === PieceType.PAWN) {
      const startingRow = (team === TeamType.WHITE) ? 1 : 6;
      const pawnDirection = (team === TeamType.WHITE) ? 1 : -1;

      //movement logic
      if(initialPosition.x === desiredPosition.x && initialPosition.y === startingRow && desiredPosition.y-initialPosition.y === 2*pawnDirection) {
        if(!this.tileIsOccupied(desiredPosition.x,desiredPosition.y,boardState) && !this.tileIsOccupied(desiredPosition.x,desiredPosition.y-pawnDirection,boardState)){
          return true;
        }
      } else if(initialPosition.x === desiredPosition.x && desiredPosition.y-initialPosition.y === pawnDirection){
        if(!this.tileIsOccupied(desiredPosition.x,desiredPosition.y,boardState)){
          return true;
        } 
      }
      //attack logic
      else if(desiredPosition.x-initialPosition.x === -1 && desiredPosition.y-initialPosition.y === pawnDirection) {
        //attacking upper left or bottom left corner
        if(this.tileIsOccupiedByOpponent(desiredPosition.x,desiredPosition.y,boardState,team)){
          return true;
        } 
      } else if (desiredPosition.x-initialPosition.x === 1 && desiredPosition.y-initialPosition.y === pawnDirection) {
        //attacking upper right or bottom right corner
        if(this.tileIsOccupiedByOpponent(desiredPosition.x,desiredPosition.y,boardState,team)){
          return true; 
        }
      } 
    }
  return false;
  }
}