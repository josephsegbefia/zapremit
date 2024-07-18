export function calculateOfferedRateAndUnitProfit(
  actualRate,
  profitMarginPercent,
  fee
) {
  // Calculate the profit margin as a percentage of the actual rate
  let profitMargin = actualRate * (profitMarginPercent / 100);

  // Calculate the offered rate by applying the profit margin to the actual rate
  let offeredRate = actualRate - profitMargin;

  // Calculate the unit profit (profit made on sending 1 cedi)
  let unitProfit = profitMargin;

  return {
    offeredRate: offeredRate.toFixed(2),
    unitProfit: unitProfit.toFixed(2),
  };
}

export function calculateTotalProfit(unitProfit, fee, amountSent) {
  // Calculate the total profit per transaction
  let totalProfitPerTransaction = unitProfit * amountSent + fee;

  return {
    totalProfitPerTransaction: totalProfitPerTransaction.toFixed(2),
  };
}
