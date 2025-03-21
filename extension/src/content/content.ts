import { throttle } from "./utils";

let lastInteraction: number = Date.now();
let activeTime: number = 0;
let lastUpdate: number = Date.now();
const INACTIVITY_THRESHOLD = 3 * 60 * 1000; // 3 минут
const SAVE_INTERVAL = 30 * 1000; // Сохраняем раз в пол минуты
let currentSite: string | null = null;

chrome.runtime.sendMessage({ type: "GET_ACTIVE_SITE" }, (response) => {
    if (response?.site) {
        currentSite = response.site;
        console.log(`🔄 Получен активный сайт: ${currentSite}`);
    }
});

const throttledUpdateInteractionTime = throttle(() => {
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
    if (document.visibilityState === "hidden") {
        sendTimeToBackground();
    }
});

window.addEventListener("beforeunload", sendTimeToBackground);

// Функция отправки времени в background.ts
function sendTimeToBackground() {
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
