import ReactDOM from "react-dom/client";
import "../index.css";
import { useEffect, useState } from "react";
import { getStorageValue, subscribeToStorageChanges } from "./services/storageService";
const Popup = () => {
    const [site, setSite] = useState<string | null>(null);

    useEffect(() => {
        getStorageValue("lastVisitedSite", setSite);
        const unsubscribe = subscribeToStorageChanges("lastVisitedSite", setSite);
        return unsubscribe;
    }, []);

    return (
        <div>
            <h1>Время на {site}</h1>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Popup />);
