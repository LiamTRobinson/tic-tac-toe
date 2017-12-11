$(function() {

	const CurrentGame = {
		gameState: {
			gameBoard: [[0,0,0],[0,0,0],[0,0,0]],
			startingPlayer: "X",
			currentTurn: "X"
		},
		active: false,
		previousStates: [],
		updateBoard: function(xPosition, yPosition) {
			this.gameState.gameBoard[yPosition][xPosition] = this.gameState.currentTurn;
		},
		updatePlayer: function() {
			if (this.gameState.currentTurn === "X") {
				this.gameState.currentTurn = "O";
			}
			else {
				this.gameState.currentTurn = "X";
			}
		},
		newGame: function() {
			this.gameState = {
				gameBoard: [[0,0,0],[0,0,0],[0,0,0]],
				startingPlayer: "X",
				currentTurn: "X"
			};
			this.active = true;
			this.previousStates = [];
		},
		endGame: function() {
			this.active = false;
		},
		storeState: function() {
			this.previousStates.push($.extend(true, {}, this.gameState));
		},
		undo: function() {
			this.gameState = this.previousStates.pop();
		}
	};

	const SavedGames = [];

	const ViewControl = {
		updateCells: function() {
			$(".cell").removeClass("player-X");
			$(".cell").removeClass("player-O");
			$(".cell").removeClass("player-0");
			CurrentGame.gameState.gameBoard.forEach(function(row, index1) {
				row.forEach(function(cell, index2) {
					$(`#${index1}-${index2}`).addClass(`player-${cell}`);
				});
			});
		},
		updateCurrentPlayer: function() {
			$("#current-player").html(CurrentGame.gameState.currentTurn);
		},
		toggleModal: function(message) {
			let modal = $("#game-end-modal");
			if (modal.attr("class") === "active") {
				modal.removeClass("active");
			} else {
				modal.addClass("active");
				$("#modal-content").html(message);
			}
		}
	};

	const GameLogic = {
		checkRows: function() {
			CurrentGame.gameState.gameBoard.forEach(function(row) {
				if (row[0] !== 0 && row[0] === row[1] && row[0] === row[2]) {
					CurrentGame.endGame();
					ViewControl.toggleModal(`${CurrentGame.gameState.currentTurn} WINS!`);
				}
			});
		},
		checkColumns: function() {
			CurrentGame.gameState.gameBoard[0].forEach(function(cell, index) {
				if (cell !== 0 && CurrentGame.gameState.gameBoard[1][index] === cell && CurrentGame.gameState.gameBoard[2][index] === cell) {
					CurrentGame.endGame();
					ViewControl.toggleModal(`${CurrentGame.gameState.currentTurn} WINS!`);
				}
			});
		},
		checkDiagonals: function() {
			let gameBoard = CurrentGame.gameState.gameBoard
			if (gameBoard[1][1] !== 0) {
				if ((gameBoard[1][1] === gameBoard[0][0] && gameBoard[1][1] === gameBoard[2][2]) || (gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] === gameBoard[2][0])) {
					CurrentGame.endGame();
					ViewControl.toggleModal(`${CurrentGame.gameState.currentTurn} WINS!`);
				}
			}
		},
		checkForFill: function() {
			let flattenedBoard = [].concat.apply([], CurrentGame.gameState.gameBoard);
			if (CurrentGame.active && !flattenedBoard.includes(0)) {
				CurrentGame.endGame();
				ViewControl.toggleModal("Cat's Game!");
			}
		}
	};

	$(".cell").on("click", function() {
		if ($(this).attr("class").includes("0") && CurrentGame.active) {
			let yPosition = $(this).attr("id").slice(0,1);
			let xPosition = $(this).attr("id").slice(2);
			CurrentGame.storeState();
			CurrentGame.updateBoard(xPosition, yPosition);
			ViewControl.updateCells();
			ViewControl.updateCurrentPlayer();
			GameLogic.checkRows();
			GameLogic.checkColumns();
			GameLogic.checkDiagonals();
			GameLogic.checkForFill();
			CurrentGame.updatePlayer();
		}
	});
	$("#new-game-button").on("click", function() {
		CurrentGame.newGame();
		ViewControl.updateCells();
		ViewControl.updateCurrentPlayer();
	});
	$("#undo-button").on("click", function() {
		if (CurrentGame.active && CurrentGame.previousStates.length > 0) {
			CurrentGame.undo();
			ViewControl.updateCells();
			ViewControl.updateCurrentPlayer();
		}
	});
	$("#modal-button").on("click", function() {
		ViewControl.toggleModal();
	});
});