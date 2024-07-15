import { spanEconomicQualityQuotePrice, spanHighQualityQuotePrice } from "../dom-elements/sum-labels";

export function increaseEconomicQuotePrice(quantity, price) {
  spanEconomicQualityQuotePrice.textContent = Number(spanEconomicQualityQuotePrice.textContent) + price * quantity;
}

export function increaseHighQuotePrice(cantidad, price) {
  spanHighQualityQuotePrice.textContent = Number(spanHighQualityQuotePrice.textContent) + price * cantidad;
}

/*
 Esta función lo que hace es aumentar ambas calidades. Se puede obtener la misma función utilizando las dos funciones de arriba
*/
export function increaseQualityQuantity(priceTds, cantidad) {
  const QualityE = document.getElementById("economic-quality-sum");
  const QualityA = document.getElementById("high-quality-sum");

  QualityE.textContent =
    Number(QualityE.textContent) +
    Number(priceTds[0].textContent) * (cantidad == "" ? 1 : Number(cantidad));
  QualityA.textContent =
    Number(QualityA.textContent) +
    Number(priceTds[1].textContent) * (cantidad == "" ? 1 : Number(cantidad));
}
