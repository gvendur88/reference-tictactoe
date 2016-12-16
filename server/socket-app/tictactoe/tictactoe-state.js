'use strict'

const _ = require('lodash');

module.exports = (injected) => {
	return (history) => {

		let gamefull = false;
		let boardState = [];
		let playerTurn = 0;
		let turnsPlayed = 0;

		function processEvent(event) {
			if(event.type === "GameJoined") {
				gamefull = true;
			}
			if(event.type === "MovePlaced") {
				if(event.side === "X") {
					playerTurn = 1;
					turnsPlayed++;
					boardState[event.cellNumber] = event.side;
				} else {
					playerTurn = 0;
					turnsPlayed++;
					boardState[event.cellNumber] = event.side;
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
			if(boardState[event.cellNumber] === 'X'	|| boardState[event.cellNumber] === 'O') {
				return true;
			} else {
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
			if((boardState[0] === boardState[1]) && (boardState[0] === boardState[2]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[3] === boardState[4]) && (boardState[3] === boardState[5]) && (boardState[3] === ('X' || 'O'))
					|| (boardState[6] === boardState[7]) && (boardState[6] === boardState[8]) && (boardState[6] === ('X' || 'O'))
					|| (boardState[0] === boardState[3]) && (boardState[0] === boardState[6]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[1] === boardState[4]) && (boardState[1] === boardState[7]) && (boardState[1] === ('X' || 'O'))
					|| (boardState[2] === boardState[5]) && (boardState[2] === boardState[8]) && (boardState[2] === ('X' || 'O'))
					|| (boardState[0] === boardState[4]) && (boardState[0] === boardState[8]) && (boardState[0] === ('X' || 'O'))
					|| (boardState[2] === boardState[4]) && (boardState[2] === boardState[6]) && (boardState[2] === ('X' || 'O'))) {
				return true;
			} else {
				return false;
			}
		}

		function isGameDraw() {
			if(turnsPlayed === 9) {
				return true;
			} else {
				return false;
			}
		}

		processEvents(history);

		return {	
			gameFull: gameFull,
			cellOccupied: cellOccupied,
			wrongPlayerTurn: wrongPlayerTurn,
			isGameWon: isGameWon,
			isGameDraw: isGameDraw,
			processEvents: processEvents
		}
	};
};
