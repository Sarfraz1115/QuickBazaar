import localforage from "localforage";

// DB config
localforage.config({
  name: "QuickKirana",
  storeName: "orders", // table name
});

// webapp url:   https://script.google.com/macros/s/AKfycbyEJnnAiFfz8OPPPxz7Ph0dbStyMFIGCxj5Kxllrt1RbBm71FaG2CV_Nz_1FiHTIOMx/exec
// deployment Id:  AKfycbyEJnnAiFfz8OPPPxz7Ph0dbStyMFIGCxj5Kxllrt1RbBm71FaG2CV_Nz_1FiHTIOMx

// Save order
export async function saveOrder(order) {
  let orders = (await localforage.getItem("orders")) || [];
  orders.push(order);
  await localforage.setItem("orders", orders);
}

// Get all orders
export async function getOrders() {
  return (await localforage.getItem("orders")) || [];
}

// Clear all orders (optional)
export async function clearOrders() {
  await localforage.removeItem("orders");
}