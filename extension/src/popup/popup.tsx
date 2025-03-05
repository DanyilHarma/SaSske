import ReactDOM from "react-dom/client";
import "../index.css";

const Popup = () => {
    return <h1 className="text-red-400">Hello from Popup!</h1>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Popup />);
