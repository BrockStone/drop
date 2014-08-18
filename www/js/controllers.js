angular.module('drop.controllers', ['firebase'])

//////////////////////
// MAIN SLIDE OUT MENU
//////////////////////

.controller('menuCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Login modal 
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



////////////////////////////////////////////////////////////
// Drops Home (Username, id, trick, feature, video, location)
////////////////////////////////////////////////////////////

.controller('dropsCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $firebase) {
  // $scope.drops = [
  //   // { username: 'Brock_Stone', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
  //   // { username: 'JeffSmail', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
  //   // { username: 'Skip', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'},
  //   // { username: 'DJ_Rel', id: 1 , trick_ex: '540, Method', park_feature: '25ft Booter', location: '7 Springs Resort - Champion, Pa', vid_url: 'vids/openingwkend.mp4'}
  // ];

  // FIREBASE REF
   var ref = new Firebase('https://drop.firebaseio.com/drops');
   var sync = $firebase(ref);

   // Drops ARRAY
  $scope.drops = sync.$asArray();

  // Form data for profile
  $scope.dropUploadData = {};



  // Drop Upload modal 
  $ionicModal.fromTemplateUrl('templates/drop_upload.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Drop Upload Location modal 
  $ionicModal.fromTemplateUrl('templates/upload_location.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.dropLocation = modal;
  });

  // Open the Drop Upload modal
  $scope.dropUpload = function() {
    $scope.modal.show();
  };
  
  // Close Drop Upload
  $scope.closeDropUpload = function() {
    $scope.modal.hide();
  };


  // Open the Drop Upload modal
  $scope.getDropLocation = function() {
    $scope.dropLocation.show();
  };
   // Open the Drop Upload modal
  $scope.closeLoc = function() {
    $scope.dropLocation.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.doDropUpload = function() {
    console.log('Upload Info:', $scope.dropUploadData);
      

        
        $scope.drops.$add($scope.dropUploadData).then(function(ref) {
          var id = ref.name();
          console.log("added record with id " + id);
          $scope.drops.$indexFor(id); // returns location in the array

           $ionicLoading.show({
              template: 'UPLOADING DROP'
            });
            $timeout(function() {
              $ionicLoading.hide();
              $scope.closeLoc();
              $scope.closeDropUpload();

    }, 1000);

        });



    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
   
  };

})

////////////////
// Notifications
////////////////

.controller('loveCtrl', function($scope) {
  $scope.loves = [
    { username: 'Brock_Sewdmwklmetone'},
    { username: 'JeffSmail'},
    { username: 'Skip'},
    { username: 'DJ_Rel'}
  ];
})

////////////////
// User Profile 
////////////////

.controller('profileCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for profile
  $scope.profileData = {
      username: 'BrockStone'
  };

  // profile modal 
  $ionicModal.fromTemplateUrl('templates/profile_edit.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeEditProfile = function() {
    $scope.modal.hide();
  },

  // Open the login modal
  $scope.editProfile = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doEditProfile = function() {
    console.log('Profile Info:', $scope.profileData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeEditProfile();
    }, 1000);
  };
})

////////////////
// User Profile 
////////////////

.controller('dropUploadCtrl', function($scope, $ionicModal, $timeout) {
  
})


.controller('PlaylistCtrl', function($scope, $stateParams) {
})
