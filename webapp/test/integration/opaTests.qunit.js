/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {

sap.ui.require(["project4/test/integration/AllJourneys", "sap/ui/core/Core"
], async function () {
	await Core.ready();
	QUnit.start();
});

})
