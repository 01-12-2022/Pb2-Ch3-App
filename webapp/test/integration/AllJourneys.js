/* global QUnit */
QUnit.config.autostart = false;

sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/opaQunit",
    "sap/ui/test/actions/Press",
    "sap/ui/test/actions/EnterText"
], function (Opa5, opaTest, Press, EnterText) {
    "use strict";

    // Define Startup arrangements
    Opa5.extend("project4.test.integration.arrangements.Startup", {

        iStartMyApp: function (oOptionsParameter) {
            var oOptions = oOptionsParameter || {};

            console.log("Starting the app with options:", oOptions);

            // Start the app with a minimal delay to make tests fast but still async to discover basic timing issues
            oOptions.delay = oOptions.delay || 50;

            // Start the app UI component
            this.iStartMyUIComponent({
                componentConfig: {
                    name: "project4",
                    async: true
                },
                hash: oOptions.hash,
                autoWait: oOptions.autoWait
            });
        }
    }),

        // Define the App page
        Opa5.createPageObjects({
            onTheAppPage: {
                assertions: {
                    iShouldSeeTheApp: function () {
                        return this.waitFor({
                            id: "app",
                            viewName: "App",
                            success: function () {
                                Opa5.assert.ok(true, "The app is displayed");
                            },
                            errorMessage: "Did not find the app control"
                        });
                    }
                }
            },
            onTheViewPage: {
                assertions: {
                    iShouldSeeThePageView: function () {
                        return this.waitFor({
                            controlType: "sap.m.Page",
                            viewName: "View1",
                            matchers: new sap.ui.test.matchers.PropertyStrictEquals({ name: "title", value: "Fiori" }),
                            success: function () {
                                Opa5.assert.ok(true, "The View1 is displayed");
                            },
                            errorMessage: "Did not find the View1"
                        });
                    }
                }
            },
        
        //define View1 page
        onTheView1Page: {
            actions: {
                iPressGoButton: function () {
                    return this.waitFor({
                        id: "filterbar2",
                        viewName: "View1",
                        success: function (oSmartFilterBar) {
                            var oGoButton = oSmartFilterBar.getAggregation("_toolbar").getContent().find(function (oControl) {
                                return oControl.getMetadata().getName() === "sap.m.Button" && oControl.getText() === "Start";
                            });

                            if (oGoButton) {
                                oGoButton.firePress();
                                Opa5.assert.ok(true, "The Go button was pressed");
                            } else {
                                Opa5.assert.notOk(true, "The Go button was not found");
                            }
                        },
                        errorMessage: "Did not find the SmartFilterBar control"
                    });
                },
                iSetFilterValues: function () {
                    return this.waitFor({
                        controlType: "sap.m.Input",
                        viewName: "View1",
                        success: function (aInputs) {
                            // Set filter values for the inputs
                            aInputs.forEach(function (oInput) {
                                // Modify the code according to your application's structure
                                if (oInput.getId().includes("ProductID")) {
                                    oInput.setValue("11");
                                    Opa5.assert.ok(true, "The ProductID was set 11");
                                }
                            });
                        },
                        errorMessage: "Did not find Input controls"
                    })
            },
            iNavigateFromTableToDetailPage: function () {
                return this.waitFor({
                    controlType: "sap.m.Table",
                    viewName: "View1",
                    success: function (aTables) {
                        // Assuming there is only one table in the view
                        var oTable = aTables[0];

                        // Click on the first item in the table to navigate to the detail page
                        var oFirstItem = oTable.getItems()[0];
                        if (oFirstItem) {
                            new Press().executeOn(oFirstItem);
                            Opa5.assert.ok(true, "Clicked on the first item in the table");
                        } else {
                            Opa5.assert.notOk(true, "No item found in the table");
                        }
                    },
                    errorMessage: "Did not find the Table control"
                });
                }
             },
            assertions: {
                iShouldSeeTheTableEntries: function () {
                    return this.waitFor({
                        id: "faktura_table2",
                        viewName: "View1",
                        success: function (oSmartTable) {
                            var oTable = oSmartTable.getTable();
                            var iRowCount = oTable.getItems().length;

                            Opa5.assert.ok(iRowCount > 0, "The table has entries: " + iRowCount);
                        },
                        errorMessage: "Did not find the SmartTable or it has no entries"
                    });
                },
                iShouldSeeFilteredTableEntries: function () {
                    return this.waitFor({
                        id: "faktura_table2",
                        viewName: "View1",
                        success: function (oSmartTable) {
                            // Modify the code according to your application's structure
                            var oTable = oSmartTable.getTable();
                            var iRowCount = oTable.getItems().length;

                            Opa5.assert.ok(iRowCount > 0, "The table has filtered entries: " + iRowCount);
                        },
                        errorMessage: "Did not find the SmartTable or it has no filtered entries"
                    })},

                iShouldSeeTheDetailPage: function () {
                        return this.waitFor({
                            controlType: "sap.m.Page",
                            viewName: "View2",
                            success: function () {
                                Opa5.assert.ok(true, "Navigated to the detail page");
                            },
                            errorMessage: "Did not find the Detail Page"
                        });
                    }
                }
            },

            onTheDetailViewPage: {
                actions: {
                    iClickEditButton: function () {
                        return this.waitFor({
                            controlType: "sap.m.ToggleButton",
                            viewName: "View2",
                            matchers: new sap.ui.test.matchers.PropertyStrictEquals({
                                name: "title",
                                value: "Change to edit mode"
                            }),
                            actions: new Press(),
                            errorMessage: "Edit button not found or could not be pressed"
                        });
                    }
                },
                assertions: {
                    iVerifyButton: function (){
                            return this.waitFor({
                                controlType: "sap.m.Button",
                                viewName: "View2",
                                matchers: new sap.ui.test.matchers.PropertyStrictEquals({
                                    name: "text",
                                    value: "Buchen"
                                }),
                                success: function (aButtons) {
                                    Opa5.assert.strictEqual(aButtons.length, 1, "Buchen Button is visible");
                                },
                                errorMessage: "Buchen button not found or not visible"
                            });
                    },
                    iVerifyInputFieldsAreEditable: function () {
                        return this.waitFor({
                            controlType: "sap.m.Input",
                            viewName: "View2",
                            success: function (aInputs) {
                                aInputs.forEach(function (oInput) {
                                    Opa5.assert.ok(oInput.getEditable(), "Input field is editable");
                                });
                            },
                            errorMessage: "Input fields are not editable"
                        });
                    },
                    iVerifyInputFieldsAreNotEditable: function () {
                        return this.waitFor({
                            controlType: "sap.m.Input",
                            viewName: "View2",
                            success: function (aInputs) {
                                aInputs.forEach(function (oInput) {
                                    Opa5.assert.notOk(oInput.getEditable(), "Input field is not editable");
                                });
                            },
                            errorMessage: "Input fields are editable"
                        });
                    }
                }
            }
        });

    // Extend the OPA5 configuration with Startup arrangements
    Opa5.extendConfig({
        arrangements: new project4.test.integration.arrangements.Startup(),
        viewNamespace: "project4.view.",
        autoWait: true
    });

    // Define the Navigation Journey test
    QUnit.module("Navigation Journey");

    opaTest("Should see the initial page of the app", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Assertions
        Then.onTheAppPage.iShouldSeeTheApp();
        Then.onTheViewPage.iShouldSeeThePageView();

        // Cleanup
        Then.iTeardownMyApp();
    });

    QUnit.module("Table View:");

    opaTest("Should load the Table", function(Given,When,Then) {
        // Arrangements
        Given.iStartMyApp();

        // Action 
        When.onTheView1Page.iPressGoButton();

        // Assertions
        Then.onTheView1Page.iShouldSeeTheTableEntries();

        // Cleanup
        Then.iTeardownMyApp();

    });

    QUnit.module("Filter Functionality");

    opaTest("Should filter entries in the SmartTable", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Actions
        When.onTheView1Page.iSetFilterValues();

        // Simulate triggering the filter operation (by pressing Go button, for example)
        When.onTheView1Page.iPressGoButton();

        // Assertions
        Then.onTheView1Page.iShouldSeeFilteredTableEntries();

        // Cleanup
        Then.iTeardownMyApp();
    });

    QUnit.module("Navigation from Table to Detail Page");

    opaTest("Should navigate from table to detail page", function (Given, When, Then) {
        // Arrangements
        Given.iStartMyApp();

        // Actions
        When.onTheView1Page.iPressGoButton();
        When.onTheView1Page.iNavigateFromTableToDetailPage();

        // Assertions
        Then.onTheView1Page.iShouldSeeTheDetailPage();

        // Cleanup
        //Then.iTeardownMyApp();
    });

    QUnit.module("Button Check");

    opaTest("Should see the button on detail page", function (Given, When, Then){
        Then.onTheDetailViewPage.iVerifyButton();
    })

    //QUnit.module("SmartForm and SmartTable Interaction");

    //opaTest("Should verify input fields and mode switching", function (Given, When, Then) {
        // Arrangements
        //Given.iStartMyApp();

        // Actions
        //When.onTheView1Page.iPressGoButton();
        //When.onTheDetailViewPage.iClickEditButton();

        // Assertions
        Then.onTheDetailViewPage.iVerifyInputFieldsAreEditable();

        // Assertions
        //Then.onTheDetailViewPage.iVerifyInputFieldsAreNotEditable();

        // Cleanup
        //Then.iTeardownMyApp();
    //});

    // Start QUnit
    sap.ui.require([
        "project1/test/integration/AllJourneys"
    ], function () {
        QUnit.start();
    });
});
