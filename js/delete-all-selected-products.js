/**
 * Manejador del evento click para el botón de borrar todo.
 * @param {Event} evt - El evento que dispara la función.
 */
export function deleteAllSelectedProducts(evt) {
  const selectedProductCounter = document.getElementById("selected-product-counter");
  const economicQualitySum = document.getElementById("economic-quality-sum");
  const highQualitySum = document.getElementById("high-quality-sum");
  const selectedProductContainer = document.getElementById("selected-product-container");
  const showDownloadCotiBtn = document.getElementById("show-download-coti");
  const showImageBtn = document.getElementById("show-image");
  
  evt.target.setAttribute("disabled", "");
  
  selectedProductCounter.textContent = 0;
  economicQualitySum.textContent = 0;
  highQualitySum.textContent = 0;
  selectedProductContainer.innerHTML = "";
  showDownloadCotiBtn.setAttribute("disabled", "");
  showImageBtn.setAttribute("disabled", "");
}
