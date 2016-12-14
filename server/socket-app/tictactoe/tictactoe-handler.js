
module.exports = function(injected){
	var TictactoeState = injected('TictactoeState');

	return function(history){

		var gameState = TictactoeState(history);

		return {
			executeCommand: function(cmd, eventHandler){
				var cmdHandlers = {
					"CreateGame": function (cmd) {
						eventHandler([{
							gameId: cmd.gameId,
							type: "GameCreated",
							user: cmd.user,
							name: cmd.name,
							timeStamp: cmd.timeStamp,
							side:'X'
						}]);

					},
					"JoinGame": function (cmd) {
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
					"PlaceMove": function(cmd){
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

						// Check here for conditions which prevent command from altering state

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

						// Check here for conditions which may warrant additional events to be emitted.
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

