chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SAVE_TIME") {
        chrome.storage.local.get([message.site], (result) => {
            const previousTime = result[message.site] || 0;
            const newTime = previousTime + message.timeSpent;

            chrome.storage.local.set({ [message.site]: newTime }, () => {
                console.log(`✅ Время на ${message.site}: ${newTime} секунд`);
            });
        });
    }
});
