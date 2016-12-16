'use strict'

let should = require('should');
let _ = require('lodash');
let TictactoeState = require('./tictactoe-state')(inject({}));
let tictactoe = require('./tictactoe-handler')(inject({ TictactoeState }));

let gameCreatedTheGuy = {
			type: 'GameCreated',
			user: { userName: 'TheGuy' },
			name: 'TheFirstGame',
			timeStamp: '2014-12-02T11:29:29',
			side: 'X'
		};

let gameJoinedGummi = {
			type: 'GameJoined',
			user: { userName: 'Gummi' },
			name: 'TheFirstGame',
			timeStamp: '2014-12-02T11:29:29',
			side: 'O'
		}

let gameWonTheGuy = {
			type: 'GameWon',
			user: { userName: 'TheGuy' },
			name: 'TheFirstGame',
			timeStamp: '2014-12-02T11:35:29',
			side: 'X'
		}

function playerJoinsAGame(type, username, gameName, timestamp) {
	return {
			type: type ? type : 'JoinGame',
			user: { userName: username ? username : 'Gummi' },
			name: gameName ? gameName : 'TheFirstGame',
			timeStamp: timestamp ? timestamp : '2014-12-02T11:29:29'
		}
}

// Could had combined the two functions below but then they
// wouldn't be as describing.

function playerPlaceAMove(type, username, gameName, timestamp, playerSide, cell) {
	return {
			type: type ? type : 'PlaceMove',
			user: { userName: username ? username : 'TheGuy'},
			name: gameName ? gameName : 'TheFirstGame',
			timeStamp: timestamp ? timestamp : '2014-12-02T11:31:29',
			side: playerSide ? playerSide : 'X',
			cellNumber: cell
		}
};

function playerMadeAMove(type, username, gameName, timestamp, playerSide, cell) {
	return {
			type: type ? type : 'MovePlaced',
			user: { userName: username ? username : 'Gummi' },
			name: gameName ? gameName : 'TheFirstGame',
			timeStamp: timestamp ? timestamp : '2014-12-02T11:31:29',
			side: playerSide ? playerSide : 'O',
			cellNumber: cell
		}
};

describe('Create game command', () => {
	let given, when, then;

	beforeEach(() => {
		given = undefined;
		when  = undefined;
		then  = undefined;
	});

	afterEach(() => {
		tictactoe(given).executeCommand(when, (actualEvents) => {
			should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
		});
	});

	it('should emit game created event', () => {
		given = [];
		when = {
			id:'123987',
			type: 'CreateGame',
			user: { userName: 'TheGuy' },
			name: 'TheFirstGame',
			timeStamp: '2014-12-02T11:29:29'
		};
		then = [ gameCreatedTheGuy ];
	})
});


describe('Join game command', () => {
	let given, when, then;

	beforeEach(() => {
		given = undefined;
		when  = undefined;
		then  = undefined;
	});

	afterEach(() => {
		tictactoe(given).executeCommand(when, (actualEvents) => {
			should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
		});
	});

	it('should emit game joined event', () => {
		given = [ gameCreatedTheGuy ];
		when  = playerJoinsAGame(null, null, null, null);
		then  = [ gameJoinedGummi ];
	});

	it('should emit FullGameJoinAttempted event when game full', () => {
		given = [ gameCreatedTheGuy ,gameJoinedGummi ];
		when = playerJoinsAGame(null, 'Siggi', null, '2014-12-02T11:30:29');
		then = [ playerJoinsAGame('FullGameJoinAttempted', 'Siggi', null, '2014-12-02T11:30:29') ];
	});
});

describe('Place move in game command', () => {
	let given, when, then;

	beforeEach(() => {
		given = undefined;
		when  = undefined;
		then  = undefined;
	});

	afterEach(() => {
		tictactoe(given).executeCommand(when, (actualEvents) => {
			should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
		});
	});

	it('should emit move placed on first move', () => {
		given = [ gameCreatedTheGuy ,gameJoinedGummi ];
		when  = playerPlaceAMove(null, null, null, null, null, 2);
		then  = [ playerMadeAMove(null, 'TheGuy', null, null, 'X', 2) ];
	});

	it('should emit an illegal move', () => {
		given = [ gameCreatedTheGuy, gameJoinedGummi , playerMadeAMove(null, 'TheGuy', null, null, 'X', 2) ];
		when  = playerPlaceAMove(null, 'Gummi', null, '2014-12-02T11:32:29', 'O', 2);
		then  = [ playerMadeAMove('IllegalMove', null, null, '2014-12-02T11:32:29', null, 2) ];
	});

	it('should emit not your move if trying to make a move out of turn', () => {
		given = [ gameCreatedTheGuy, gameJoinedGummi, playerMadeAMove(null, 'TheGuy', null, null, 'X', 2) ];
		when  = playerPlaceAMove(null, null, null, '2014-12-02T11:33:29', null, 0);
		then  = [ playerMadeAMove('NotYourMove', 'TheGuy', null, '2014-12-02T11:33:29', 'X', 0) ];
	});

	it('should emit game won if the game was won', () => {
		given = [ gameCreatedTheGuy, gameJoinedGummi,
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 2),
							playerMadeAMove(null, null, null, null, null, 4),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 0), 
							playerMadeAMove(null, null, null, null, null, 3) ];
		when  = playerPlaceAMove(null, null, null, '2014-12-02T11:35:29', null, 1);
		then  = [ playerMadeAMove(null, 'TheGuy', null, '2014-12-02T11:35:29', 'X', 1), gameWonTheGuy ];
	});

	it('should not emit game draw if game was won on last move', () => {
		given = [ gameCreatedTheGuy, gameJoinedGummi,
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 2),
							playerMadeAMove(null, null, null, null, null, 4),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 0), 
							playerMadeAMove(null, null, null, null, null, 3),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 5),
							playerMadeAMove(null, null, null, null, null, 1),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 7), 
							playerMadeAMove(null, null, null, null, null, 6) ];
		when = playerPlaceAMove(null, null, null, '2014-12-02T11:35:29', null, 8);
		then = [ playerMadeAMove(null, 'TheGuy', null, '2014-12-02T11:35:29', 'X', 8), gameWonTheGuy ];
	});

	it('should emit game draw if neither wins', () => {
		given = [ gameCreatedTheGuy, gameJoinedGummi, 
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 2),
							playerMadeAMove(null, null, null, null, null, 4),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 0), 
							playerMadeAMove(null, null, null, null, null, 3),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 5),
							playerMadeAMove(null, null, null, null, null, 1),
							playerMadeAMove(null, 'TheGuy', null, null, 'X', 7), 
							playerMadeAMove(null, null, null, null, null, 8) ];
		when = playerPlaceAMove(null, null, null, '2014-12-02T11:39:29', null, 6);
		then = [ playerMadeAMove(null, 'TheGuy', null, '2014-12-02T11:39:29', 'X', 6), {
			type: 'GameDraw',
			user: { userName: 'TheGuy' },
			name: 'TheFirstGame',
			timeStamp: '2014-12-02T11:39:29',
			side: 'X'
		}];
	});

});


