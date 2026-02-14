export const buildOrderItem = (order_id, data) => {
    let keys = [];
    let endKeys = [];
    let values = [];
    let i = 0;
    data.forEach((item) => {
      for (let [key, value] of Object.entries(item)) {
        if (keys.length === 0) {
          i++;
          keys.push(`$${i}`);
          values.push(order_id);
        }
        if (key !== 'id' && key !== "cart_id") {
          i++;
          keys.push(`$${i}`);
          values.push(value);
        } else {
          continue;
        }
      };
      endKeys.push("("+(keys.join(", "))+")");
      keys = [];
    })
    return { endKeys, values };
}