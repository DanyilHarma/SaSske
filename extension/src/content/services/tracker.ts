import { MessageType } from "../../constants/messageTypes";
import { throttle } from "../utils/utils";

let lastInteraction = Date.now();
let activeTime = 0;
let lastUpdate = Date.now();
let currentSite: string | null = null;
let pausedSites: string[] = [];
let trackerPaused = false;
let isActiveTab = true;
const INACTIVITY_THRESHOLD = 180000; // 3 min
const SAVE_INTERVAL = 30000; // 30 sec

export const initializeTracker = (initialData: {
    currentSite: string | null;
    pausedSites: string[];
    trackerPaused: boolean;
}) => {
    currentSite = initialData.currentSite;
    pausedSites = initialData.pausedSites;
    trackerPaused = initialData.trackerPaused;

    document.addEventListener("mousemove", throttledTrackInteraction);
    document.addEventListener("keydown", throttledTrackInteraction);
    document.addEventListener("scroll", throttledTrackInteraction);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", sendTimeToBackground);

    setInterval(sendTimeToBackground, SAVE_INTERVAL);
};

const throttledTrackInteraction = throttle(() => {
    if (trackerPaused || !isActiveTab || (currentSite && pausedSites.includes(currentSite))) return;

    const now = Date.now();
    if (now - lastInteraction >= INACTIVITY_THRESHOLD) {
        lastUpdate = now;
    } else {
        activeTime += now - lastUpdate;
    }
    lastInteraction = now;
    lastUpdate = now;
}, 1000);

const handleVisibilityChange = () => {
    isActiveTab = document.visibilityState === "visible";
    if (!isActiveTab) sendTimeToBackground();
};

const sendTimeToBackground = () => {
    if (!currentSite) return;

    const timeSpent = Math.round(activeTime / 1000);
    if (timeSpent > 0) {
        chrome.runtime.sendMessage({
            type: MessageType.SAVE_TIME,
            site: currentSite,
            timeSpent,
        });
    }
    activeTime = 0;
};

export const updateCurrentSite = (site: string) => {
    sendTimeToBackground();
    currentSite = site;
    activeTime = 0;
};

export const updatePausedSites = (site: string, paused: boolean) => {
    pausedSites = paused ? [...pausedSites, site] : pausedSites.filter((s) => s !== site);
};

export const updateTrackerPaused = (paused: boolean) => {
    trackerPaused = paused;
};
