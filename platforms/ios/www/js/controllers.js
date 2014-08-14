angular.module('drop.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/log.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// Drop Home Scope Controller (Username, id, trick, feature, video, location)
.controller('dropsCtrl', function($scope) {
  $scope.drops = [
    { username: 'Brock_Stone', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
    { username: 'JeffSmail', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
    { username: 'Skip', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
    { username: 'DJ_Rel', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'}
  ];
})

.controller('loveCtrl', function($scope) {
  $scope.loves = [
    { username: 'Brock_Sewdmwklmetone'},
    { username: 'JeffSmail'},
    { username: 'Skip'},
    { username: 'DJ_Rel'}
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
