import { PieceType, TeamType } from "../components/Chessboard/Chessboard";

export default class Referee {
  isValidMove(px: number, py:number, x:number, y:number, type: PieceType, team: TeamType ) {

    if (type === PieceType.PAWN) {
      if(team === TeamType.WHITE) {
        if(py === 1) {
          if (px === x && (y-py === 1 || y-py === 2)) {
            console.log("Valid move!");
            return true;
          }
        } else {
          if(px === x && y-py === 1) {
            return true;
          }
        }
      }
    }
    return false;
  }
}