![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/atomlogo.png) ![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/nodejslogo.png)

# Test Examples!

## Create Game Command
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
#### Legal move by O
Given | When | Then
--- | --- | ---
*Game created, game joined* | *PlaceMove[0.0,0.0,0.O]* | *MovePlaced[0.0,0.0,0.O]*

------

#### Illegal move by X
Given | When | Then
--- | --- | ---
*Game created, game joined, MovePlaced[0.0,0.0,0.O]* | *PlaceMove[0.0,0.0,0.X]* | *IllegalMove event triggered*

------

### Try to place move when it's not X's turn
Given | When | Then
--- | --- | ---
*MovePlaced[0.0,0.0,0.O]* | *PlaceMove[0.0,0.O,0.O]* | *NotYourMove event triggered*

------

#### Game won by O
Given | When | Then
--- | --- | ---
*MovePlaced[0.0,1.O,2.O]* | *PlaceMove[0.O,1.O,2.O]* | *GameWon event triggered*

------

#### Hehe 4
Given | When | Then
--- | --- | ---
** | ** | **

------






Given | When | Then
--- | --- | ---
** | ** | **

## Here I end!

