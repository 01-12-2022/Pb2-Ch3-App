sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project4.controller.View1", {
            /* =========================================================== */
		    /* lifecycle methods                                           */
		    /* =========================================================== */

		    /**
		    * Called when the worklist controller is instantiated.
		    * @public
		    */
            onInit: function () {

            },

            /* =========================================================== */
		    /* event handlers                                              */
		    /* =========================================================== */

            onPress:function() {
                alert("Hier wirst du weitrgeleitet");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                alert(oRouter);
                oRouter.navTo("View2", {
                    "id":"1"
                });
                     
            },
            
            /**
             * Event hanlder when a table item gets pressed
            * @param {sap.ui.base.Event} oEvent
            * @public
            */
            onDetail: function(oEvent){
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("View2", {
                        // The source is the list item that got pressed
                        orderid: oEvent.getSource().getBindingContext().getProperty("OrderID"),
                        productid: oEvent.getSource().getBindingContext().getProperty("ProductID")
                });
          },


            /* =========================================================== */
		    /* internal methods                                            */
		    /* =========================================================== */


          /**
		 * Shows the selected item on the object page
		 * On phones a additional history entry is created
		 * @param {sap.m.ObjectListItem} oItem selected Item
		 * @private
		 */
		_showObject : function (oItem) {
			this.getRouter().navTo("View2", {
				id: oItem.getBindingContext().getProperty("OrderID")
			});
		},
        });
    });
