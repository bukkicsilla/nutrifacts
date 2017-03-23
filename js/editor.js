angular.module('App')
.controller('NutriFactsController', function ($scope, $http) {
  $scope.editing = false;
  $scope.start = true;
  //$scope.image_path  = "images/start0";
  $scope.tab = 0;
  $scope.abcCode = '';
  $scope.searchText = '';
  $scope.sugarMin = '0g sugar';
  $scope.sugarMax = '100g sugar';
  $scope.cholesterolMin = '0mg cholesterol';
  $scope.cholesterolMax = '100mg cholesterol';
  $scope.proteinMin = '0g protein';
  $scope.proteinMax = '100g protein';
  $scope.sodiumMin = '0mg sodium';
  $scope.sodiumMax = '1000mg sodium';
  $scope.sugarsShow = false;
  $scope.cholesterolShow = false;
  $scope.proteinShow = false;
  $scope.sodiumShow = false;
    
    
  
    
    
  $scope.showStatistics = function(str){
      switch(str){
          case 'sugars':
              $scope.sugarsShow = true;
              $scope.cholesterolShow = false;
              $scope.proteinShow = false;
              $scope.sodiumShow = false;
              break;
          case 'cholesterol':
              $scope.sugarsShow = false;
              $scope.cholesterolShow = true;
              $scope.proteinShow = false;
              $scope.sodiumShow = false;
              break;
          case 'protein':
              $scope.sugarsShow = false;
              $scope.cholesterolShow = false;
              $scope.proteinShow = true;
              $scope.sodiumShow = false;
              break;
          case 'sodium':
              $scope.sugarShow = false;
              $scope.cholesterolShow = false;
              $scope.proteinShow = false;
              $scope.sodiumShow = true;
              break;
      }
  };
    
  $scope.search = function(){
      
      $scope.abcCode = $scope.searchText;
  };    
  
  $scope.nutrientFilter = function(item) {
      let vsug = parseInt(item.sugars);
      let vchol = parseInt(item.cholesterol);
      let vprot = parseInt(item.protein);
      let vsod = parseInt(item.sodium);
      let xsug = $scope.sugarMin;
      let xchol = $scope.cholesterolMin;
      let xprot = $scope.proteinMin;
      let xsod = $scope.sodiumMin;
      let ysug = $scope.sugarMax;
      let ychol = $scope.cholesterolMax;
      let yprot = $scope.proteinMax;
      let ysod = $scope.sodiumMax;
      
      if (xsug === ''){ xsug = '0'}
      if (xchol === ''){ xchol = '0'}
      if (xprot === ''){ xprot = '0'}
      if (xsod === ''){ xsod = '0'}
      if (ysug === ''){ ysug = '100'}
      if (ychol === ''){ ychol = '100'}
      if (yprot === ''){yprot = '100'}
      if (ysod === '') {ysod = '1000'}
      
        if (vsug >= parseInt(xsug) && vsug <= parseInt(ysug) && 
            vchol >= parseInt(xchol) && vchol <= parseInt(ychol) &&
            vprot >= parseInt(xprot) && vprot <= parseInt(yprot) &&
            vsod >= parseInt(xsod) && vsod <= parseInt(ysod)){
         return item;
      }
      
  };
    
    
  /*$scope.minsugarFilter = function(item) {
      let v = parseInt(item.sugars);
      let x = $scope.sugarMin;
      if (x === ''){ x = '0'}
      //if (item.sugars === '0g' || item.sugars === $scope.sugarMin) {
        if (v >= parseInt(x) ){
         return item;
      }
      
  };

    $scope.mincholesterolFilter = function(item) {
      let v = parseInt(item.cholesterol);
        let x = $scope.cholesterolMin;
        if (x === ''){ x = '0'}
        if (v >= parseInt(x) ){
         return item;
      }
      
  };

  $scope.maxsugarFilter = function(item) {
      let v = parseInt(item.sugars);
      let y = $scope.sugarMax;
      if (y === ''){ y = '100'}
        if (v <= parseInt(y) ){
         return item;
      }
      
  };
    
 $scope.maxcholesterolFilter = function(item) {
      let v = parseInt(item.cholesterol);
      let y = $scope.cholesterolMax;
      if (y === '') { y = '100'}
        if (v <= parseInt(y) ){
         return item;
      }
      
  };*/
    
  $scope.getMax = function(str){
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
          case 'sodium':
            for (var i = 0; i < n; i++){
                values.push(parseInt($scope.nutrifacts[i].sodium, 10));
          }
          break;
              
      }
      var max_of_array = Math.max.apply(Math, values);
      return max_of_array;
  }
  
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
          case 'sodium':
               for (var i = 0; i < n; i++){
              sum += parseInt($scope.nutrifacts[i].sodium, 10); //don't forget to add the base 
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
          case 'sodium':
            for (var i = 0; i < n; i++){
                values.push(parseInt($scope.nutrifacts[i].sodium, 10));
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
              
           case 'sodium':
         for (var i = 0; i < n; i++){
          sum += Math.pow((parseFloat($scope.nutrifacts[i].sodium, 10) - aver), 2 );
      }
              break;
      }
      if (n > 1){
      let st = sum/(n-1);
           return Math.sqrt(st).toFixed(2);
             //return st.toFixed(2);
      }
      else {return 0.0;}
      
  }
    
  $scope.getStandardScore = function(str){
      let n =  $scope.nutrifacts.length;
      let aver = $scope.getAverage(str);
      let stdev = $scope.getStandardDeviation(str);
      switch(str){
          case 'sugars':
      for (var i = 0; i < n; i++){
        $scope.nutrifacts[i].sugars_ss =  ((((parseFloat($scope.nutrifacts[i].sugars)) - aver)/stdev).toFixed(2)).toString();
        $scope.nutrifacts[i].sugars_ds =  (parseFloat($scope.nutrifacts[i].sugars_ss))*10 + 50;          
              
      }
              break;
      case 'cholesterol':
      for (var i = 0; i < n; i++){
        $scope.nutrifacts[i].cholesterol_ss =  ((((parseFloat($scope.nutrifacts[i].cholesterol)) - aver)/stdev).toFixed(2)).toString();
        $scope.nutrifacts[i].cholesterol_ds =  (parseFloat($scope.nutrifacts[i].cholesterol_ss))*10 + 50;          
              
      }
              break;
      case 'protein':
      for (var i = 0; i < n; i++){
        $scope.nutrifacts[i].protein_ss =  ((((parseFloat($scope.nutrifacts[i].protein)) - aver)/stdev).toFixed(2)).toString();
        $scope.nutrifacts[i].protein_ds =  (parseFloat($scope.nutrifacts[i].protein_ss))*10 + 50;          
              
      }
              break;
     case 'sodium':
      for (var i = 0; i < n; i++){
        $scope.nutrifacts[i].sodium_ss =  ((((parseFloat($scope.nutrifacts[i].sodium)) - aver)/stdev).toFixed(2)).toString();
        $scope.nutrifacts[i].sodium_ds =  (parseFloat($scope.nutrifacts[i].sodium_ss))*10 + 50;          
              
      }
              break;
              
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
      cholesterol_ss:'',
      cholesterol_ds:'',
      sodium:'',
      sodium_dv:'',
      sodium_ss:'',
      sodium_ds:'',
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
      protein_ss:'',
      protein_ds:'',
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
