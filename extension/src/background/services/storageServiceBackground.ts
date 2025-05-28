// Отправка имени сайта и времени на бэк
export const createOrUpdateSiteStat = async (site: string, timeSpent: number): Promise<void> => {
    console.log("SAVING TIME: ", site, timeSpent);
    try {
        const response = await fetch("http://localhost:5000/api/site-stat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ site, timeSpent }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Ошибка при отправке времени на сервер:", errorText);
        }
    } catch (error) {
        console.error("Ошибка сети при отправке времени:", error);
    }
};
