(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['user', 'MenuService'];
    function MyInfoController(user, MenuService) {
        var infoCtrl = this;

        infoCtrl.user = user;

        //load the menu item for the user.
        MenuService.getMenuItem(user.favdish).then(function (response) {
            infoCtrl.menuItem = response;
        });


    }


})();