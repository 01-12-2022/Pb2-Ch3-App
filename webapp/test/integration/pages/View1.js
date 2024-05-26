sap.ui.define([
	"sap/ui/test/Opa5",
	'sap/ui/test/matchers/AggregationLengthEquals',
	'sap/ui/test/matchers/I18NText',
	'sap/ui/test/matchers/BindingPath',
	'sap/ui/test/actions/Press'
], function (Opa5, AggregationLengthEquals, I18NText, BindingPath, Press) {
	"use strict";
	var sViewName = "View1",
		sTableId = "faktura_table2";
	
	Opa5.createPageObjects({
		onTheWorklistPage: {

			actions: { 
				iStartMyApp: function () {
                    return this.iStartMyAppInAFrame("../index.html");
                },
				iPressOnMoreData: function () {
					// Press action hits the "more" trigger on a table
					return this.waitFor({
						id: sTableId,
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "The table does not have a trigger."
					});
				},

				iPressOnTheItemWithTheID: function (sId) {
					return this.waitFor({
						controlType: "sap.m.ColumnListItem",
						viewName: sViewName,
						matchers:  new BindingPath({
							path: "/Products('" + sId + "')"
						}),
						actions: new Press(),
						errorMessage: "No list item with the ID " + sId + " was found."
					});
			},

			assertions: {

				iShouldSeeTheTable: function () {
					return this.waitFor({
						id: sTableId,
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The table is visible");
						},
						errorMessage: "Was not able to see the table."
					});
				},

				iShouldSeeThePageView: function () {
					return this.waitFor({
						id: "page",
						viewName: sViewName,
						success: function () {
							Opa5.assert.ok(true, "The " + sViewName + " view is displayed");
						},
						errorMessage: "Did not find the " + sViewName + " view"
					});
				},

				theTableShouldHaveAllEntries: function () {
					return this.waitFor({
						id: sTableId,
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "items",
							length: 2155
						}),
						success: function () {
							Opa5.assert.ok(true, "The table has 2155 items");
						},
						errorMessage: "The table does not contain all items."
					});
				},

				theTableShouldHavePagination: function () {
					return this.waitFor({
						id: sTableId,
						viewName: sViewName,
						matchers: new AggregationLengthEquals({
							name: "items",
							length: 20
						}),
						success: function () {
							Opa5.assert.ok(true, "The table has 20 items on the first page");
						},
						errorMessage: "The table does not contain all items."
					});
				},

				theTitleShouldDisplayTheTotalAmountOfItems: function () {
					return this.waitFor({
						id: "tableHeader",
						viewName: sViewName,
						matchers: new I18NText({
							key: "worklistTableTitleCount",
							propertyName: "text",
							parameters: [2155]
						}),
						success: function () {
							Opa5.assert.ok(true, "The table header has 23 items");
						},
						errorMessage: "The table header does not contain the number of items: 2155"
					});
				}

			}
		}
	}});

});
