import { MessageType } from "../../constants/messageTypes";

export const subscribeToMessages = (handlers: {
    onTrackerPaused: (paused: boolean) => void;
    onSiteTrackingUpdated: (site: string, paused: boolean) => void;
    onSiteUpdated: (site: string) => void;
}) => {
    chrome.runtime.onMessage.addListener((message) => {
        switch (message.type) {
            case MessageType.TRACKER_PAUSED: {
                handlers.onTrackerPaused(message.paused);
                break;
            }
            case MessageType.SITE_TRACKING_UPDATED:
                handlers.onSiteTrackingUpdated(message.site, message.paused);
                break;
            case MessageType.UPDATE_SITE:
                handlers.onSiteUpdated(message.site);
                break;
        }
    });
};
