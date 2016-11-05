(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryDetailController', CategoryDetailController);

// 'item' is injected through state's resolve
CategoryDetailController.$inject = ['data']
function CategoryDetailController(data) {
  var categoryDetail = this;
  categoryDetail.menuItems = data.menu_items;

  categoryDetail.category = data.category;

}

})();
