'use strict'

module.exports = (injected) => {
	const TictactoeState = injected('TictactoeState');

	return (history) => {

		let gameState = TictactoeState(history);

		return {
			executeCommand: (cmd, eventHandler) => {
				let cmdHandlers = {
					"CreateGame": (cmd) => {
						eventHandler([{
							gameId: cmd.gameId,
							type: "GameCreated",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							side:'X'
						}]);

					},
					"JoinGame": (cmd) => {
						if(gameState.gameFull()){
							eventHandler( [{
								gameId: cmd.gameId,
								type: "FullGameJoinAttempted",
								user: cmd.user,
								name: cmd.name,
								timeStamp: cmd.timeStamp
							}]);
							return;
						}

						eventHandler([{
							gameId: cmd.gameId,
							type: "GameJoined",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							side: 'O'
						}]);
					},
					"PlaceMove": (cmd) => {
						if(gameState.wrongPlayerTurn(cmd)) {
							eventHandler([{
								gameId: cmd.gameId,
								type: "NotYourMove",
								user: cmd.user,
								name: cmd.name,
								timeStamp: cmd.timeStamp,
								side: cmd.side,
								cellNumber: cmd.cellNumber
							}]);
							return;
						}
						
						if(gameState.cellOccupied(cmd)) {
							eventHandler([{
								gameId: cmd.gameId,
								type: "IllegalMove",
								user: cmd.user,
								name: cmd.name,
								timeStamp: cmd.timeStamp,
								side: cmd.side,
								cellNumber: cmd.cellNumber
							}]);
							return;
						}

						let events = [{
							gameId: cmd.gameId,
							type: "MovePlaced",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							side: cmd.side,
							cellNumber: cmd.cellNumber
						}];

						gameState.processEvents(events);

						if(gameState.isGameWon(cmd)) {
							events.push({
								gameId: cmd.gameId,
								type: "GameWon",
								user: cmd.user,
								name: cmd.name,
								timeStamp: cmd.timeStamp,
								side: cmd.side
							});
						}

						if(gameState.isGameDraw() && !gameState.isGameWon(cmd)) {
							events.push({
								gameId: cmd.gameId,
								type: "GameDraw",
								user: cmd.user,
								name: cmd.name,
								timeStamp: cmd.timeStamp,
								side: cmd.side
							});
						}

						eventHandler(events);
					}
				};

				if(!cmdHandlers[cmd.type]){
					throw new Error("I do not handle command of type " + cmd.type)
				}
				cmdHandlers[cmd.type](cmd);
			}
		}
	}
};

