/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/View1"
], function (opaTest) {
	"use strict";

	QUnit.module("First Page with Table");

	opaTest("Should see the table with all entrys", function (Given, When, Then) {
		// Arrangements
		 Given.iStartMyApp("");

		// Assertions
		Then.onTheWorklistPage.theTableShouldHavePagination().
			and.theTitleShouldDisplayTheTotalAmountOfItems();
	});

	opaTest("Should be able to load more items", function (Given, When, Then) {
		//Actions
		When.onTheWorklistPage.iPressOnMoreData();

		// Assertions
		Then.onTheWorklistPage.theTableShouldHaveAllEntries();

		// Cleanup
		Then.iTeardownMyApp();
	});
});
