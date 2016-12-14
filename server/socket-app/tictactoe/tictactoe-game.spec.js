'use strict'

let should = require('should');
let _ = require('lodash');
let TictactoeState = require('./tictactoe-state')(inject({}));
let tictactoe = require('./tictactoe-handler')(inject({ TictactoeState }));

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
			id:"123987",
			type: "CreateGame",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		};
		then = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'X'
		}];
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
		given = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		}];
		when = {
			type: "JoinGame",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		};
		then = [{
			type: "GameJoined",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'O'
		}];
	});

	it('should emit FullGameJoinAttempted event when game full', () => {
		given = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		}, {
			type: "GameJoined",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'O'
		}];
		when = {
			type: "JoinGame",
			user: { userName: "Siggi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:30:29"
		};
		then = [{
			type: "FullGameJoinAttempted",
			user: { userName: "Siggi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:30:29"
		}];
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
		given = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		}, {
			type: "GameJoined",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'O'
		}];
		when = {
			type: "PlaceMove",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:31:29",
			side: 'X',
			cellNumber: 2
		};
		then = [{
			type: "MovePlaced",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:31:29",
			side:'X',
			cellNumber: 2
		}];
	});

	it('should emit an illegal move', () => {
		given = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		}, {
			type: "GameJoined",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'O'
		}, {
			type: "MovePlaced",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:31:29",
			side: 'X',
			cellNumber: 2
		}];
		when = {
			type: "PlaceMove",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:32:29",
			side: 'O',
			cellNumber: 2
		};
		then = [{
			type: "IllegalMove",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:32:29",
			side:'O',
			cellNumber: 2
		}];
	});

	it('should emit not your move if trying to make a move out of turn', () => {
		given = [{
			type: "GameCreated",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29"
		}, {
			type: "GameJoined",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:29:29",
			side:'O'
		}, {
			type: "MovePlaced",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:31:29",
			side: 'X',
			cellNumber: 2
		}, {
			type: "IllegalMove",
			user: { userName: "Gummi" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:32:29",
			side:'O',
			cellNumber: 2
		}];
		when = {
			type: "PlaceMove",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:33:29",
			side: 'X',
			cellNumber: 0
		};
		then = [{
			type: "NotYourMove",
			user: { userName: "TheGuy" },
			name: "TheFirstGame",
			timeStamp: "2014-12-02T11:33:29",
			side:'X',
			cellNumber: 0
		}];
	});

});


