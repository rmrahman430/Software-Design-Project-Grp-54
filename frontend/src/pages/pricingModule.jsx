
export function calculatePrice(gallonsRequested, state, hasHistory) {
  const currentPricePerGallon = 1.50;
  const locationFactor = state === 'TX' ? 0.02 : 0.04;
  const rateHistoryFactor = hasHistory ? 0.01 : 0;
  const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
  const companyProfitFactor = 0.10;

  const margin = (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor) * currentPricePerGallon;
  const suggestedPricePerGallon = currentPricePerGallon + margin;
  const totalAmountDue = gallonsRequested * suggestedPricePerGallon;

  return {
      suggestedPricePerGallon,
      totalAmountDue
  };
}