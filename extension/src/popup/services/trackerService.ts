export const toggleTracker = (isPaused: boolean) => {
    const newState = !isPaused;
    chrome.runtime.sendMessage({ type: "PAUSE_TRACKER", paused: newState });
    return newState;
};

export const toggleSiteTracking = (site: string | null, isPaused: boolean) => {
    if (!site) return isPaused;
    const newState = !isPaused;
    chrome.runtime.sendMessage({ type: "PAUSE_SITE", site, paused: newState });
    return newState;
};
