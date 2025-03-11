// Следим за переключением вкладок
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab.url) {
            const domain = new URL(tab.url).hostname;
            chrome.storage.local.set({ lastVisitedSite: domain });
            chrome.tabs.sendMessage(activeInfo.tabId, { type: "UPDATE_SITE", site: domain }, () => {
                if (chrome.runtime.lastError) {
                    console.warn(
                        "Контент-скрипт не получил UPDATE_SITE:",
                        chrome.runtime.lastError.message,
                    );
                } else {
                    console.log("Контент-скрипт принял UPDATE_SITE");
                }
            });
            console.log(`🌍 Переключение на: ${domain}`);
        }
    });
});

// Следим за фокусом браузера
chrome.windows.onFocusChanged.addListener((windowId) => {
    const isBrowserActive = windowId !== chrome.windows.WINDOW_ID_NONE;
    chrome.storage.local.set({ browserActive: isBrowserActive });
    console.log(isBrowserActive ? "▶️ Браузер в фокусе" : "⏸ Браузер свёрнут");
});

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
