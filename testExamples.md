![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/atomlogo.png) ![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/nodejslogo.png)

# Test Examples!

## Create game
Given | When | Then
--- | --- | ---
 | *Create game* | *Game created*



## Join game
### Trying to join a full game
Given | When | Then
--- | --- | ---
*Game joined* | *Join game* | *Game full, event triggered*

------

### Tying to join a non full game
Given | When | Then
--- | --- | ---
*Game created* | *Join game* | *Game joined*



## Place move
### Legal move by O
Given | When | Then
--- | --- | ---
*Game created, game joined* | *PlaceMove[0,0,O]* | *MovePlaced[0,0, O]*

------

### Illegal move by X
Given | When | Then
--- | --- | ---
*Game created, game joined, MovePlace[0,0,O]* | *PlaceMove[0,0,X]* | *MovePlaced[0,0, X]*

------

### Legal move by X
Given | When | Then
--- | --- | ---
*Game created, game joined, MovePlaced[0,0,O]* | *PlaceMove[0,X,0]* | *MovePlaced[0,X,O]*

------

### Hehe 2
Given | When | Then
--- | --- | ---
** | ** | **

------

### Hehe 3
Given | When | Then
--- | --- | ---
** | ** | **

------

### Hehe 4
Given | When | Then
--- | --- | ---
** | ** | **

------






Given | When | Then
--- | --- | ---
** | ** | **

## Here I end!

