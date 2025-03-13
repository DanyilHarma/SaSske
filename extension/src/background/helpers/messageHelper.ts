export const sendMessageToTab = async <T = unknown>(
    tabId: number,
    message: object,
): Promise<T | null> => {
    return new Promise((resolve) => {
        chrome.tabs.sendMessage(tabId, message, (response) => {
            if (chrome.runtime.lastError) {
                console.warn(
                    `Tab ${tabId} has no content-script`,
                    chrome.runtime.lastError.message,
                );
                resolve(null);
            } else {
                resolve(response);
            }
        });
    });
};
