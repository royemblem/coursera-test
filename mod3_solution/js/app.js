(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        menu.searchText = '';

        menu.runSearch = function(){
            if(menu.searchText == ''){
                //catch blank entry into the search text field and return empty list.
                menu.found = [];
            }else{
                var promise = MenuSearchService.getMatchedMenuItems(menu.searchText);

                promise.then(function (response) {
                    menu.found = response;
                })
                .catch(function (error) {
                    //log the error.
                    console.log(error);
                    //and set the list to empty.
                    menu.found = [];
                })
            }

        };

        menu.removeItem = function (itemIndex) {
            menu.found.splice(itemIndex, 1);
        };


    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {

            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (result) {
                // process result and only keep items that match
                var foundItems = [];

                var menuItems = result.data.menu_items

                //loop over the results and search for the search term in the name string
                angular.forEach(menuItems, function (item) {
                    // check the item name for the string the user entered
                    if(item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                        foundItems.push(item);
                    }
                });

                // return processed items
                return foundItems;
            });

        };

    }

})();
