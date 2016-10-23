(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .provider('ShoppingListService', ShoppingListServiceProvider)
        .config(Config);

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        // populate the shopping list.
        ShoppingListServiceProvider.defaults.toBuyList = [
            { name: "Cookies", quantity: 5 },
            { name: "Loaf of Bread", quantity: 1 },
            { name: "Apples", quantity: 6 },
            { name: "Bananas", quantity: 3 },
            { name: "Lottery Ticket", quantity: 1 },
            { name: "Pumpkins", quantity: 8 }
        ]
    }


    ToBuyController.$inject = ['ShoppingListService'];
    function ToBuyController(ShoppingListService) {
        var list = this;

        list.items = ShoppingListService.getList();

        list.markBought = function(itemIndex){
            ShoppingListService.markBought(itemIndex);
        }

        list.errorMessage = function(){
            return ShoppingListService.isEverythingBought();
        }

    }

    AlreadyBoughtController.$inject = ['ShoppingListService'];
    function AlreadyBoughtController(ShoppingListService) {
        var bought = this;

        bought.items = ShoppingListService.getBought();

        bought.errorMessage = function(){
            return ShoppingListService.isNothingBought();
        }

    }


    function ShoppingListService(toBuyList) {
        var service = this;

        // List of shopping items
        var list = toBuyList;

        var bought = [];

        service.markBought = function(index){
            var boughtItem = list.splice(index, 1);
            bought.push(boughtItem[0]);
        }

        service.getList = function () {
            return list;
        };
        service.getBought = function () {
            return bought;
        };

        service.isEverythingBought = function(){
            if(list.length == 0){
                //everything is bought!
                return true;
            }else{
                return false;
            }
        }

        service.isNothingBought = function(){
            if(bought.length == 0){
                //everything is bought!
                return true;
            }else{
                return false;
            }
        }
    }


    function ShoppingListServiceProvider() {
        var provider = this;

        provider.defaults = {
            //default to empty list
            toBuyList: []
        };

        provider.$get = function () {
            var shoppingList = new ShoppingListService(provider.defaults.toBuyList);

            return shoppingList;
        };
    }

})();
