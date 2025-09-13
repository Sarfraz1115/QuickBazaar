import React, { useEffect, useState } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true); // ✅ show popup in center
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

  const handleClose = () => setShowPrompt(false);

  if (!showPrompt) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Install QuickKirana</h3>
        <p>Get the app for a faster and better experience.</p>
        <div style={styles.buttons}>
          <button onClick={handleInstall} style={styles.installBtn}>
            Install
          </button>
          <button onClick={handleClose} style={styles.cancelBtn}>
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    width: "80%",
    maxWidth: "350px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    


  },
  buttons: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-around",
  },
  installBtn: {
    background: "#2e7d32",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  cancelBtn: {
    background: "#ddd",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default InstallPrompt;
