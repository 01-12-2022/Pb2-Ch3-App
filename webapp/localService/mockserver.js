sap.ui.define([
	"sap/ui/core/util/MockServer"
], (MockServer) => {
	"use strict";

	return {

		init() {
			// create
			const oMockServer = new MockServer({
				rootUri: sap.ui.require.toUrl("project4") + "/V2/Northwind/Northwind.svc/"
			});

			const oUriParameters = new URLSearchParams(window.location.search);

			// configure mock server with a delay
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 500
			});

			// simulate
			const sPath = sap.ui.require.toUrl("project/localService/NorthwindODqata");
			oMockServer.simulate(sPath + "/metadata.xml", sPath + "/data");

			// start
			oMockServer.start();
		}
	};
});
