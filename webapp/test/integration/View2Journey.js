/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/View1",
	"./pages/Browser",
	"./pages/View2"
], function (opaTest) {
	"use strict";

	QUnit.module("Detail Page");

	opaTest("Should see the detail page when a user clicks on an entry of the list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		//Actions
		When.onTheWorklistPage.iPressOnTheItemWithTheID("11");

		// Assertions
		Then.onThePostPage.theTitleShouldDisplayTheName("Chai");
	});

	opaTest("Should go back to the TablePage", function (Given, When, Then) {
		// Actions
		When.onThePostPage.iPressTheBackButton();

		// Assertions
		Then.onTheWorklistPage.iShouldSeeTheTable();
	});

	opaTest("Should be on the post page again when the browser's forward button is pressed", function (Given, When, Then) {
		// Actions
		When.onTheBrowser.iPressOnTheForwardButton();

		// Assertions
		Then.onThePostPage.theTitleShouldDisplayTheName("Chai");

		// Cleanup
		Then.iTeardownMyApp();
	});
});
