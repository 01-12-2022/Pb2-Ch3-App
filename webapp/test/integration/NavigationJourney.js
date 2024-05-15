/*global QUnit*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./arrangements/Startup",
	"./pages/App",
	"./pages/View1"
], function (opaTest) {
	"use strict";

	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function (Given, When, Then) {
		// Arrangements
		Given.iStartMypp();

		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();
      	Then.onTheViewPage.iShouldSeeThePageView();

		//Cleanup
		Then.iTeardownMyApp();
	});
});
