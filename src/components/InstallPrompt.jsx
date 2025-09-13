import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // show popup when event fires
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("User installed app");
    } else {
      console.log("User dismissed install");
    }
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div style={styles.popup}>
      <p>Install the QuickKirana App for better experience</p>
      <button onClick={handleInstall} style={styles.button}>
        Install
      </button>
    </div>
  );
};

const styles = {
  popup: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px 20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 1000
  },
  button: {
    marginLeft: "10px",
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default InstallPrompt;
