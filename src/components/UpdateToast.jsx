import { useRegisterSW } from "virtual:pwa-register/react";
import "../CSS/updateToast.css";

const isDev = import.meta.env.DEV;

function UpdateToast() {
  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      console.log("Service Worker registered:", r);
    },
    onRegisterError(error) {
      console.error("SW registration error", error);
    },
  });

  if (isDev || !needRefresh) return null;

  return (
    <div className="update-toast">
      <p>⚡ New update available!</p>
      <button onClick={() => updateServiceWorker(true)}>
        Update Now
      </button>
    </div>
  );
}

export default UpdateToast;
