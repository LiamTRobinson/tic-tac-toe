$(function() {

	function GameState(gameBoard, player, startingPlayer) {
		this.gameBoard = gameBoard;
		this.currentTurn = player;
		this.startingPlayer = startingPlayer;
	}

	const CurrentGame = {
		gameState: new GameState([[0,0,0],[0,0,0],[0,0,0]], 1, 1),
		active: false,
		previousStates: [],
		updateBoard: function(xPosition, yPosition) {
			this.gameState.gameBoard[yPosition][xPosition] = this.gameState.currentTurn;
		},
		updatePlayer: function() {
			if (this.gameState.currentTurn === 1) {
				this.gameState.currentTurn = 2;
			}
			else {
				this.gameState.currentTurn = 1;
			}
		},
		newGame: function() {
			this.gameState = new GameState([[0,0,0],[0,0,0],[0,0,0]], 1, 1);
			this.active = true;
			console.log(this.active);
			this.previousStates = [];
		},
		endGame: function() {
			this.active = false;
		}
	}

	const SavedGames = [];

	const ViewControl = {
		updateCells: function() {
			$(".cell").removeClass("player-1");
			$(".cell").removeClass("player-2");
			$(".cell").removeClass("player-0");
			CurrentGame.gameState.gameBoard.forEach(function(row, index1) {
				row.forEach(function(cell, index2) {
					$(`#${index1}-${index2}`).addClass(`player-${cell}`);
				});
			});
		}
	}

	const GameLogic = {
		checkRows: function() {
			CurrentGame.gameState.gameBoard.forEach(function(row) {
				if (row[0] !== 0 && row[0] === row[1] && row[0] === row[2]) {
					alert("winner row");
					CurrentGame.endGame();
				}
			});
		},
		checkColumns: function() {
			CurrentGame.gameState.gameBoard[0].forEach(function(cell, index) {
				if (cell !== 0 && CurrentGame.gameState.gameBoard[1][index] === cell && CurrentGame.gameState.gameBoard[2][index] === cell) {
					alert("winner column");
					CurrentGame.endGame();
				}
			});
		},
		checkDiagonals: function() {
			let gameBoard = CurrentGame.gameState.gameBoard
			if (gameBoard[1][1] !== 0) {
				if ((gameBoard[1][1] === gameBoard[0][0] && gameBoard[1][1] === gameBoard[2][2]) || (gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] === gameBoard[2][0])) {
					alert("winner diagonal");
					CurrentGame.endGame();
				}
			}
		}
	}

	$(".cell").on("click", function() {
		if ($(this).attr("class").includes("0") && CurrentGame.active === true) {
			let yPosition = $(this).attr("id").slice(0,1);
			let xPosition = $(this).attr("id").slice(2);
			CurrentGame.updateBoard(xPosition, yPosition);
			CurrentGame.updatePlayer();
			ViewControl.updateCells();
			GameLogic.checkRows();
			GameLogic.checkColumns();
			GameLogic.checkDiagonals();
		}
	});
	$("#new-game-button").on("click", function() {
		CurrentGame.newGame();
		ViewControl.updateCells();
	});
});