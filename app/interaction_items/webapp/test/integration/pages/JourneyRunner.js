sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"interactionitems/test/integration/pages/Interactions_HeaderList.gen",
	"interactionitems/test/integration/pages/Interactions_HeaderObjectPage.gen",
	"interactionitems/test/integration/pages/Interactions_ItemsObjectPage.gen"
], function (JourneyRunner, Interactions_HeaderListGenerated, Interactions_HeaderObjectPageGenerated, Interactions_ItemsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('interactionitems') + '/test/flp.html#app-preview',
        pages: {
			onTheInteractions_HeaderListGenerated: Interactions_HeaderListGenerated,
			onTheInteractions_HeaderObjectPageGenerated: Interactions_HeaderObjectPageGenerated,
			onTheInteractions_ItemsObjectPageGenerated: Interactions_ItemsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

