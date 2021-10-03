import React from "react";

export default function InventoryStats({ inventory }) {
  let totalInventory = 0;
  let totalDamaged = 0;

  const getStats = items => {
    if (items) {
      for (let i = 0; i <= items.length; i++) {
        if (items[i]) {
          console.log(parseInt(items[i].received));
          let iTotals = items[i].received - items[i].damaged;
          totalDamaged += items[i].damaged;
          totalInventory += iTotals;
        }
      }
    }
  };

  if (inventory) {
    getStats(inventory);
  }

  return (
    <div className="flex">
      <div className="ml-4 border px-4 py-1">
        Total inventory: {totalInventory}
      </div>
      <div className="ml-4 border px-4 py-1">Total damaged: {totalDamaged}</div>
    </div>
  );
}
