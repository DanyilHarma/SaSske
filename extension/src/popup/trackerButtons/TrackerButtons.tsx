import { FC, useEffect, useState } from "react";
import { toggleSiteTracking, toggleTracker } from "../services/trackerService";
import { getStorageValue, subscribeToStorageChanges } from "../services/storageService";

interface TrackerButtonsProps {
    site: string | null;
}

const TrackerButtons: FC<TrackerButtonsProps> = ({ site }) => {
    const [isTrackedPause, setIsTrackedPause] = useState<boolean>(false);
    const [isSiteTrackedPause, setIsSiteTrackedPause] = useState<boolean>(false);

    useEffect(() => {
        getStorageValue("trackerPaused", setIsTrackedPause);
        const unsubscribe = subscribeToStorageChanges("trackerPaused", setIsTrackedPause);
        return unsubscribe;
    }, []);

    return (
        <div className="flex flex-col gap-1">
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                onClick={() => setIsTrackedPause(toggleTracker(isTrackedPause))}
            >
                {isTrackedPause ? "▶️ Включить трекер" : "⏸ Остановить трекер"}
            </button>
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setIsSiteTrackedPause(toggleSiteTracking(site, isSiteTrackedPause))}
                disabled={!site}
            >
                {isSiteTrackedPause ? `Включить трекер на ${site}` : `Отключить трекер на ${site}`}
            </button>
        </div>
    );
};

export default TrackerButtons;
