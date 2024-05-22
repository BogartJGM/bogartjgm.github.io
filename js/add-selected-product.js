// @ts-nocheck
import { handleButtonClick, handleFocusOut, handleTdInput, handleTdKeyDown } from "./table-events-handlers.js";
import { dicreaseTotalQualityQuantity, increaseTotalQualityQuantity } from "./modify-total-quality-of-qualities.js";
import { givePosition } from "./give-position.js";
/**
 * Copia el elemento pasado como @productCardDiv y lo añade a la columna de productos seleccionados.
 * En el proceso de copiado, añade sus eventos y modifica su clases.
 *
 * @param {HTMLDivElement} productCardDiv - El elemento a ser insertado en la columna de productos seleccionados.
 */
export function anadirProductSelected(productCardDiv) {
  // DOM
  let founded = false;
  const productSelectedContainer = document.getElementById("selected-product-container");

  productSelectedContainer.querySelectorAll(".productSelected").forEach((product) => {
    if (product.querySelector(".product").textContent == productCardDiv.querySelector(".product").textContent) {
      const quantityInp = productCardDiv.querySelector(".cantidad");
      const quantityInpAct = product.querySelector(".cantidad");

      let valorASumar = quantityInp.value == "" ? 1 : Number(quantityInp.value);
      let valorActual = quantityInpAct.value == "" ? 1 : Number(quantityInpAct.value);
      quantityInpAct.value =  valorActual + valorASumar;
      
      let event = new Event('input', {
        bubbles: true,
        cancelable: true
      });

      quantityInp.dispatchEvent(event);

      increaseTotalQualityQuantity(productCardDiv.querySelectorAll(".price"), String(valorASumar));

      quantityInp.value = "";
      founded = true;
      return;
    }
  });
  if (founded) {
    return;
  }

  const productSelectedSearchBar = document.getElementById("selected-product-search-bar");
  const downloadCotiButton = document.getElementById("download-coti");
  const showImage = document.getElementById("show-image");
  const productsSelectedCounter = document.getElementById("selected-product-counter");
  // Copia @productCardDiv (param1) y obtiene elementos dentro de esa copia
  const productCardCopy = productCardDiv.cloneNode(true);
  productCardDiv.querySelector(".cantidad").value = "";
  const buttonSelectedCard = productCardCopy.querySelectorAll("button.btn.btn-success.col-3")[0];
  const buttonsEdit = productCardCopy.querySelectorAll(".buttonEdit");
  const tdsEditable = productCardCopy.querySelectorAll(".search");
  const priceTds = productCardCopy.querySelectorAll(".price");
  const cantidad = productCardCopy.querySelector(".cantidad");
  const posicion = productCardCopy.querySelector(".posicion");
  const actionButtonsContainer = productCardCopy.querySelector(".actionButtonsContainer");
  // Nuevos elementos a ser añadidos en el producto seleccionado
  const btnDown = document.createElement("button");
  const btnUp = document.createElement("button");

  // Determinar posición del producto en la tercera columna
  if (productSelectedContainer.innerHTML) {
    posicion.textContent = (productSelectedContainer.childElementCount + 1);
  } else {
    posicion.textContent = "1";
  }

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
  productCardCopy.querySelector(".eliminar").remove();
  productCardCopy.classList.remove("product");
  productCardCopy.classList.add("productSelected");
  buttonSelectedCard.classList.remove("btn-success");
  buttonSelectedCard.classList.remove("searched-product");
  buttonSelectedCard.classList.add("btn-danger");
  buttonSelectedCard.classList.add("btn-danger");
  buttonSelectedCard.textContent = "-";
  btnDown.classList.add("btn", "btn-primary", "col-md-4");
  btnDown.textContent = "bajah"
  btnUp.classList.add("btn", "btn-primary", "col-md-4");
  btnUp.textContent = "subih"

  // Modificar elementos dentro de producto
  actionButtonsContainer.insertBefore(btnDown, buttonSelectedCard);
  actionButtonsContainer.insertBefore(btnUp, buttonSelectedCard);

  // Listeners
  btnDown.addEventListener("click", () => {
    const nextProductCard = productCardCopy.nextSibling;
    if (!nextProductCard) {
      return;
    }

    productSelectedContainer.insertBefore(nextProductCard, productCardCopy);
    productCardCopy.scrollIntoView({ behavior: 'smooth', block: 'start' });
    givePosition(productSelectedContainer);
  });
  btnUp.addEventListener("click", () => {
    const previousProductCard = productCardCopy.previousSibling;
    if (!previousProductCard) {
      return;
    }
    
    productSelectedContainer.insertBefore(productCardCopy, previousProductCard);
    productCardCopy.scrollIntoView({ behavior: 'smooth', block: 'start' });
    givePosition(productSelectedContainer);
  });
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
      givePosition(productSelectedContainer);
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

  //Añadir producto a la tercera columna
  productSelectedContainer.appendChild(productCardCopy);

  // Aumentar contador de productos seleccionados y precio total de ambas calidades
  productsSelectedCounter.textContent = Number(productsSelectedCounter.textContent) + 1;
 
  productCardCopy.scrollIntoView({ behavior: 'smooth', block: 'start' });

  increaseTotalQualityQuantity(priceTds, cantidad.value);
}
