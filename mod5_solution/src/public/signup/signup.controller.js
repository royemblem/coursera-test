(function () {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['UserService'];
    function SignupController(UserService) {
        var signupCtrl = this;

        signupCtrl.submit = function () {
            signupCtrl.completed = true;

            //store the saved user data
            UserService.saveUser(signupCtrl.user);
        };
    }


})();