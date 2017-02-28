angular.module('App')
.controller('NutriFactsController', function ($scope, $http) {
  $scope.editing = false;
  $scope.start = true;
  //$scope.image_path  = "images/start0";
  $scope.tab = 0;
  $scope.abcCode = '';
  $scope.searchText = '';
    
  $scope.search = function(){
      
      $scope.abcCode = $scope.searchText;
  };    
    
    
  $scope.getAverage =  function(str){
      let n = $scope.nutrifacts.length;
      var sum = 0;
      //for (var i = 0; i < n; i++){
        //  sum += parseInt($scope.nutrifacts[i].sugars, 10); //don't forget to add the base 
      //}
      switch (str) {
         case 'sugars': 
          for (var i = 0; i < n; i++){
              sum += parseInt($scope.nutrifacts[i].sugars, 10); //don't forget to add the base 
           }
           break;
         case 'cholesterol':
          for (var i = 0; i < n; i++){
              sum += parseInt($scope.nutrifacts[i].cholesterol, 10); //don't forget to add the base 
           }
           break;
           case 'protein':
               for (var i = 0; i < n; i++){
              sum += parseInt($scope.nutrifacts[i].protein, 10); //don't forget to add the base 
           }
           break;
      }
    return (sum/n).toFixed(2);
      
  }
  
  $scope.getMedian =  function(str){
      let n = $scope.nutrifacts.length;
      //get sorted array
      var values = [];
      switch(str){
          case 'sugars':
            for (var i = 0; i < n; i++){
                values.push(parseInt($scope.nutrifacts[i].sugars, 10));
          }
          break;
          case 'cholesterol':
            for (var i = 0; i < n; i++){
                values.push(parseInt($scope.nutrifacts[i].cholesterol, 10));
          }
          break;
          case 'protein':
            for (var i = 0; i < n; i++){
                values.push(parseInt($scope.nutrifacts[i].protein, 10));
          }
          break;
      }
      //for (var i = 0; i < n; i++){
        //  values.push(parseInt($scope.nutrifacts[i].sugars, 10));
          
      //}
      values.sort((a, b) => a - b);
      
      if (n % 2 == 0){
         return 0.5*(values[(n-2)/2] + values[n/2]);
      }
      else{
          return values[(n-1)/2];
      }
  }
  
  $scope.getStandardDeviation = function(str){
     let n =  $scope.nutrifacts.length;
      var sum = 0.0;
      let aver = $scope.getAverage(str);
      //for (var i = 0; i < n; i++){
        //  sum += Math.pow((parseFloat($scope.nutrifacts[i].sugars, 10) - aver), 2 );
      //}
      switch(str){
          case 'sugars':
         for (var i = 0; i < n; i++){
          sum += Math.pow((parseFloat($scope.nutrifacts[i].sugars, 10) - aver), 2 );
      }
              break;
          case 'cholesterol':
         for (var i = 0; i < n; i++){
          sum += Math.pow((parseFloat($scope.nutrifacts[i].cholesterol, 10) - aver), 2 );
      }
              break;
              case 'protein':
         for (var i = 0; i < n; i++){
          sum += Math.pow((parseFloat($scope.nutrifacts[i].protein, 10) - aver), 2 );
      }
              break;
              
      }
      if (n > 1){
      let st = sum/(n-1);
           //return Math.sqrt(st).toFixed(2);
             return st.toFixed(2);
      }
      else {return 0.0;}
      
  }
    
  $scope.getStandardScore = function(){
      let n =  $scope.nutrifacts.length;
      let aver = $scope.getAverage();
      let stdev = $scope.getStandardDeviation();
      for (var i = 0; i < n; i++){
        $scope.nutrifacts[i].sugars_ss =  ((((parseFloat($scope.nutrifacts[i].sugars)) - aver)/stdev).toFixed(2)).toString();
        $scope.nutrifacts[i].sugars_ds =  (parseFloat($scope.nutrifacts[i].sugars_ss))*10 + 50;          
              
      }
      
  }
    
  $scope.getCode = function(l){
   
     switch (l) {
         case 'A':  case 'a': case 'B': case 'b': case 'C': case 'c':
          return  'abcabc';
         case 'D': case 'd': case 'E': case 'e': case 'F': case 'f':
          return 'defdef';
         case 'G': case 'g': case 'H': case 'h': case 'I': case 'i':
          return 'ghighi';
         case 'J': case 'j': case 'K': case 'k': case 'L': case 'l':
          return 'jkljkl';
         case 'M': case 'm': case 'N': case 'n': case 'O': case 'o':
          return 'mnomno';
         case 'P': case 'p': case 'Q': case 'q': case 'R': case 'r':
          return 'pqrpqr';
         case 'S': case 's': case 'T': case 't': case 'U': case 'u':
          return 'stustu';
         case 'V': case 'v': case 'W': case 'w': case 'X': case 'x': case 'Y': case 'y': case 'Z': case 'z':
          return 'vwxyz';
      }
     
 };   
  
  $scope.abc = function (settab){
      $scope.tab = settab;
      if (settab == 1){
          $scope.abcCode = 'abcabc';
      }
      
      else if ( settab == 4){
         $scope.abcCode = 'defdef';
     }
      else if (settab == 7){
          $scope.abcCode = 'ghighi';
      }
    else if (settab == 10){
          $scope.abcCode = 'jkljkl';
      }
      
      else if ( settab == 13){
         $scope.abcCode = 'mnomno';
     }
      else if (settab == 16){
          $scope.abcCode = 'pqrpqr';
      }
      else if (settab == 19){
          $scope.abcCode = 'stustu';
      }
      else if (settab == 22){
          $scope.abcCode = 'vwxyz';
      }
      
      
      else {
          
          $scope.abcCode = '';
      }
    
  };
    
  $scope.isAbc = function(num){
      return ($scope.tab === num);
      
  };
  
  $scope.view = function (t) {
    $scope.editing = false;
    $scope.start = false;
    for (var i = 0; i < $scope.nutrifacts.length; ++i) {

        if ( new String(t).valueOf()== new String($scope.nutrifacts[i].title).valueOf() )
            $scope.content = $scope.nutrifacts[i];        
        }
     //$scope.content = $scope.nutrifacts[index];
  };

  $scope.create = function () {
    $scope.editing = true;
    $scope.content = {
      title: '',
      code: '',
      image_path:'',
      serving_size:'',
      serving_per_container:'',
      calories:'',
      calories_fat:'',
      total_fat:'',
      total_fat_dv:'',
      saturated_fat:'',
      saturated_fat_dv:'',
      trans_fat:'',
      polyunsaturated_fat:'',
      monounsaturated_fat:'',
      cholesterol:'',
      cholesterol_dv:'',
      sodium:'',
      sodium_dv:'',
      potassium:'',
      potassium_dv:'',
      total_carbohydrate:'',
      total_carbohydrate_dv:'',
      dietary_fiber:'',
      dietary_fiber_dv:'',
      sugars:'',
      sugars_ss:'',
      sugars_ds:'',
      protein:'',
      protein_dv:'',    
      vitaminA:'',
      vitaminC:'',
      folicacid:'',
      vitaminK:'',
      calcium:'',
      iron:'',
      ingredients: ''
    };
  };

  $scope.save = function () {
    $scope.content.date = new Date();

    if ($scope.content.id) {
      $scope.content.code = $scope.getCode($scope.content.title.charAt(0));  
      $http.put('/nutrifacts/' + $scope.content.id, $scope.content).success(function (data) {
        $scope.editing = false;
      }).error(function (err) {
        $scope.error = 'Could not upate item';
      });
    } else {
      $scope.content.id = Date.now();
      $scope.content.code = $scope.getCode($scope.content.title.charAt(0));
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
