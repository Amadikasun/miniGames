import { PlayerEnum } from "./enum";
import { Status } from "./gamestatus";





export class Gamelogic {
  
    static gameField: Array<number> = [];
    static currentTurn: PlayerEnum;
    static position: number;
    static gameStatus: Status;
  

 public constructor(){
    Gamelogic.gameStatus = Status.STOP;
    Gamelogic.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }

    static gameStop():void{
        this.gameStatus = Status.STOP;
    }

   static gameStart(): void{
        this.gameField = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.currentTurn = PlayerEnum.Player;
        this.gameStatus = Status.START;
    }

    static computerPickField(position: number, value: number): number{
        let stroke = Math.floor(Math.random() * 8);

        while(this.gameField[stroke] !== 0 && this.gameField.includes(0) === true){ // field must be clear!!
            stroke = Math.floor(Math.random() * 8);
        }
        position = stroke;
        this.gameField[position] = value;
        console.log(position, 'computer play'); // PROBLEM !! HOW CHANGE COLOR ON SCREEN !!
        return position
}

static checkPlayer(position: number): boolean{
    console.log(this.gameField, 'check Player')
    if (this.gameField[position] !== 0) return false;
    return true;
}

static setField(position: number, value: number): void {
    this.gameField[position] = value;
}


static getPlayerColor(): string{
    console.log(this.currentTurn, 'currentTurn');
    return (this.currentTurn === PlayerEnum.PC) ? 'computer' : 'player';
}


static changePlayer(player: PlayerEnum): number{
    this.currentTurn = player;
        console.log(this.currentTurn, 'new currentTurn');
        return this.currentTurn;
}

static computerPlay(): number {
    if (this.currentTurn !== PlayerEnum.PC) return Number.NaN;
    return this.computerPickField(this.position,this.currentTurn);
}


static async checkGameEnd(): Promise<boolean> {
    const isFull = !this.gameField.includes(0) ? true : false;

        if (isFull || this.wonLostLogic()) {
            this.gameStop();
            return true;
        }
        return false;
    }

    static wonLostLogic(): boolean{
   const X = this.currentTurn;

   if (this.gameField[0]===X && this.gameField[1]===X && this.gameField[2]===X 
    || this.gameField[3]===X && this.gameField[4]===X && this.gameField[5]===X 
    || this.gameField[6]===X && this.gameField[7]===X && this.gameField[8]===X 
    || this.gameField[0]===X && this.gameField[3]===X && this.gameField[6]===X 
    || this.gameField[1]===X && this.gameField[4]===X && this.gameField[7]===X 
    || this.gameField[2]===X && this.gameField[5]===X && this.gameField[8]===X 
    || this.gameField[0]===X && this.gameField[4]===X && this.gameField[8]===X 
    || this.gameField[2]===X && this.gameField[4]===X && this.gameField[6]===X) return  true;

   return false;
}


}
