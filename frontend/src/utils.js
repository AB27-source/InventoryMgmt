// utils.js

export function calculateBookCount(
  endCountPreviousDay,
  numInventorySold,
  numInventoryBought,
  inventoryTransferred,
  previousDaySales
) {
  return (
    endCountPreviousDay +
    numInventorySold +
    numInventoryBought -
    inventoryTransferred -
    previousDaySales
  );
}

export function calculateVariance (actualCount, bookCount){
  return (actualCount - bookCount);
};

