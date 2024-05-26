sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
function (Opa5,Press) {
    "use strict";

    var sViewName = "project4.view.View1";

    Opa5.createPageObjects({
        onTheAppPage: {
            actions: {
                iWaitUntilTheAppBusyIndicatorIsGone: function () {
                    return this.waitFor({
                        id: "productListPage",
                        viewName: sViewName,
                        matchers: function (oPage) {
                            return !oPage.getBusy();
                        }
                    });
                },
                iPressATableItem: function () {
                    return this.waitFor({
                        controlType: "sap.m.ColumnListItem",
                        viewName: sViewName,
                        matchers: function (aItems) {
                            // Here you can choose any item to press
                            return aItems.length > 0;
                        },
                        actions: new Press(),
                        errorMessage: "No table items found"
                    });
                }
            },
            assertions: {
                iShouldSeeTheApp: function () {
                    return this.waitFor({
                        id: "productListPage",
                        viewName: sViewName,
                        success: function () {
                            Opa5.assert.ok(true, "The app is displayed");
                        },
                        errorMessage: "The app is not displayed"
                    });
                }
            }
        },
        onTheDetailPage: {
            assertions: {
                iShouldSeeTheDetailPage: function () {
                    return this.waitFor({
                        // Adjust the control id or other matching criteria as per your actual implementation
                        id: "detailPage",
                        viewName: "project4.view.Detail",
                        success: function () {
                            Opa5.assert.ok(true, "The detail page is displayed");
                        },
                        errorMessage: "The detail page is not displayed"
                    });
                }
            }
        }
    });
});
