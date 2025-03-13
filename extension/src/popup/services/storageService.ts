const defaultValues = {
    lastVisitedSite: null as string | null,
};

// Типы ключей и значений
type StorageKeys = keyof typeof defaultValues;
type StorageValues<K extends StorageKeys> = (typeof defaultValues)[K];

// Универсальная функция для получения значения
export const getStorageValue = <K extends StorageKeys>(
    key: K,
    callback: (value: StorageValues<K>) => void,
) => {
    chrome.storage.local.get([key], (result) => {
        callback((result[key] as StorageValues<K>) ?? defaultValues[key]);
    });
};

// Универсальная подписка на изменения
export const subscribeToStorageChanges = <K extends StorageKeys>(
    key: K,
    callback: (value: StorageValues<K>) => void,
) => {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
        if (changes[key]) {
            console.log(`🌍 Обновление ${key}:`, changes[key].newValue);
            callback(changes[key].newValue as StorageValues<K>);
        }
    };
    chrome.storage.onChanged.addListener(listener);
    return () => {
        console.log(`🛑 Удаляем слушатель изменений ${key}`);
        chrome.storage.onChanged.removeListener(listener);
    };
};
