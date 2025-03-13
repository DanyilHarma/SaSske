// Функция сохранения времени в локальное хранилище
export const saveTime = (site: string, timeSpent: number): void => {
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
};
