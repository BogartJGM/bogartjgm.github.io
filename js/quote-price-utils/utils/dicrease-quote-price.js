import { spanEconomicQualityQuotePrice, spanHighQualityQuotePrice } from "../dom-elements/quote-price-labels";

export function dicreaseEconomicQualityQuotePrice(quantity, price) {
  spanEconomicQualityQuotePrice.textContent = Number(spanEconomicQualityQuotePrice.textContent) - price * quantity;
}

export function dicreaseHighQualityQuotePrice(quantity, price) {
  spanHighQualityQuotePrice.textContent = Number(spanHighQualityQuotePrice.textContent) - price * quantity;
}

/*
  Esta función lo que hace es aumentar ambas calidades. Se puede obtener la misma función utilizando las dos funciones de arriba
*/
export function dicreaseTotalQualityQuantity(priceTds, quantity) {
  const totalQualityE = document.getElementById("economic-quality-sum");
  const totalQualityA = document.getElementById("high-quality-sum");

  totalQualityE.textContent =
    Number(totalQualityE.textContent) -
    Number(priceTds[0].textContent) * (quantity == "" ? 1 : Number(quantity));
  totalQualityA.textContent =
    Number(totalQualityA.textContent) -
    Number(priceTds[1].textContent) * (quantity == "" ? 1 : Number(quantity));
}
