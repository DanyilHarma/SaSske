import { subscribeToMessages } from "./services/messageService";
import { getInitialData } from "./services/storageServiceContent";

import {
    initializeTracker,
    updateCurrentSite,
    updatePausedSites,
    updateTrackerPaused,
} from "./services/tracker";

getInitialData().then((initialData) => {
    initializeTracker(initialData);

    subscribeToMessages({
        onTrackerPaused: updateTrackerPaused,
        onSiteTrackingUpdated: updatePausedSites,
        onSiteUpdated: updateCurrentSite,
    });
});
