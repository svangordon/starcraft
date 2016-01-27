angular.module('app',[]);

angular.module('app')
	.controller('rankingsController', ['$scope', 'rankings', function ($scope,rankings) {

	}]);

angular.module('app')
	.controller('tableController', ['$scope', 'rankings', function($scope,rankings) {
		$scope.cols = rankings.rankings.cols;
		$scope.data = rankings.rankings.data;
		$scope.activePlayer = 0;
		$scope.incrementPage = function() {
			$scope.activePlayer += 20;
			$scope.activePlayer = Math.min(rankings.rankings.data.length-20, $scope.activePlayer) 
		}
		$scope.decrementPage = function() {
			$scope.activePlayer -= 20;
		}
		$scope.goToFirstPage = function() {
			$scope.activePlayer = 0;
		}
		$scope.goToLastPage = function() {
			$scope.activePlayer = rankings.rankings.data.length-20;
		}
		$scope.tableShow = true;
		//console.log($scope.activePlayer)
	}])

angular.module('app')
	.factory('rankings', [ function(){
		var rankings = rankingsJSON;
		var activePlayer = 0;
		return {
			rankings : rankings
		}
	}]);

angular.module('app')
	.filter('twentyPlayers', 'rankings', function(rankings){
		return function(input) {
			return input
		}
	})