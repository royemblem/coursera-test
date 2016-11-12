(function () {
    "use strict";

angular.module('common')
    .service('UserService', UserService);

UserService.$inject = ['MenuService'];
function UserService(MenuService) {
    var service = this;

    service.storedUser = false;

    service.getStoredUser = function() {
        if(service.storedUser) {
            console.log('returning user', service.storedUser);
            return service.storedUser;
        }else {
            console.log('returning false');
            return false;
        }
    };

    service.getStoredUserWithMenuItem = function(){
        var user = service.getStoredUser();
        if(user){
            //use the returned user data to generate the menu item
            return MenuService.getMenuItem(user.favdish).then(function (response) {
                user.menuItem = response;
                return user;
            });
        }
    };

    service.saveUser = function(user) {
        service.storedUser = user;
    };

}



})();
