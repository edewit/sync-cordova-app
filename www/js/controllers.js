angular.module('app.controllers', [])
  
.controller('listCtrl', function($rootScope, $scope, sync) {
	sync.init();
	$rootScope.$on('sync', function(event, list) {
		$scope.list = list;
		$scope.$apply();
	});	
	
	$scope.delete = function(item) {
		sync.deleteItem(item);
	};
	
	$scope.deleteAll = function() {
		sync.deleteAll();	
	};
})
   
.controller('editCtrl', function($state, $stateParams, $scope, sync) {
	if ($stateParams.id) {
		sync.getItem($stateParams.id).then(function(item) {
			$scope.item = item;
		});
		$scope.title = 'Edit';
	} else {
		$scope.title = 'New';
	} 
	
	$scope.save = function(item) {
		if (item.id) {
			sync.update(item);
		} else {
			sync.save(item);
		}
		$scope.item = {};
		$state.go('tabsController.main'); 
	};
})
    