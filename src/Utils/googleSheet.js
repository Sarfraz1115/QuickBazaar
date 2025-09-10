// /src/Utils/googleSheet.js

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function saveOrderToSheet(order) {
  try {
    // console.log("🚀 Starting to send order to Google Sheet");
    // console.log("📋 Order data:", JSON.stringify(order, null, 2));
    // console.log("🌐 Google Sheet URL:", GOOGLE_SHEET_URL);
    
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order), 
    });

    // console.log("📡 Response received:", response);
    // console.log("✅ Order sent to Google Sheet successfully.");
    return { success: true, message: "Order saved successfully." };

  } catch (err) {
    console.error("❌ Error saving order to Google Sheet:", err);
    console.error("📋 Order data that failed:", JSON.stringify(order, null, 2));
    return { success: false, error: err.message };
  }
}