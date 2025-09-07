// /src/Utils/googleSheet.js

const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function saveOrderToSheet(order) {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ Yahan poora `order` object bhejein
      body: JSON.stringify(order), 
    });

    if (response.type !== "opaque") {
      throw new Error("Failed to save order to Google Sheet due to network issue.");
    }
    
    console.log("✅ Order sent to Google Sheet successfully.");
    return { success: true, message: "Order saved successfully." };

  } catch (err) {
    console.error("❌ Error saving order to Google Sheet:", err);
    return { success: false, error: err.message };
  }
}