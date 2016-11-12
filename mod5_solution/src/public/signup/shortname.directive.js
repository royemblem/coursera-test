(function () {
    "use strict";

    angular.module('public')
        .directive('shortname', ShortnameDirective);


    ShortnameDirective.$inject = ['MenuService'];
    function ShortnameDirective(MenuService) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$asyncValidators.shortname = function(modelValue, viewValue) {

                    //dont run on empty model view
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.reject();
                    }

                    //check if this is a valid shortname
                    return MenuService.isValidShortName(viewValue);

                };


            }
        };
    }


})();