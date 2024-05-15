sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("project4.controller.View2", {
            onInit: function (oEvent) {
                //this.getRouter().getRoute("id").attachPatternMatched(this._onObjectMatched, this);
                
				//this.getView().byId("form0").bindElement("/Orders(10248)");
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                console.log("oRouter", oRouter);
                oRouter.getRoute("View2").attachPatternMatched(this._onPage2Matched, this);
                
			},

            _onPage2Matched: function(oEvent) {
                // Update table view for page 2
                var sProductID = oEvent.getParameter("arguments").productid;
                var sOrderID = oEvent.getParameter("arguments").orderid;

                this.getView().byId("smartFormColumn").bindElement("/Products("+ sProductID +")");
                var oTable = this.byId("faktura_table2");
                oTable.attachBeforeRebindTable(function(oEvent) {
                console.log("beforeRebindTable event triggered");
                var oBindingParams = oEvent.getParameter("bindingParams");
                console.log("Binding parameters:", oBindingParams);

                // Filter für OrderID und ProductID
                var oFilterOrderID = new sap.ui.model.Filter("OrderID", sap.ui.model.FilterOperator.EQ, sOrderID);
                var oFilterProductID = new sap.ui.model.Filter("ProductID", sap.ui.model.FilterOperator.EQ, sProductID);
                // Filter zusammenführen
                var oCombinedFilter = new sap.ui.model.Filter([oFilterOrderID, oFilterProductID], true);

                oBindingParams.filters.push(oCombinedFilter); // Filter: ProductID and OrderID
                console.log("Binding parameters:", oBindingParams);

                });

              },

            onNavBack: function(){
                history.go(-1);
            },

            PresseditToggled: function(oEvent){
                //this.getView().byId("faktura_table2").rebindTable("Edit");
                console.log(oEvent);
                var bEditMode = oEvent.getParameter("editable");
                console.log("bEditMode", bEditMode);
                var oTable = this.byId("faktura_table2");
            
                if (bEditMode) {
                    // Switch to editable mode
                    console.log("Event Editable Mode triggerd");
                    oTable.setEditable(true);
                } else {
                    // Switch to display mode
                    oTable.setEditable(false);
                }
                console.log("oTable", oTable);
            },

            onValueChange: function(oEvent) {
                var source = oEvent.getSource(); // Das SmartField-Element, das das Ereignis ausgelöst hat
                var fieldId = source.getId(); // Die ID des SmartField-Elements, Output Example application-project4-display-component---View2--ProductName
                var newValue = oEvent.getParameter("newValue");
                // Hier kannst du die Logik implementieren, um den geänderten Wert zu verarbeiten
                console.log("Neuer Wert:", newValue);
                var parts = fieldId.split("--"); // Teile die ID anhand des Trennzeichens "--"
                var lastPart = parts[parts.length - 1]; // Extrahiere den letzten Teil
                console.log("ID des Smartfields:", fieldId);
                console.log(lastPart);
                console.log(oEvent);
            },

            async onOpenDialog() {
                alert("Dialog Begin");
                this.oDialog ??= await this.loadFragment({
                    name: "projetc4.view.Dialog"
                });
    
                this.oDialog.open();
            },
    
            onCloseDialog() {
                // note: We don't need to chain to the pDialog promise, since this event-handler
                // is only called from within the loaded dialog itself.
                this.byId("helloDialog").close();
            },

            handleOpen: function () {
                alert("Dialog Begin");
                var oDialog = this.getView().byId("helloDialog");
                oDialog.show();
            },
    
            handleClose: function () {
                var oDialog = this.getView().byId("helloDialog");
                oDialog.close();
            }
            
		
    })});
