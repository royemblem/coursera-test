(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  $scope.lunchtext = "";

  $scope.returnMessage = "";

  $scope.messageClass = "";
  $scope.formStatus = "";

  $scope.checkIfTooMuch = function(){

    //check if nothing is entered.
      if($scope.lunchtext == ""){
        //nothing entered so update the message to an error.
        $scope.returnMessage = "Please enter data first";
        $scope.messageClass = "alert-danger";
        $scope.formStatus = "has-error";
      }else{

        // check if the correct number was entered.
        if(commaSeparatedCount($scope.lunchtext) == 0){
          //just commas and blank text return error.
          $scope.returnMessage = "Please enter data first";
          $scope.messageClass = "alert-danger";
          $scope.formStatus = "has-error";
        }else if(commaSeparatedCount($scope.lunchtext) <= 3){
          $scope.returnMessage = "Enjoy!";
          $scope.messageClass = "alert-success";
          $scope.formStatus = "has-success";
        } else {
          $scope.returnMessage = "Too Much!";
          $scope.messageClass = "alert-success";
          $scope.formStatus = "has-success";
        }
      }



  };

  function commaSeparatedCount(string){
    var stringArray = string.split(',');
    var lunchCount = 0;
    //loop through the array and check entries have more than 1 chracter.
    for (var i = 0, len = stringArray.length; i < len; i++) {
      //check string  is not blank and has at least one chracter of non whitespace.
      if(stringArray[i] != "" && /\S/.test(stringArray[i])){
        lunchCount++;
      }
    }
    return lunchCount;
  }

}

})();
