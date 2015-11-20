angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('tabsController.main', {
      url: '/main',
      views: {
        'main': {
          templateUrl: 'templates/list.html',
          controller: 'listCtrl'
        }
      }
    })

    .state('tabsController.edit/new', {
      url: '/detail/:id',
      views: {
        'detail': {
          templateUrl: 'templates/detail.html',
          controller: 'editCtrl'
        }
      }
    })

    .state('tabsController', {
      url: '/tab',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/main');

});