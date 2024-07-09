export const applyProfitMargin = (rate, profitMargin, fee) => {
  const profitRate = rate * (profitMargin / 100);
  const rawOfferedRate = rate - profitRate;
  const offeredRate = Math.floor(rawOfferedRate * 100) / 100; // Truncate to 2 decimal places
  const additionalProfit = rawOfferedRate - offeredRate;
  return {
    offeredRate: offeredRate.toFixed(2),
    profit: (fee + profitRate + additionalProfit).toString(),
  };
};

export const transferProfit = (rate, profitMargin, transferAmount) => {
  const { _, profit } = applyProfitMargin(rate, profitMargin);

  return profit * transferAmount;
};
