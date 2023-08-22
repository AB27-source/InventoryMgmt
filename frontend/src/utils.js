// utils.js
/**
 * Calculate the book count based on the provided parameters.
 * 
 * @param {number} endCountPreviousDay - The end count from the previous day.
 * @param {number} numInventorySold - The number of inventory items sold. N/A
 * @param {number} numInventoryBought - The number of inventory items bought/added.
 * @param {number} inventoryTransferred - The number of inventory items transferred. N/A
 * @param {number} previousDaySales - The sales from the previous day.
 * 
 * @returns {number} - The calculated book count.
 */
export function calculateBookCount(
  endCountPreviousDay,
  // numInventorySold,
  numInventoryBought,
  // inventoryTransferred,
  previousDaySales
) {
  return (
    endCountPreviousDay +
    // numInventorySold +
    numInventoryBought -
    // inventoryTransferred -
    previousDaySales
  );
}

/**
 * Calculate the variance based on the actual count and the book count.
 * 
 * @param {number} actualCount - The actual count.
 * @param {number} bookCount - The book count.
 * 
 * @returns {number} - The calculated variance.
 */
export function calculateVariance(actualCount, bookCount) {
  return (actualCount - bookCount);
}
