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

		function isGameWon(event) {
			/*if((boardState[0, 1, 2] || boardState[3, 4, 5] || boardState[6, 7, 8] || boardState[0, 3, 6] || boardState[1, 4, 7] || boardState[2, 5, 8] || boardState[0, 4, 8] || boardState[2, 4, 6]) === (['X', 'X', 'X'] || ['O', 'O', 'O'])) {
				console.log("I'm true!");
				return true;
			} else {
				console.log("I'm false!");
				return false;
			}*/
			if((boardState[0] === boardState[1]) && (boardState[0] === boardState[2]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[3] === boardState[4]) && (boardState[3] === boardState[5]) && (boardState[3] === ('X' || 'O'))
					|| (boardState[6] === boardState[7]) && (boardState[6] === boardState[8]) && (boardState[6] === ('X' || 'O'))
					|| (boardState[0] === boardState[3]) && (boardState[0] === boardState[6]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[1] === boardState[4]) && (boardState[1] === boardState[7]) && (boardState[1] === ('X' || 'O'))
					|| (boardState[2] === boardState[5]) && (boardState[2] === boardState[8]) && (boardState[2] === ('X' || 'O'))
					|| (boardState[0] === boardState[4]) && (boardState[0] === boardState[8]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[2] === boardState[4]) && (boardState[2] === boardState[6]) && (boardState[2] === ('X' || 'O'))) {
				console.log("I'm True!");
				return true;
			} else {
				console.log("I'm False!");
				return false;
			}
		}

		processEvents(history);

		return {	
			gameFull: gameFull,
			processEvents: processEvents,
			cellOccupied: cellOccupied,
			wrongPlayerTurn: wrongPlayerTurn,
			isGameWon: isGameWon
		}
	};
};
