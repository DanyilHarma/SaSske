import { MessageType } from "../../constants/messageTypes";

export const getInitialData = (): Promise<{
    pausedSites: string[];
    trackerPaused: boolean;
    currentSite: string | null;
}> => {
    const getPausedSites = new Promise<string[]>((resolve) => {
        chrome.runtime.sendMessage({ type: MessageType.GET_PAUSED_SITES }, (response) => {
            resolve(response?.pausedSites ?? []);
        });
    });

    const getTrackerState = new Promise<boolean>((resolve) => {
        chrome.runtime.sendMessage({ type: MessageType.GET_TRACKER_STATE }, (response) => {
            resolve(response?.paused ?? false);
        });
    });

    const getActiveSite = new Promise<string | null>((resolve) => {
        chrome.runtime.sendMessage({ type: MessageType.GET_ACTIVE_SITE }, (response) => {
            resolve(response?.site ?? null);
        });
    });

    return Promise.all([getPausedSites, getTrackerState, getActiveSite]).then(
        ([pausedSites, trackerPaused, activeSite]) => ({
            pausedSites,
            trackerPaused,
            currentSite: activeSite,
        }),
    );
};
