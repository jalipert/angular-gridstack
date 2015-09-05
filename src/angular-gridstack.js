(function() {
  'use strict';

  angular.module('ui.gridstack', [])

  .controller('GridstackController', ['$scope', '$element', '$attrs',
      function($scope, $element, $attrs) {

        var gridstack = null;
        $scope.init = function(element, options) {
          console.log(options)
          gridstack = element.gridstack(options).data('gridstack');
          return gridstack;
        };

        this.removeItem = function(element){
          if (gridstack) {
            return gridstack.remove_widget(element);
          }
          return null;
        }

        this.addItem = function(element, sizeX, sizeY, col, row) {
          if (gridstack) {
            return gridstack.add_widget(element, sizeX, sizeY, col, row, false);
          }
          return null;
        };

  }])

  .directive("gridStack", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          scope: {
            serialize: '&',
            options: '='
          },
          link: function (scope, element, attrs, controller, ngModel) {

              scope.init(element, scope.options);

              element.on('change', function (e, items) {
                  console.log('change')
                  scope.serialize();
              });

          }
      };
  }])

  .directive("gridstackItem", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          require: '^gridStack',
          scope: false,
          link: function (scope, element, attrs, controller) {
              var widget = controller.addItem(element, attrs.gsX,attrs.gsY,attrs.gsWidth,attrs.gsHeight);
          }

      };
  }]);


})();