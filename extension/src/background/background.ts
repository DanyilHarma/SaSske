import { sendMessageToTab } from "./helpers/messageHelper";
import {
    getPausedSites,
    isTrackerPaused,
    toggleSiteTracking,
    toggleTracker,
} from "./services/trackerService";

// Следим за переключением вкладок
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, async (tab) => {
        if (tab.url) {
            const domain = new URL(tab.url).hostname;
            chrome.storage.local.set({ lastVisitedSite: domain });

            const response = await sendMessageToTab(activeInfo.tabId, {
                type: "UPDATE_SITE",
                site: domain,
            });

            if (response !== null) console.log("✅ Content script accepted UPDATE_SITE");
            console.log(`🌍 Switched to: ${domain}`);
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

// Обрабатываем сообщения из popup.tsx об остановке глобального трекера
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    console.log("🔽 Получено сообщение в background:", message);
    if (message.type === "PAUSE_TRACKER") {
        toggleTracker(message.paused).then(() => sendResponse({ success: true }));
        return true;
    }

    if (message.type === "GET_TRACKER_STATE") {
        isTrackerPaused().then((paused) => {
            sendResponse({ paused });
        });
        return true;
    }

    if (message.type === "PAUSE_SITE") {
        toggleSiteTracking(message.site, message.paused).then(() =>
            sendResponse({ success: true }),
        );
        return true;
    }

    if (message.type === "GET_PAUSED_SITES") {
        getPausedSites().then((sites) => sendResponse({ pausedSites: sites }));
        return true;
    }
});
