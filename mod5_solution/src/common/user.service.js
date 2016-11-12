(function () {
    "use strict";

angular.module('common')
    .service('UserService', UserService);


function UserService() {
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

    service.saveUser = function(user) {
        service.storedUser = user;
    };

}



})();
