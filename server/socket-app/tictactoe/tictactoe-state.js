var _ = require('lodash');

let boardState = [];
let playerTurn = 0;

module.exports = function (injected) {

	return function (history) {

		let gamefull = false;
		//let celloccupied = false;
		//let xmoved   = false;
		//let omoved   = false;

		// Table elements in the tictactoe board	

		function processEvent(event) {
			console.log(event.type);
			console.log(event.user);
			console.log(event.side);
			console.log(event.cellNumber);
			if(event.type === "GameJoined") {
				gamefull = true;
			}
			/*if(event.type === "MovePlaced") {
				return true;	
			}*/
			if(event.type === "MovePlaced") {
				if(event.side === "X") {
					console.log("I was an X");
					playerTurn = 1;
					boardState[event.cellNumber] = event.side;
					console.log(boardState);
					//xmoved = true;
				} else {
					console.log("I was an O");
					playerTurn = 0;
					boardState[event.cellNumber] = event.side;
					console.log(boardState);
				}
			}
			console.debug("event", event);
		}

		function processEvents(history) {
			_.each(history, processEvent);
		}

		function gameFull() {
			return gamefull;
		}

		function cellOccupied(event) {
			console.log("Hello I am here");
			if(boardState[event.cellNumber] === 'X'	|| boardState[event.cellNumber] === 'O') {
				console.log("This is what is in the board at spot 2: " + boardState[event.cellNumber]);
				console.log("I'm true");
				return true;
			} else {
				console.log("What is the Cell nubemr now? " + event.cellNumber);
				console.log("This is what is in the board at spot 2: " + boardState[event.cellNumber]);
				console.log("I'm false");
				return false;
			}
		}

		function wrongPlayerTurn(event) {
			if((event.side === 'X' && playerTurn === 1) || (event.side === 'O' && playerTurn === 0)) {
				return true;
			}	else {
				return false;
			}
		}

		processEvents(history);

		return {	
			gameFull: gameFull,
			processEvents: processEvents,
			cellOccupied: cellOccupied,
			wrongPlayerTurn: wrongPlayerTurn
		}
	};
};
