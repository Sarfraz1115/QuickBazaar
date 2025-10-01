import React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import "../CSS/updatetoast.css";

const intervalMS = 60 * 60 * 1000; // 1 ghante me update check
const isDev = import.meta.env.DEV;

function App() {
    const {
        needRefresh,
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            console.log("Service Worker registered:", r);
        },
        onRegisterError(error) {
            console.error("SW registration error", error);
        },
    });

    return (
        <>
            {/* baaki tumhara app */}

            {!isDev && needRefresh && (
                <div className="update-toast">
                    <p>⚡ New update available!</p>
                    <button onClick={() => updateServiceWorker(true)}>
                        Refresh
                    </button>
                </div>
            )}
        </>
    );
}

export default App;
