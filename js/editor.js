angular.module('App')
.controller('NutriFactsController', function ($scope, $http) {
  $scope.editing = false;
  $scope.start = true;
  $scope.image_path  = "images/start0";
    
  $scope.view = function (index) {
    $scope.editing = false;
    $scope.start = false;
    $scope.content = $scope.nutrifacts[index];
  };

  $scope.create = function () {
    $scope.editing = true;
    $scope.content = {
      title: '',
      image_path:'',
      serving_size:'',
      serving_per_container:'',
      calories:'',
      total_fat:'',
      saturated_fat:'',
      trans_fat:'',
      cholesterol:'',
      sodium:'',
      total_carbohydrate:'',
      dietary_fiber:'',
      sugars:'',
      protein:'',
      vitaminA:'',
      vitaminC:'',
      calcium:'',
      iron:'', 
      ingredients: ''
    };
  };

  $scope.save = function () {
    $scope.content.date = new Date();

    if ($scope.content.id) {
      $http.put('/nutrifacts/' + $scope.content.id, $scope.content).success(function (data) {
        $scope.editing = false;
      }).error(function (err) {
        $scope.error = 'Could not upate item';
      });
    } else {
      $scope.content.id = Date.now();
      $http.post('/nutrifacts', $scope.content).success(function (data) {
        $scope.nutrifacts.push($scope.content);
        $scope.editing = false;
      }).error(function (err) {
        $scope.error = 'Could not create item';
      });
    }
  };

  $scope.remove = function () {
    $http.delete('/nutrifacts/' + $scope.content.id).success(function (data) {
      var found = -1;
      angular.forEach($scope.nutrifacts, function (item, index) {
        if (item.id === $scope.content.id) {
          found = index;
        }
      });
      if (found >= 0) {
        $scope.nutrifacts.splice(found, 1);
      }
      $scope.content = {
        title: '',
        content: ''
      };
    }).error(function (err) {
      $scope.error = 'Could not delete item';
    });
  };

  $http.get('/nutrifacts').success(function (data) {
    $scope.nutrifacts = data;
  }).error(function (err) {
    $scope.error = 'Could not load items';
  });

});
