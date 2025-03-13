export const toggleTracker = async (isPaused: boolean): Promise<boolean> => {
    const newState = !isPaused;
    chrome.runtime.sendMessage({ type: "PAUSE_TRACKER", paused: newState });
    return newState;
};

export const toggleSiteTracking = async (
    site: string | null,
    isPaused: boolean,
): Promise<boolean> => {
    if (!site) return isPaused;
    const newState = !isPaused;
    chrome.runtime.sendMessage({ type: "PAUSE_SITE", site, paused: newState });
    return newState;
};

export const getPausedSites = async (): Promise<string[]> => {
    const response = await chrome.runtime.sendMessage({ type: "GET_PAUSED_SITES" });
    return response?.pausedSites ?? [];
};
