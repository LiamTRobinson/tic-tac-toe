$(function() {

	function GameState(gameBoard, player) {
		this.gameBoard = gameBoard;
		this.currentTurn = player;
	}

	const CurrentGame = {
		gameState: new GameState([[0,0,0],[0,0,0],[0,0,0]], 1),
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
		previousStates: []
	}

	const ViewControl = {
		updateView: function() {
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
				}
			});
		},
		checkColumns: function() {
			CurrentGame.gameState.gameBoard[0].forEach(function(cell, index) {
				if (cell !== 0 && CurrentGame.gameState.gameBoard[1][index] === cell && CurrentGame.gameState.gameBoard[2][index] === cell) {
					alert("winner column");
				}
			});
		},
		checkDiagonals: function() {
			let gameBoard = CurrentGame.gameState.gameBoard
			if (gameBoard[1][1] !== 0) {
				if ((gameBoard[1][1] === gameBoard[0][0] && gameBoard[1][1] === gameBoard[2][2]) || (gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] === gameBoard[2][0])) {
					alert("winner diagonal")
				}
			}
		}
	}

	$(".cell").on("click", function() {
		if ($(this).attr("class").includes("0")) {
			let yPosition = $(this).attr("id").slice(0,1);
			let xPosition = $(this).attr("id").slice(2);
			CurrentGame.updateBoard(xPosition, yPosition);
			CurrentGame.updatePlayer();
			ViewControl.updateView();
			GameLogic.checkRows();
			GameLogic.checkColumns();
			GameLogic.checkDiagonals();
		}
	});
});