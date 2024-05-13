// @ts-nocheck
import { handleButtonClick, handleFocusOut, handleTdInput, handleTdKeyDown } from "./table-events-handlers.js";
import { dicreaseTotalQualityQuantity, increaseTotalQualityQuantity } from "./modify-total-quality-of-qualities.js";
/**
 * Copia el elemento pasado como @productCardDiv y lo añade a la columna de productos seleccionados.
 * En el proceso de copiado, añade sus eventos y modifica su clases.
 *
 * @param {HTMLDivElement} productCardDiv - El elemento a ser insertado en la columna de productos seleccionados.
 */
export function anadirProductSelected(productCardDiv) {
  // DOM
  const productSelectedSearchBar = document.getElementById("selected-product-search-bar");
  const productSelectedContainer = document.getElementById("selected-product-container");
  const downloadCotiButton = document.getElementById("download-coti");
  const showImage = document.getElementById("show-image");
  const productsSelectedCounter = document.getElementById("selected-product-counter");

  // Copia @productCardDiv (param1) y obtiene elementos dentro de esa copia
  const productCardCopy = productCardDiv.cloneNode(true);
  const buttonSelectedCard = productCardCopy.querySelectorAll("button.btn.btn-success.col-2")[0];
  const buttonsEdit = productCardCopy.querySelectorAll(".buttonEdit");
  const tdsEditable = productCardCopy.querySelectorAll(".search");
  const priceTds = productCardCopy.querySelectorAll(".price");
  const cantidad = productCardCopy.querySelector(".cantidad");

  // Activar barra de búsqueda de productos seleccionados y botón de descargar cotización
  if (productSelectedSearchBar.attributes["disabled"]) {
    productSelectedSearchBar.removeAttribute("disabled");
  }
  if (downloadCotiButton.attributes["disabled"]) {
    downloadCotiButton.removeAttribute("disabled");
  }
  if (showImage.attributes["disabled"]) {
    showImage.removeAttribute("disabled");
  }

  // Cambiar atributos del elemento dentro del elemento copiado
  productCardCopy.classList.remove("product");
  productCardCopy.classList.add("productSelected");
  buttonSelectedCard.classList.remove("btn-success");
  buttonSelectedCard.classList.add("btn-danger");
  buttonSelectedCard.classList.add("btn-danger");
  buttonSelectedCard.textContent = "-";
  
  //Añadir producto a la tercera columna
  productSelectedContainer.appendChild(productCardCopy);

  // Aumentar contador de productos seleccionados y precio total de ambas calidades
  productsSelectedCounter.textContent = Number(productsSelectedCounter.textContent) + 1;
  increaseTotalQualityQuantity(priceTds, cantidad.value);

  // Listeners
  buttonsEdit.forEach((buttonEdit) => {
    buttonEdit.addEventListener("click", () => {
      handleButtonClick(buttonEdit.parentElement.previousSibling);
    });
  });
  tdsEditable.forEach((td) => {
    td.addEventListener("keydown", (event) => { handleTdKeyDown(td, event) });
    td.addEventListener("input", () => { handleTdInput(td) });
    td.addEventListener("focusout", () => { handleFocusOut(td) });
  });
  buttonSelectedCard.addEventListener("click", function (e) {
    // Controlar la animación de "quitado"
    productCardCopy.classList.remove("productSelected");
    productCardCopy.classList.add("productRemove");

    setTimeout(function () {
      productCardCopy.remove();

      // Comprobar si existen elementos seleccionados. Si no existen, desactivar barra de búsqueda y botones
      if (productSelectedContainer.innerHTML == "") {
        productSelectedSearchBar.setAttribute("disabled", "");
        productSelectedSearchBar.value = "";

        downloadCotiButton.setAttribute("disabled", "");
        showImage.setAttribute("disabled", "");
      }

      // Disminuye el contador de productos seleccionados y disminuye el precio total de ambas calidades
      productsSelectedCounter.textContent = Number(productsSelectedCounter.textContent) - 1;
      dicreaseTotalQualityQuantity(priceTds, cantidad.value);
    }, 100);
  });
  cantidad.addEventListener("input", (e) => {
    let cantidadActual = Number(e.target.value) == 0 ? 1 : Number(e.target.value);
    let cambio = cantidadActual - Number(e.target.dataset.cantidadAnterior);

    if (cambio < 0) {
      dicreaseTotalQualityQuantity(priceTds, cambio*-1);
    } else if (cambio > 0) {
      increaseTotalQualityQuantity(priceTds, cambio);
    }

    e.target.dataset.cantidadAnterior = cantidadActual;
  });
}
