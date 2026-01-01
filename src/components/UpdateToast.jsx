import { useRegisterSW } from "virtual:pwa-register/react";
import "../CSS/updateToast.css";

const isDev = import.meta.env.DEV;

function UpdateToast() {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  // 🔥 agar already update apply ho chuka hai
  const alreadyUpdated = localStorage.getItem("pwa-updated");

  if (isDev || !needRefresh || alreadyUpdated) return null;

  const handleUpdate = async () => {
    // 🔥 mark update as done
    localStorage.setItem("pwa-updated", "true");

    await updateServiceWorker(true);

    // 🔥 hard reload (mandatory)
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
