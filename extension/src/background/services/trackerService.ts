// Проверяет, приостановлен ли глобальный трекер (считывает из chrome.storage)
export const isTrackerPaused = async (): Promise<boolean> => {
    return new Promise((resolve) => {
        chrome.storage.local.get(["trackerPaused"], (result) => {
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
