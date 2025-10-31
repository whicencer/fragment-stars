export function displayPrice(starsAmount, tonRate) {
  if (!tonRate) return "Error receiving TON rate.";
  
  const oneStarPrice = 0.015;
  const dollarPrice = (starsAmount * oneStarPrice).toFixed(2);
  const tonPrice = (dollarPrice / tonRate).toFixed(4);

  return `${tonPrice} (~$${dollarPrice})`;
}