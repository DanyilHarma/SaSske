import ReactDOM from "react-dom/client";
import "../index.css";
import { getStorageValue, subscribeToStorageChanges } from "./services/storageService";
import { FC, useEffect, useState } from "react";
import TrackerButtons from "./trackerButtons/TrackerButtons";

const Popup: FC = () => {
    const [site, setSite] = useState<string | null>(null);

    useEffect(() => {
        getStorageValue("lastVisitedSite", setSite);
        const unsubscribe = subscribeToStorageChanges("lastVisitedSite", setSite);
        return unsubscribe;
    }, []);

    return (
        <div className="p-4">
            <h1>Время на {site}</h1>
            <TrackerButtons site={site} />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Popup />);
