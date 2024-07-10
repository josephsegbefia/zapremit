export const applyProfitMargin = (rate, profitMargin, fee) => {
  const profitRate = rate * (profitMargin / 100);
  const rawOfferedRate = rate - profitRate;
  const offeredRate = Math.floor(rawOfferedRate * 100) / 100; // Truncate to 2 decimal places
  const additionalProfit = rawOfferedRate - offeredRate;
  return {
    offeredRate: offeredRate.toFixed(2),
    profit: (fee + profitRate + additionalProfit).toFixed(2), // Ensure profit is a fixed 2 decimal places string
  };
};

export const transferProfit = (rate, profitMargin, transferAmount) => {
  const { offeredRate, profit } = applyProfitMargin(rate, profitMargin, 0); // Assuming no fee here for calculation
  return (profit * transferAmount).toFixed(2); // Fixed 2 decimal places for consistency
};
