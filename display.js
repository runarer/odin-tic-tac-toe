    const displayHandling = ( function () {
        const startButton = document.querySelector("#start");
        startButton.addEventListener("click",resetBoard)
        
        const announcementOne = document.querySelector("#announcement-one");
        const announcementTwo = document.querySelector("#announcement-two");
        
        const nameOne = document.querySelector("#name-one");
        nameOne.addEventListener("focus", nameOne.select);
        nameOne.addEventListener("keydown",keydown); // For handling enter
        nameOne.addEventListener("focusout", updateName);

        const nameTwo = document.querySelector("#name-two");
        nameTwo.addEventListener("focus", nameTwo.select);
        nameTwo.addEventListener("keydown",keydown); // For handling enter
        nameTwo.addEventListener("focusout", updateName);

        function keydown(event) {
            if(event.keyCode === 13) {
                event.target.blur();
            }
        }

        function updateName(event) {
            if(event.target.id === "name-one") {
                Game.playerOne.name = event.target.value;
            } else {
                Game.playerTwo.name = event.target.value;
            }
        }

        const gameSquares = document.querySelectorAll(".game-square");
        // We need to prevent events from 'div' childeren to bubble up. Therefore the 'if' statment.
        gameSquares.forEach( (item) => item.addEventListener("click", (event) => {
                if(event.currentTarget === event.target)
                    clickSquare(event.target);
            } ),false);

        

        function clickSquare(element) {
            // If no class other than .game-square is present we can draw a symbol.
            // The Game.play can be called without the check as the game ignores click
            // on taken squares.
            if (element.classList.length < 2) {
                const move = Game.play(element.id);
                if(Game.getPrevPlayer().symbol === "circle") {
                    drawCircle(element);
                } else if (Game.getPrevPlayer().symbol === "cross") {
                    drawCross(element);
                }

                if (move.status === "tie") {
                    showTie();
                } else if (move.status === "winner") {
                    showVictory(move.name,move.winningRow);
                } else if (move.status === "next") {
                    showNextPlayer(Game.getCurrentPlayer().name)
                }
            }            
        }

        function drawCircle(element) {
            element.classList.add("circle")
        }

        function drawCross(element) {            
            element.classList.add("cross")

            const back = document.createElement("div");
            back.classList.add("back-cross");
            element.appendChild(back);

            const front = document.createElement("div");
            front.classList.add("front-cross");
            element.appendChild(front);

            const patch = document.createElement("div");
            patch.classList.add("patch");
            element.appendChild(patch);
        }

        function showVictory(winner,winningRow) {
            // I add a class to every square on victory, blocking any more plays.
            gameSquares.forEach( (square) => square.classList.add( (winningRow.includes(parseInt(square.id))) ? "winning-square" : "non-winning-square" ) );
            
            // Announce winner
            const playerOne = document.querySelector("#name-one");
            if(playerOne.value === winner) {
                announcementOne.textContent = "Winner";
            } else {
                announcementTwo.textContent = "Winner";
            }
        }

        function showTie() {
            announcementOne.textContent = "Tie";
            announcementTwo.textContent = "Tie";
        }

        function showNextPlayer(player) {
            console.log(`Next: ${player}`);
        }

        function resetBoard() {
            const gameSquares = document.querySelectorAll(".game-square");
            
            // Since I use two diffrent methods for creating symbold, 
            // I need to remove class and 'div' children.
            gameSquares.forEach( (item) => { item.classList = ["game-square"]; item.replaceChildren(); });

            // Clear announcements
            announcementOne.textContent = "";
            announcementTwo.textContent = "";

            Game.resetGame();
        }
    })();