$(function() {

	function GameState() {
		this.gameBoard = [[0,0,0],[0,0,0],[0,0,0]];
		this.currentTurn = Number;
	}

	const CurrentGame = {
		gameState: [[0,0,0],[0,0,0],[0,0,0]],
		previousStates: []
	}

	const ViewControl = {
		updateView: function() {

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