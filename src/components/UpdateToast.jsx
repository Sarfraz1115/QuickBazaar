import { useRegisterSW } from "virtual:pwa-register/react";
import "../CSS/updateToast.css";

const isDev = import.meta.env.DEV;

function UpdateToast() {
    const { needRefresh, updateServiceWorker } = useRegisterSW();

    if (isDev || !needRefresh) return null;

    const handleUpdate = async () => {
        if (sessionStorage.getItem("updated")) return;

        sessionStorage.setItem("updated", "true");
        await updateServiceWorker(true);
        window.location.reload();
    };


    return (
        <div className="update-toast">
            <p>⚡ New update available!</p>
            <button onClick={handleUpdate}>
                Update Now
            </button>
        </div>
    );
}

export default UpdateToast;
