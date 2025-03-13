const STORAGE_KEYS = {
    globalPause: "trackerPaused",
    pausedSites: "pausedSites",
};

// Проверяет, приостановлен ли глобальный трекер (считывает из chrome.storage)
export const isTrackerPaused = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.globalPause], (result) => {
            resolve(result.trackerPaused || false);
        });
    });
};

// Переключает состояние глобального трекера и отправляет обновленное состояние во все вкладки
export const toggleTracker = async (paused: boolean): Promise<void> => {
    chrome.storage.local.set({ trackerPaused: paused });

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, { type: "TRACKER_PAUSED", paused });
            }
        });
    });
};

// Получает список сайтов, у которых трекинг отключен
export const getPausedSites = async (): Promise<string[]> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEYS.pausedSites], (result) => {
            resolve(result[STORAGE_KEYS.pausedSites] ?? []);
        });
    });
};
// Включает/выключает трекер для конкретного сайта
export const toggleSiteTracking = async (site: string, paused: boolean): Promise<void> => {
    const pausedSites = await getPausedSites();
    const updatedSites = paused
        ? [...new Set([...pausedSites, site])]
        : pausedSites.filter((s) => s !== site);

    chrome.storage.local.set({ [STORAGE_KEYS.pausedSites]: updatedSites });

    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.id) {
                chrome.tabs.sendMessage(tab.id, { type: "SITE_TRACKING_UPDATED", site, paused });
            }
        });
    });
};
