export async function sendOrderToTelegram(order) {


    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    //   const itemsText = order.items
    //     .map(item => `- ${item.name} (${typeof item.qty === "number" ? item.qty : item.qty || 1})`)
    //     .join('\n');

    // const itemsText = order.items
    //     .map(item => `- ${item.name} (Qty: ${typeof item.qty === "string" ? item.qty : item.qty})`)
    //     .join('\n');

      // ✅ Naye logic mein, hum sidhe `item.qty` use kar sakte hain
      const itemsText = order.items
        .map(item => `- ${item.name} (Qty: ${item.displayQty || item.qty})`)
        .join('\n');

    const text = `
🛒 *Naya Order Aaya!*
---
*Order ID:* #${order.orderId}
*Customer Name:* ${order.name}
*Phone:* ${order.phone}
*Address:* ${order.address}

*Items:*
${itemsText}

*Subtotal:* ₹${order.subtotal.toFixed(2)}
*Delivery:* ₹${order.delivery.toFixed(2)}
*Total:* ₹${order.total.toFixed(2)}
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