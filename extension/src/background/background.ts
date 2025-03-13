import { sendMessageToTab } from "./helpers/messageHelper";
import { handleMessage } from "./services/messageHandler";

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

// Обработка сообщений
chrome.runtime.onMessage.addListener(handleMessage);
