const site: string = document.location.hostname;
let lastInteraction: number = Date.now();
let activeTime: number = 0;
let lastUpdate: number = Date.now();
const INACTIVITY_THRESHOLD = 5 * 1000; // 5 секунд для теста

const updateInteractionTime = () => {
    const now = Date.now();
    if (now - lastInteraction < INACTIVITY_THRESHOLD) {
        activeTime += now - lastUpdate;
    }
    lastInteraction = now;
    lastUpdate = now;
};

document.addEventListener("mousemove", updateInteractionTime);
document.addEventListener("keydown", updateInteractionTime);
document.addEventListener("scroll", updateInteractionTime);

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        sendTimeToBackground();
    }
});

window.addEventListener("beforeunload", sendTimeToBackground);

function sendTimeToBackground() {
    const timeSpent = Math.round(activeTime / 1000);
    if (timeSpent > 0) {
        chrome.runtime.sendMessage({
            type: "SAVE_TIME",
            site: site,
            timeSpent: timeSpent,
        });
        console.log(`⏳ Отправлено: ${timeSpent} сек. на ${site}`);
    } else {
        console.log("⏳ Пользователь был неактивен, время не учитывается.");
    }
    activeTime = 0; // Сбрасываем счетчик
}
