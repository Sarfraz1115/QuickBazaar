export async function sendOrderToTelegram(order) {
    // const token = "8454746317:AAEEPtMr8p6jrOwuT6V3zPJVtdLnzMnzS3s"; // <-- yahan apna bot token daalein
    // const chatId = "-1002785236558"; // <-- yahan apna chat id daalein

    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    //   const itemsText = order.items
    //     .map(item => `- ${item.name} (${typeof item.qty === "number" ? item.qty : item.qty || 1})`)
    //     .join('\n');

    // const itemsText = order.items
    //     .map(item => `- ${item.name} (Qty: ${typeof item.qty === "string" ? item.qty : item.qty})`)
    //     .join('\n');

    const itemsText = order.items
        .map(item => `- ${item.name} (Qty: ${typeof item.qty === "string" ? item.qty : item.qty})`)
        .join('\n');

    const text = `
🛒 *New Order Received!*
Order ID: #${order.orderId}
Name: ${order.name}
Phone: ${order.phone}
Address: ${order.address}

*Items:*
${itemsText}

Subtotal: ₹${order.subtotal}
Delivery: ₹${order.delivery}
Total: ₹${order.total}
  `;

    try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                parse_mode: "Markdown"
            })
        });
    } catch (err) {
        console.error("Telegram error:", err);
    }
}