(function() {
  'use strict';

  angular.module('ui.gridstack', [])

  .controller('GridstackController', ['$scope', '$element', '$attrs',
      function($scope, $element, $attrs) {

        var gridstack = null;
        this.init = function(element, options) {
          gridstack = element.gridstack(options).data('gridstack');
          return gridstack;
        };

        this.removeItem = function(element){
          if (gridstack) {
            return gridstack.remove_widget(element, false);
          }
          return null;
        };

        this.addItem = function(element, x, y, width, height, auto) {
          if (gridstack) {
            return gridstack.add_widget(element, x, y, width, height, auto);
          }
          return null;
        };

  }])

  .directive("gridStack", [function () {
      return {
          restrict: "A",
          controller: 'GridstackController',
          scope: {
            dragStart: '&',
            dragStop: '&',
            resizeStart: '&',
            resizeStop: '&',
            serialize: '&',
            options: '='
          },
          link: function (scope, element, attrs, controller, ngModel) {

              controller.init(element, scope.options);

              element.on('change', function (e, items) {
                  scope.serialize();
              });
              
              element.on('dragstart', function(e, ui) {
                  scope.dragStart();
              });

              element.on('dragstop', function(e, ui) {
                  scope.dragStop();
              });

              element.on('resizestart', function(e, ui) {
                  scope.resizeStart()(ui.element.children(':first').attr('id'));
              });

              element.on('resizestop', function(e, ui) {
                  scope.resizeStop();
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
              attrs.$observe('gridstackItem', function(val) {
                var widget = controller.addItem(element, attrs.gsX, attrs.gsY, attrs.gsWidth, attrs.gsHeight, scope.$eval(attrs.gsAutoPosition));
              });
              element.bind('$destroy', function() {
                controller.removeItem(element);
              });
          }

      };
  }]);


})();
