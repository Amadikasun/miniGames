import { PlayerEnum } from './enum';
import { Gamelogic } from './gamelogic';
import { Status } from './gamestatus';

const gameStartButton = document.querySelector<HTMLElement>('.startGame');
if (gameStartButton) {
  gameStartButton.addEventListener('click', startGame)
}

const gameResetButton = document.querySelector<HTMLElement>('.resetGame');
if (gameResetButton) {
  gameResetButton.addEventListener('click', resetGame)
}

const gameFieldCSS = document.querySelector<HTMLElement>('.gamefield');

const information = document.querySelector(".currentStatus");

const subfields = document.querySelectorAll('.subfield')
// !!!
let computerFields: boolean[] = new Array(9).fill(false);

let gameLogic: Gamelogic; 

function startGame(){
  // Initialize the business logic class
  gameLogic = new Gamelogic();

  console.log('start')
  // Start the game!
  gameLogic.gameStart()
  gameLogic.changePlayer(PlayerEnum.Player)


  gameStartButton!.style.display = "none";
  gameFieldCSS!.style.visibility = "visible";
  gameResetButton!.style.visibility = "visible";

  subfields.forEach(subfield => subfield.addEventListener("click",clickSubfield))
}

function resetGame () {
  gameLogic.gameStop();
// redo the array with colors 
  subfields.forEach((x) => {
    x.classList.remove('player');
    x.classList.remove('computer');
  });
  computerFields = new Array(9).fill(false);
   gameStartButton!.style.display = "block";
   gameFieldCSS!.style.visibility = "hidden";
   gameResetButton!.style.visibility = "hidden";
   console.log('reset')

   const currentPlayer = 'Click on the button for the start GAME!'
   
   notifyUser(currentPlayer);
}

 async function clickSubfield(subfield: any ): Promise<void> {
    if (gameLogic.gameStatus === Status.STOP)  return;

    const position = subfield.currentTarget.getAttribute('position');
    console.log(position, 'pos');

    // checks if the player does not want to overwrite the field
    if (gameLogic.checkPlayer(position)){ 

      gameLogic.setField(position, gameLogic.currentTurn); // set this field owns player
      const color = gameLogic.getPlayerColor();
      subfield.currentTarget.classList.add(color); //color background

      if (await gameLogic.checkGameEnd()){
        notifyUser(getEndGameMessage());
          stopGame();
          return;
      }

      await pcMove();
    } else {
      notifyUser(getInvalidFieldMessage());
    }

    if (await gameLogic.checkGameEnd()) {
      notifyUser(getEndGameMessage());
    }
    gameLogic.changePlayer(PlayerEnum.Player);
    return ;
    
   }


const pcMove = async (): Promise<void> => {
  gameLogic.changePlayer(PlayerEnum.PC);
  const positionComputer = gameLogic.computerPlay();
  computerFields[positionComputer] = true;

  const subfiled = document.querySelector(`.subfield[position="${positionComputer}"]`)
  if (!subfiled) return;
  subfiled.classList.add(gameLogic.getPlayerColor());
};

const notifyUser = (message: string): boolean => {
  if (!message || !information) return false;

  information.textContent = message;
  return true;
};
  

function getEndGameMessage(): string {
  const t = gameLogic.wonLostLogic();
  console.log(t, 'tt????');
    if (!t) return 'Nobody won, Nobody lost!?';
    return gameLogic.currentTurn === PlayerEnum.Player ? 'Winner is Player' : 'Winner is Computer';
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
    gameLogic.gameStop();
  }

