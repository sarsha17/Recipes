var angular = require('angular');
require('../ng-cordova.min.js');
var ngMaterial = require('angular-material');
var uiRouter = require('angular-ui-router');

var resources = require('./resources/resources.module');
var models = require('./models/models.module');

var appComponent = require('./app.component');
var home = require('./home/home.module');
var recipesDetails = require('./recipe/recipe.module');

var toolbar = require('./components/toolbar/toolbar.module');
var sidenav = require('./components/sidenav/sidenav.module');
var recipes = require('./components/recipes/recipes.module');
var recipeForm = require('./newRecipeForm/newRecipeForm.module');

var common = require('./common/common.module');

angular.module('recipesBook', [
  ngMaterial,
  uiRouter,
  'ngCordova',

  models.name,
  resources.name,
  common.name,

  home.name,
  toolbar.name,
  sidenav.name,
  recipes.name,
  recipesDetails.name,
  recipeForm.name
])
  .component('app', appComponent)
  .config(function ($urlRouterProvider, $mdThemingProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');
    
    $stateProvider.state('image', {
      url: '/image/:imageUrl',
      template: '<img src="{{url}}"></img>',
      controller: function ($scope, rbToolbar, imageUrl) {
          $scope.url = imageUrl;
          rbToolbar.title = "תמונה";
      },
      resolve: {
        imageUrl: function ($stateParams) {
          return $stateParams.imageUrl;
        }
      }
    })

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('orange');
  });


init();

function init() {
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
    document.addEventListener("deviceready", onDeviceReady, false);
  } else {
    onDeviceReady();
  }
}

// manual bootstrap of the angular app after the deviceready event is fired (phonegap)
function onDeviceReady() {
  angular.bootstrap(document, ['recipesBook']);
}
