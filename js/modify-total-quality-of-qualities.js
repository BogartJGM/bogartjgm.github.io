export function increaseTotalQualityQuantity(priceTds, cantidad) {
  const totalQualityE = document.getElementById("economic-quality-sum");
  const totalQualityA = document.getElementById("high-quality-sum");

  totalQualityE.textContent = Number(totalQualityE.textContent) + (Number(priceTds[0].textContent) * (cantidad == "" ? 1 : Number(cantidad)));
  totalQualityA.textContent = Number(totalQualityA.textContent) + (Number(priceTds[1].textContent) * (cantidad == "" ? 1 : Number(cantidad)));;
}

export function dicreaseTotalQualityQuantity(priceTds, cantidad) {
  const totalQualityE = document.getElementById("economic-quality-sum");
  const totalQualityA = document.getElementById("high-quality-sum");

  totalQualityE.textContent = Number(totalQualityE.textContent) - (Number(priceTds[0].textContent) * (cantidad == "" ? 1 : Number(cantidad)));
  totalQualityA.textContent = Number(totalQualityA.textContent) - (Number(priceTds[1].textContent) * (cantidad == "" ? 1 : Number(cantidad)));;
}

export function increaseTotalQualityE(cantidad, price) {
  const totalQualityE = document.getElementById("economic-quality-sum");
  
  totalQualityE.textContent = Number(totalQualityE.textContent) + price * cantidad;
}

export function dicreaseTotalQualityE(cantidad, price) {
  const totalQualityE = document.getElementById("economic-quality-sum");

  totalQualityE.textContent = Number(totalQualityE.textContent) - price * cantidad;
}

export function increaseTotalQualityA(cantidad, price) {
  const totalQualityA = document.getElementById("high-quality-sum");

  totalQualityA.textContent = Number(totalQualityA.textContent) + price * cantidad;
}

export function dicreaseTotalQualityA(cantidad, price) {
  const totalQualityA = document.getElementById("high-quality-sum");

  totalQualityA.textContent = Number(totalQualityA.textContent) - price * cantidad;
}