/**
 * Created by tornado.the.whirl on 3/20/17.
 */
(function(){
    angular.module("wamDirectives",[])
        .directive("wamSortable",wamSortable);

    function wamSortable(){

        function linkerFunction(scope, element, attributes) {
            var sIndex = -1;
            var eIndex = -1;
            var data = scope.data;
            var myScope = scope;

            $(element)
                .find("#widgetList")
                .sortable({
                    axis: 'y',
                    start: function(event,ui) {
                        sIndex = ui.item.index();
                    },
                    stop: function(event,ui) {
                        eIndex = ui.item.index();
                        myScope.callback({start:sIndex, end:eIndex});
                    }
                });
        }
//../views/widget/templates/widget-list.html
        return{
            templateUrl: "../../../assignment/assignment4/views/widget/templates/widget-list.html",
            scope:{ widgetList: "=data", callback: "&",  model: "=model"},
            link : linkerFunction
        }
    }

})();