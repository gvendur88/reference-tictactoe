![alt text](https://github.com/gvendur88/reference-tictactoe/blob/master/atomlogo.png)

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
Given | When | Then
--- | --- | ---
*Game created, game joined* | *PlaceMove[0,0,X]* | *MovePlaced[0,0, X]*

------

Given | When | Then
--- | --- | ---
** | ** | **

## Here I end!

