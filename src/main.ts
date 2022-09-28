import { PlayerEnum } from './enum';
import { Gamelogic } from './gamelogic';

//START
let gameStartButton = document.querySelector<HTMLElement>('.startGame') 
gameStartButton!.addEventListener('click', startGame)

//RESET
let gameResetButton = document.querySelector<HTMLElement>('.resetGame')
gameResetButton!.addEventListener('click', resetGame)

let gameFieldCSS = document.querySelector<HTMLElement>('.gamefield')

let gameBoard = document.querySelector<HTMLElement>('.gameboard')

 let subfields = document.querySelectorAll ('.subfield')


 // !!!
 //computerFields: boolean[] = new Array(9).fill(false);





function startGame(){
console.log('start')
Gamelogic.gameStart()
Gamelogic.changePlayer(PlayerEnum.Player)
let information = document.querySelector(".currentStatus");
information!.textContent = ' ';

  gameStartButton!.style.visibility = "hidden";
  gameFieldCSS!.style.visibility = "visible";
  gameResetButton!.style.visibility = "visible";

  subfields.forEach(subfield => subfield.addEventListener("click",clickSubfield))
}

function resetGame(){
  Gamelogic.gameStop();
// redo the array with colors 
// this.computerFields = new Array(9).fill(false);
   gameStartButton!.style.visibility = "visible";
   gameFieldCSS!.style.visibility = "hidden";
   gameResetButton!.style.visibility = "hidden";
   console.log('reset')


   const information = document.querySelector(".currentStatus");
   const currentPlayer = 'Click on the button for the start GAME!'
   information!.textContent = currentPlayer;


   
  }



 async function clickSubfield(subfield: any ): Promise<void> {
    // if(this.gameStopped) return;
    const information = document.querySelector(".currentStatus"); 
    const position = subfield.currentTarget.getAttribute('position');
    console.log(position)

     gameBoard = subfield.currentTarget.parentElement.parentElement;

    if (Gamelogic.checkPlayer(position)){ // checks if the player does not want to overwrite the field

      Gamelogic.setField(position, Gamelogic.currentTurn); // set this field owns player
      const color = Gamelogic.getPlayerColor();
      subfield.currentTarget.classList.add(color); //color background

      if (await Gamelogic.checkGameEnd()){
        information!.textContent = getEndGameMessage();
          stopGame();
          return;
      }
      
      Gamelogic.changePlayer(PlayerEnum.PC);
       const positionComputer = Gamelogic.computerPlay();
       //this.computerFields[positionComputer] = true;
    } else {
      information!.textContent = getInvalidFieldMessage();
    }

    if (await Gamelogic.checkGameEnd()) {
      information!.textContent = getEndGameMessage();
    }
    Gamelogic.changePlayer(PlayerEnum.Player);
    return ;
    
   }

  

function  getEndGameMessage(): string {
    if (!Gamelogic.wonLostLogic()) return 'Nobody won, Nobody lost!?';
    return Gamelogic.currentTurn === PlayerEnum.Player ? 'Winner is Player' : 'Winner is Computer';
  }

 function getInvalidFieldMessage() {
    const sentences = [
      'This is my field!',
      `No, you can't do this!`,
      'Let my field alone, pick another!'
    ]
    const sence = Math.floor(Math.random() * 3);
    return sentences[sence];
  }

 function stopGame(){
    Gamelogic.gameStart();
  }

