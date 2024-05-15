/* global QUnit */

sap.ui.require(["project4/test/integration/AllJourneys", "sap/ui/core/Core"
], async function () {
	QUnit.config.autostart = false;
	await Core.ready();
	QUnit.start();
});
