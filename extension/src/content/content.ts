import { throttle } from "./utils";

let lastInteraction: number = Date.now();
let activeTime: number = 0;
let lastUpdate: number = Date.now();
const INACTIVITY_THRESHOLD = 3 * 60 * 1000; // 3 минут
const SAVE_INTERVAL = 30 * 1000; // Сохраняем раз в пол минуты
let currentSite: string | null = null;
let isActiveTab: boolean = true;
let trackerPaused = false;
let pausedSites: string[] = [];

chrome.runtime.sendMessage({ type: "GET_PAUSED_SITES" }, (response) => {
    pausedSites = response?.pausedSites ?? [];
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SITE_TRACKING_UPDATED") {
        if (message.paused) {
            pausedSites.push(message.site);
        } else {
            pausedSites = pausedSites.filter((s) => s !== message.site);
        }
        console.log(`🔹 Обновлен список заблокированных сайтов: ${pausedSites}`);
    }
});

chrome.storage.onChanged.addListener((changes) => {
    if (changes.trackerPaused) {
        trackerPaused = changes.trackerPaused.newValue;
    }
    if (changes.pausedSites) {
        pausedSites = changes.pausedSites.newValue;
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "TRACKER_PAUSED") {
        trackerPaused = message.paused;
        console.log(`⏸ Трекер ${trackerPaused ? "остановлен" : "включен"}`);
    }
    if (!trackerPaused) {
        lastInteraction = Date.now();
        lastUpdate = Date.now();
        activeTime = 0;
    }
});

chrome.runtime.sendMessage({ type: "GET_TRACKER_STATE" }, (response) => {
    trackerPaused = response?.paused || false;
});

chrome.runtime.sendMessage({ type: "GET_ACTIVE_SITE" }, (response) => {
    if (response?.site) {
        currentSite = response.site;
        console.log(`🔄 Получен активный сайт: ${currentSite}`);
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "UPDATE_SITE") {
        console.log(`🔄 Вкладка переключена на: ${message.site}`);
    }
    if (currentSite && currentSite !== message.site) {
        sendTimeToBackground();
    }
    currentSite = message.site;
    lastInteraction = Date.now();
    activeTime = 0;
});

const throttledUpdateInteractionTime = throttle(() => {
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

// Следим за активностью пользователя
document.addEventListener("mousemove", throttledUpdateInteractionTime);
document.addEventListener("keydown", throttledUpdateInteractionTime);
document.addEventListener("scroll", throttledUpdateInteractionTime);

// Отправляем раз в 30 секунд
setInterval(sendTimeToBackground, SAVE_INTERVAL);

// Отправляем данные при уходе со страницы
document.addEventListener("visibilitychange", () => {
    isActiveTab = document.visibilityState === "visible";
    if (!isActiveTab) {
        sendTimeToBackground();
    }
});

window.addEventListener("beforeunload", sendTimeToBackground);

// Функция отправки времени в background.ts
function sendTimeToBackground() {
    if (!currentSite) return;
    const timeSpent = Math.round(activeTime / 1000);
    if (timeSpent > 0) {
        chrome.runtime.sendMessage({
            type: "SAVE_TIME",
            site: currentSite,
            timeSpent: timeSpent,
        });
        console.log(`⏳ Отправлено: ${timeSpent} сек.`);
    }
    activeTime = 0; // Обнуляем счетчик после отправки
}
