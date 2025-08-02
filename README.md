# odin-tic-tac-toe
The Odin Project: Tic-Tac-Toe


I didn't add a start button, as it seems unnessesary. The game is ready to 
be played when the page is loaded.

# TODO (no order):
- [X] Draw circle function
- [X] Draw cross function
- [X] Reset game board function

- [X] Basic game functionality
- [X] Basic input
- [X] Restart game button, place under game board.
- [ ] Color scheme, make CSS variables (or properties)
- [X] Font, something playfull/gamelike, but not comic sans.
- [X] Victory; display something
- [X] Victory; highlight three squares
- [ ] Victory; highlight player name. Some fancy gold shadow or something.
- [ ] Create a trophy in SVG
- [ ] Animate click and symbol.

- [ ] Highlight current player
- [ ] Display score for each player
- [X] Dialog for changing name -> Input instead.
- [ ] A way to switch symbol. Totally unnessesery but I have an ide I like to 
      try.

- [ ] Layout for mobile devices. Horizontal and vertical.

A cool idea would be to show a connection between the 3 in a row winning squares.
This can be done with first replacing the gap in the grid with 'div's. Making the grid
a 5x5. The divs between the square gets their heigth and width from previous gap size and
var(--square-side). Inside the divs there are another div that will have a different class
after victory, with a background color. This will create a connection. This div will be 
rotated for the four small divs around the center square.
