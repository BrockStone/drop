angular.module('drop.controllers', ['firebase', 'ngCordova'])

//////////////////////
// MAIN SLIDE OUT MENU ---> LOGIN
//////////////////////

.controller('menuCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $firebase, $firebaseSimpleLogin) {
  
  // FIREBASE REFERENCE
  var ref = new Firebase('https://drop.firebaseio.com');
  $scope.authClient = $firebaseSimpleLogin(ref);

  // Login modal 
  $ionicModal.fromTemplateUrl('templates/log.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create profile modal 
  $ionicModal.fromTemplateUrl('templates/create_profile.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.profileModal = modal;
  });

  // Open the create profile modal and get session reference
  $scope.addProfile = function() {
    $scope.profileModal.show();
  };

  // Form data for profile
  $scope.profileData = {};

  // Create user profile and send to Db
  $scope.doCreateProfile = function(){
    $scope.authClient.$getCurrentUser().then(function(user) {
      if (user) { // Now, user isn't null.

        if ($scope.profileData.displayName == null || $scope.profileData.bio == null || $scope.profileData.homeMtn == null || $scope.profileData.terrain == null || $scope.profileData.yearsRidden == null || $scope.profileData.board == null || $scope.profileData.bindings == null) {

          $ionicLoading.show({
            template: '<i class="ion-android-close"></i> FILL OUT ALL FIELDS'
            });
            $timeout(function() {
            $ionicLoading.hide();
          }, 1500);
          
        }else{
          
            $ionicLoading.show({
            template: '<i class="icon ion-loading-c"></i> CREATING PROFILE'
            });
            $timeout(function() {
            $ionicLoading.hide();
          }, 1000);

          console.log(user.uid);
          console.log($scope.profileData);

          ref.child('profiles').child(user.uid).set({
            displayName: $scope.profileData.displayName,
            bio: $scope.profileData.bio,
            home_mountain: $scope.profileData.homeMtn,
            terrain: $scope.profileData.terrain,
            years_ridden: $scope.profileData.yearsRidden,
            board: $scope.profileData.board,
            bindings: $scope.profileData.bindings,
            provider: user.provider,
            provider_id: user.id
          });
        }
      } 
    });
  };


  // Form data Object for the login modal
  $scope.loginData = {};

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };



  // Facebook provider for Simple Login
  $scope.loginWithFacebook = function() {
      
    $scope.authClient.$login("facebook").then(function(user) {
   
      console.log("Logged in as: " + user.displayName);

      var isNewUser = true;
      
      if( isNewUser ) {
      
        // save new user's profile into Firebase so we can
        // list users, use them in security rules, and show profiles
        ref.child('users').child(user.uid).set({
          displayName: user.displayName,
          provider: user.provider,
          provider_id: user.id
        });
      }
    }, function(error) {
      console.error("Login failed: " + error);
    });
    $scope.addProfile();
  };

  // Twitter provider for Simple Login
  $scope.loginWithTwitter = function() {
      
    $scope.authClient.$login("twitter").then(function(user) {
      
      console.log("Logged in as: " + user.displayName);

      var isNewUser = true;
      
      if( isNewUser ) {
      
        // save new user's profile into Firebase so we can
        // list users, use them in security rules, and show profiles
        ref.child('users').child(user.uid).set({
          displayName: user.displayName,
          provider: user.provider,
          provider_id: user.id
        });
        $scope.addProfile();
      }
    }, function(error) {
      console.error("Login failed: " + error);
    });
  };

  // log user in using email and password
  $scope.loginWithEmail = function(){
   console.log($scope.loginData.username);
    $scope.authClient.createUser($scope.loginData.username, $scope.loginData.password).then(function(user) {
      if (user) {
        console.log("User created successfully:", user);
      } else {
        console.log("Error creating user:", error);
      }
    });
    
    $scope.authClient.$createUser($scope.loginData.username, $scope.loginData.password)
    .then(function(user){
        // do things if success
        console.log("User created successfully:", user);
    }, function(error){
        // do things if failure
    }); 
  };

  
})



////////////////////////////////////////////////////////////
// Drops Home (Username, id, trick, feature, video, location)
////////////////////////////////////////////////////////////

.controller('dropsCtrl', function($scope, $ionicModal, $timeout, $ionicLoading, $firebase, $cordovaCapture) {
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
  };

  

  $scope.captureAudio = function() {
    var options = { limit: 3, duration: 10 };

    $cordovaCapture.captureAudio(options).then(function(audioData) {
      // Success! Audio data is here
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  $scope.captureImage = function() {
    var options = { limit: 3 };

    $cordovaCapture.captureImage(options).then(function(imageData) {
      // Success! Image data is here
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
    }, function(err) {
      // An error occured. Show a message to the user
    });
  }



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

.controller('MyCtrl', function($scope, $cordovaCapture) {

  

});
