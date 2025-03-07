chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "GET_ACTIVE_SITE") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]?.url) {
                const domain = new URL(tabs[0]?.url).hostname;
                sendResponse({ site: domain });
            }
        });
        return true;
    }
    if (message.type === "SAVE_TIME") {
        saveTime(message.site, message.timeSpent);
    }
});

// Функция сохранения времени в локальное хранилище
function saveTime(site: string, timeSpent: number) {
    chrome.storage.local.get([site], (result) => {
        const previousTime = result[site] || 0;
        const newTime = previousTime + timeSpent;

        chrome.storage.local.set({ [site]: newTime }, () => {
            if (chrome.runtime.lastError) {
                console.error(
                    "Ошибка при сохранении в `chrome.storage.local`:",
                    chrome.runtime.lastError,
                );
            } else {
                console.log(`✅ Время на ${site}: ${newTime} секунд`);
            }
        });
    });
}
