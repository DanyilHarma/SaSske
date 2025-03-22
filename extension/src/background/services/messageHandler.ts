import { MessageType } from "../../constants/messageTypes";
import { IMessage } from "../types/message";
import { saveTime } from "./storageServiceBackground";
import {
    getPausedSites,
    isTrackerPaused,
    toggleSiteTracking,
    toggleTracker,
} from "./trackerService";

export const handleMessage = (
    message: IMessage,
    _: chrome.runtime.MessageSender,
    sendResponse: (response?: unknown) => void,
): boolean => {
    switch (message.type) {
        case MessageType.GET_ACTIVE_SITE:
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0].url) {
                    const domain = new URL(tabs[0]?.url).hostname;
                    sendResponse({ site: domain });
                }
            });
            return true;

        case MessageType.GET_TRACKER_STATE:
            isTrackerPaused().then((paused) => {
                sendResponse({ paused });
            });
            return true;

        case MessageType.GET_PAUSED_SITES:
            getPausedSites().then((sites) => sendResponse({ pausedSites: sites }));
            return true;

        case MessageType.PAUSE_SITE:
            if (typeof message.site !== "string" || typeof message.paused !== "boolean") {
                console.error(
                    "PAUSE_SITE received without valid 'site' string || 'paused' boolean",
                );
                return false;
            }
            toggleSiteTracking(message.site, message.paused).then(() =>
                sendResponse({ success: true }),
            );
            return true;

        case MessageType.PAUSE_TRACKER:
            if (typeof message.paused !== "boolean") {
                console.error("PAUSE_TRACKER received without valid 'paused' boolean");
                return false;
            }
            toggleTracker(message.paused).then(() => sendResponse({ success: true }));
            return true;

        case MessageType.SAVE_TIME:
            if (typeof message.site !== "string" || typeof message.timeSpent !== "number") {
                console.error(
                    "SAVE_TIME received without valid 'site' string || 'timeSpent' number",
                );
                return false;
            }
            saveTime(message.site, message.timeSpent);
            sendResponse({ success: true });
            return true;

        default:
            console.warn("Unknown type of message:", message.type);
            sendResponse({ success: false });
            return false;
    }
};
