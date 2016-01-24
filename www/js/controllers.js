angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $ionicModal, $timeout) {
  // Form data for the login modal
  $rootScope.loginData = {};
	$rootScope.registerData = {};

  $rootScope.newTopic = function() {
    $state.go('app.newTopic');
  };

  $rootScope.listTopics = function() {
    $state.go('app.listTopics');
  };

  $scope.login = function() {
    $scope.modal.show();
  };

})

.controller('LoginCtrl', function($scope, $state, $location, $ionicModal, $ionicNavBarDelegate, $interval, $ionicPopup, $timeout, $ionicLoading, $stateParams, $ionicSideMenuDelegate, $rootScope, $http) {
  $ionicSideMenuDelegate.canDragContent(false);

  console.log("username" + window.localStorage['username']);
  if (!window.localStorage['username']) {
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);
      $scope.loginAjax();
    };

    $scope.loginAjax = function() {
      $http({
        method: 'GET',
        url: 'http://146.185.173.106:4713/api/login/' + $scope.loginData.username + '/' + $scope.loginData.phone,
      }).success(function(json) {
        console.log(json);

        if (json.username === $scope.loginData.username && json.phone === $scope.loginData.phone) {
          window.localStorage['username'] = $scope.loginData.username;
          window.localStorage['phone'] = $scope.loginData.phone;
          $state.go('app.map');
        } else {
          $ionicLoading.show({
            template: "Please enter correct username and phone.",
            noBackdrop: true,
            duration: 2000
          });
        }

      }).error(function() {
        console.log("Username ajax error");
      });
    };
  } else {
    $state.go('app.map');
  }

  $scope.register = function() {
    $state.go('app.register');
  }
})

.controller('RegisterCtrl', function($scope, $state, $location, $ionicModal, $ionicNavBarDelegate, $interval, $ionicPopup, $timeout, $ionicLoading, $stateParams, $ionicSideMenuDelegate, $rootScope, $http) {
  $ionicSideMenuDelegate.canDragContent(false);

  $scope.doregister = function() {
    console.log('Doing register', $rootScope.registerData);

    if (!$rootScope.registerData.username || !$rootScope.registerData.phone || !$rootScope.registerData.display) {
      $ionicLoading.show({
        template: "All fields are mandatory !",
        noBackdrop: true,
        duration: 2000
      });

    } else {
      $scope.regAjax();
    }
  }

  $scope.regAjax = function() {

		console.log(JSON.stringify($rootScope.registerData));

    $http({
      method: 'POST',
      url: 'http://146.185.173.106:4713/api/register',
      data: $rootScope.registerData,
      headers: {
        "Accept": "text/json",
				"Content-Type": "application/json"
      }
    }).success(function(json) {
      console.log(json);
    }).error(function() {
      console.log("Username ajax error");
    });
  };
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {
    timeout: 10000,
    enableHighAccuracy: true
  };

  $cordovaGeolocation.getCurrentPosition(options).then(function(position) {

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    console.log("Current position" + latLng);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  }, function(error) {
    console.log("Could not get location");
  });
})

.controller('newTopicCtrl', function($scope, $state, $location, $ionicModal, $ionicNavBarDelegate, $interval, $ionicPopup, $timeout, $ionicLoading, $stateParams, $ionicSideMenuDelegate, $rootScope, $http) {

})

.controller('listTopicsCtrl', function($scope, $state, $location, $ionicModal, $ionicNavBarDelegate, $interval, $ionicPopup, $timeout, $ionicLoading, $stateParams, $ionicSideMenuDelegate, $rootScope, $http) {

});
