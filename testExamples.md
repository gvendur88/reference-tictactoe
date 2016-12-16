![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/atomlogo.png) ![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/nodejslogo.png)

# Test Examples!

## Create Game Command
#### Trying to create a game
Given | When | Then
--- | --- | ---
 | *Create game* | *Game created event triggered*



## Join Game Command
#### Trying to join a non full game
Given | When | Then
--- | --- | ---
*Game created* | *Join game* | *Game joined event triggered*

------

#### Trying to join a full game
Given | When | Then
--- | --- | ---
*Game joined* | *Join game* | *FullGameJoinAttempted event triggered*



## Place Move Command
#### Legal move by X
Given | When | Then
--- | --- | ---
*Game created, Game joined* | *Place move X in pos 2* | *Move placed X in pos 2*

------

#### Illegal move by O
Given | When | Then
--- | --- | ---
*Game created, Game joined, Move placed X in pos 2* | *Place move O in pos 2* | *IllegalMove event triggered*

------

### Try to place move when it's not X's turn
Given | When | Then
--- | --- | ---
*Game created, Game joined, Move placed X in pos 2* | *Place move X in pos 0* | *NotYourMove event triggered*

------

#### Game won by X
Given | When | Then
--- | --- | ---
*Game created, Game joined, Move placed in board [X, X, null, O, O]* | *Place move X in pos 1* | *GameWon event triggered*

------

#### Game won on last move, Game draw not triggered
Given | When | Then
--- | --- | ---
*Game created, Game joined, Move placed in board [X, O, X, O, O, X, O, X, null]* | *Place move X in pos 8* | *GameWon event triggered*

------

#### Game draw
Given | When | Then
--- | --- | ---
*Game created, Game joined, Move placed in board [X, O, X, O, O, X, null, O, X]* | *Place move X in pos 6* | *GameDraw event triggered*

## Here I end!

