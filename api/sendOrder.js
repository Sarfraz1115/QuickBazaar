// api/sendOrder.js
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = JSON.parse(req.body);
    const { order } = body;

    // const token = process.env.VITE_TELEGRAM_BOT_TOKEN;
    // const chatId = process.env.VITE_TELEGRAM_CHAT_ID;
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;



    const itemsText = order.items
      .map(item => `- ${item.name} (Qty: ${item.displayQty || item.qty})`)
      .join("\n");

    const text = `
🛒 *Naya Order Aaya!*
*Customer:* ${order.name}
*Phone:* ${order.phone}
*Address:* ${order.address}

*Items:*
${itemsText}

*Total:* ₹${order.total.toFixed(2)}
`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
