angular.module('app',[]);

angular.module('app')
	.controller('rankingsController', ['$scope', 'rankings', function ($scope,rankings) {

	}]);

angular.module('app')
	.controller('tableController', ['$scope', 'rankings', 'table',function($scope,rankings,table) {
		$scope.cols = rankings.cols;
		$scope.data = rankings.rankings;
		$scope.table = table;
		$scope.pagesLength = function(pageLength, rankingsLength) {
			return Math.ceil(rankingsLength / pageLength)
		}
		$scope.incrementPage = function() {
			table.activePlayer = Math.min($scope.filteredResults.length-table.rowsPerPage, table.activePlayer+table.rowsPerPage) 
		}
		$scope.decrementPage = function() {
			table.activePlayer = Math.max(0, table.activePlayer-table.rowsPerPage) 
		}
		$scope.goToFirstPage = function() {
			table.activePlayer = 0;
		}
		$scope.goToLastPage = function() {
			table.activePlayer = $scope.filteredResults.length-table.rowsPerPage;
		}
		$scope.getNumber = function(num) {
			console.log(num)
			return new Array(num)
		}
		$scope.setPageNumber = function(index) {
			table.activePlayer = index * table.rowsPerPage
		}
		$scope.setOrder = function(order) {
			if (table.order.by == order) {
				table.order.reverse = !table.order.reverse
			}
			table.order.by = order;
			console.log($scope.filteredResults.length)
		}
		$scope.filteredResults = $scope.data;
		$scope.filters = table.filters;

	}])

angular.module('app')
	.controller('statsController', ['$scope', 'rankings',function($scope, rankings){
		$scope.rankings = rankings;
		$scope.data = rankings.rankings;
		//console.log($scope.data)
		//$scope.totalGames = rankings.totalGames;
		console.log(setPlayed('Zerg',$scope.data))
		function Race(name) {
			this.name = name,
			this.played = setPlayed(name,$scope.data),
			this.wins = setWins(name,$scope.data),
			this.winPercentage = setPercent(setWins(name,$scope.data),setPlayed(name,$scope.data),10),
			this.playedPercent = setPercent($scope.rankings.totalGames,setPlayed(name,$scope.data),10)
		}
		function setPlayed(race,array) {
			return array.reduce(function(prev,cur) {if(race === cur.race) {return prev+cur.wins+cur.losses} else {return prev}},0)
		}
		function setWins(race,array) {
			return array.reduce(function(prev,cur) {if(race === cur.race) {return prev+cur.wins} else {return prev}},0)
		}
		function setPercent(played,total,decimals) {
			if (decimals === undefined) {
				decimals = 1
			}
			return Math.round((played / total)*10 * Math.max(1, 10*decimals))/decimals
		}
		$scope.races = [
			new Race('Zerg'),
			new Race('Protoss'),
			new Race('Terran')
		];
		console.log($scope.races)
	}]);

angular.module('app')
	.factory('rankings', [ function(){
		var rankings = rankingsJSON;
		var out = [];
		rankingsJSON.data.forEach(function(cur) {
			var outie = {}
			cur.forEach(function(cur,i){ outie[rankingsJSON.cols[i]] = cur })
			out.push(outie);
		})
//		console.log(out);
		var activePlayer = 0;
		var totalGames = out.reduce(function(prev,cur) {return prev + cur.wins + cur.losses},0);
		var totalWins = out.reduce(function(prev,cur) {return prev+cur.wins},0);
		return {
			rankings : out,
			cols : rankingsJSON.cols,
			totalGames : totalGames,
			totalWins : totalWins
		}
	}]);

angular.module('app')
	.factory('table', [ function(){
		var activePlayer = 0;
		var rowsPerPage = 20;
		var orderBy = "";
		var filters = {
			race: "",
			region: ""
		}
		return {
			activePlayer : activePlayer,
			rowsPerPage : rowsPerPage,
			order : {
				by : orderBy,
				reverse: 0
			},
			filters : filters
		}
	}])

// angular.module('app')
// 	.filter('tableFilter',function(input,race,country){
// 		if ()
// 	})