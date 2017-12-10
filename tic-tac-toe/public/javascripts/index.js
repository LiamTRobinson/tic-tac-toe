$(function() {

	function GameState(gameBoard, player) {
		this.gameBoard = gameBoard;
		this.currentTurn = player;
	}

	const CurrentGame = {
		gameState: new GameState([[0,0,0],[0,0,0],[0,0,0]], 1),
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

		},
		checkColumns: function() {

		},
		checkDiagonals: function() {

		}
	}
});