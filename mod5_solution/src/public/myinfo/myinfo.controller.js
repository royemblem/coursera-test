(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user', 'MenuService'];
    function MyInfoController(user, MenuService) {
        var infoCtrl = this;
        console.log('user is ', user);
        infoCtrl.user = user;

    }


})();