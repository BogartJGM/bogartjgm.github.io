// @ts-nocheck
import { handleButtonClick, handleCheckedClick, handleFocusOut, handleTdInput, handleTdKeyDown } from "./table-events-handlers.js";
import { dicreaseTotalQualityA, dicreaseTotalQualityE, dicreaseTotalQualityQuantity, increaseTotalQualityA, increaseTotalQualityE, increaseTotalQualityQuantity } from "./modify-total-quality-of-qualities.js";
import { givePosition } from "./give-position.js";
/**
 * Copia el elemento pasado como @productCardDiv y lo añade a la columna de productos seleccionados.
 * En el proceso de copiado, añade sus eventos y modifica su clases.
 *
 * @param {HTMLDivElement} productCardDiv - El elemento a ser insertado en la columna de productos seleccionados.
 */
export function addSelectedProduct(productCardDiv) {
  // DOM
  let founded = false;
  const productSelectedContainer = document.getElementById("selected-product-container");

  productSelectedContainer.querySelectorAll(".productSelected").forEach((product) => {
    if (product.querySelector(".product").textContent == productCardDiv.querySelector(".product").textContent) {
      const quantityInp = productCardDiv.querySelector(".cantidad");
      const quantityInpAct = product.querySelector(".cantidad");

      let valorASumar = quantityInp.value == "" ? 1 : Number(quantityInp.value);
      let valorActual = quantityInpAct.value == "" ? 1 : Number(quantityInpAct.value);
      quantityInpAct.value = valorActual + valorASumar;

      let event = new Event('input', {
        bubbles: true,
        cancelable: true
      });

      quantityInp.dispatchEvent(event);

      // Animar aumento de cantidad de producto
      quantityInpAct.classList.remove("changed");
      setTimeout(() => {
        quantityInpAct.classList.add("changed");
      }, 50);

      product.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Cambiar el label de precio total en curso
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
  const downloadCotiButton = document.getElementById("show-download-coti");
  const showImage = document.getElementById("show-image");
  const productsSelectedCounter = document.getElementById("selected-product-counter");
  // Copia @productCardDiv (param1) y obtiene elementos dentro de esa copia
  const productCardCopy = productCardDiv.cloneNode(true);
  productCardDiv.querySelector(".cantidad").value = "";
  const buttonSelectedCard = productCardCopy.querySelectorAll("button.btn.btn-success.col-md-5")[0];
  const buttonsEdit = productCardCopy.querySelectorAll(".buttonEdit");
  const tdsEditable = productCardCopy.querySelectorAll(".search");
  const priceTds = productCardCopy.querySelectorAll(".price");
  const posicion = productCardCopy.querySelector(".posicion");
  const checkboxs = productCardCopy.querySelectorAll("input[type='checkbox']");
  const cantidad = productCardCopy.querySelector(".cantidad");
  let quanitytNormalize = cantidad.value ? Number(cantidad.value) : 1;
  const actionButtonsContainer = productCardCopy.querySelector(".actionButtonsContainer");
  // Nuevos elementos a ser añadidos en el producto seleccionado
  const btnSort = document.createElement("button");

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
  posicion.classList.remove("col-md-2");
  posicion.classList.add("col-md-5");
  productCardCopy.querySelector(".eliminar").remove();
  productCardCopy.classList.remove("product");
  productCardCopy.classList.add("productSelected");
  buttonSelectedCard.classList.remove("btn-success");
  buttonSelectedCard.classList.remove("searched-product");
  buttonSelectedCard.classList.add("btn-danger");
  buttonSelectedCard.textContent = "-";
  btnSort.classList.add("btn", "col-md-2", "sort-button", "border", "border-outine-secondary");
  btnSort.textContent = "≡";

  // Modificar elementos dentro de producto
  actionButtonsContainer.prepend(btnSort);

  // Listeners
  checkboxs.forEach((checkbox) => {
    checkbox.addEventListener("click", (ev) => {
      const checkbox = ev.target;
      const checkboxState = checkbox.checked;

      const qualityTitle = checkbox.parentElement.previousSibling;
      const qualityContainer = qualityTitle.parentElement.parentElement.parentElement.parentElement.parentElement;
      const qualityPrice = qualityContainer.querySelector(".price");
      const otherQualityContainer = qualityContainer.nextSibling ? qualityContainer.nextSibling : qualityContainer.previousSibling;
      const otherQualityPrice = otherQualityContainer.querySelector(".price");

      if (checkboxState) {
        if (qualityTitle.textContent == "CALIDAD E") {
          dicreaseTotalQualityE(quanitytNormalize, otherQualityPrice.textContent);
          increaseTotalQualityE(quanitytNormalize, qualityPrice.textContent);
        } else {
          dicreaseTotalQualityA(quanitytNormalize, otherQualityPrice.textContent);
          increaseTotalQualityA(quanitytNormalize, qualityPrice.textContent);
        }
      } else {
        if (qualityTitle.textContent == "CALIDAD E") {
          dicreaseTotalQualityE(quanitytNormalize, qualityPrice.textContent);
          increaseTotalQualityE(quanitytNormalize, otherQualityPrice.textContent);
        } else {
          dicreaseTotalQualityA(quanitytNormalize, qualityPrice.textContent);
          increaseTotalQualityA(quanitytNormalize, otherQualityPrice.textContent);
        }
      }

      handleCheckedClick(ev);
    })
  })
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
  buttonSelectedCard.addEventListener("click", function (ev) {
    // Controlar la animación de "quitado"
    productCardCopy.classList.remove("productSelected");
    productCardCopy.classList.add("productRemove");

    const checkbox = ev.target.parentElement.parentElement.nextElementSibling.nextElementSibling.firstChild.firstChild.firstChild.firstChild.lastChild.lastChild.firstChild;
    const otherCheckbox = ev.target.parentElement.parentElement.nextElementSibling.nextElementSibling.lastChild.firstChild.firstChild.firstChild.lastChild.lastChild.firstChild;
    const checkboxState = checkbox.checked;
    const otherCheckboxState = otherCheckbox.checked;
    const quanitytNormalize = cantidad.value ? Number(cantidad.value) : 1;

    
    if (checkboxState && otherCheckboxState) {
      dicreaseTotalQualityQuantity(priceTds, cantidad.value);
    } else if (checkboxState) {
      dicreaseTotalQualityE(quanitytNormalize, priceTds[0].textContent);
      dicreaseTotalQualityA(quanitytNormalize, priceTds[0].textContent);
    } else {
      dicreaseTotalQualityE(quanitytNormalize, priceTds[1].textContent);
      dicreaseTotalQualityA(quanitytNormalize, priceTds[1].textContent);
    }

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
      givePosition(productSelectedContainer);
    }, 100);
    productsSelectedCounter.textContent = Number(productsSelectedCounter.textContent) - 1;
  });
  cantidad.addEventListener("input", (ev) => {
    let productContainer = ev.target.parentElement.parentElement.parentElement;
    let qualityEPrice = Number(productContainer.querySelectorAll(".price")[0].textContent);
    let qualityAPrice = Number(productContainer.querySelectorAll(".price")[1].textContent);
    let checkbox = productContainer.querySelectorAll("input[checked='true']");
    let cantidadActual = Number(ev.target.value) == 0 ? 1 : Number(ev.target.value);
    let cambio = cantidadActual - Number(ev.target.dataset.cantidadAnterior);

    if (checkbox.length == 1) {
      if (checkbox[0].classList.contains("CALIDADE")) {
        if (cambio < 0) {
          dicreaseTotalQualityE(qualityEPrice, cambio * -1);
          dicreaseTotalQualityA(qualityEPrice, cambio * -1);
        } else if (cambio > 0) {
          increaseTotalQualityE(qualityEPrice, cambio);
          increaseTotalQualityA(qualityEPrice, cambio);
        }
      } else {
        if (cambio < 0) {
          dicreaseTotalQualityA(qualityAPrice, cambio * -1);
          increaseTotalQualityE(qualityAPrice, cambio);
        } else if (cambio > 0) {
          increaseTotalQualityA(qualityAPrice, cambio);
          increaseTotalQualityE(qualityAPrice, cambio);
        }
      }
      ev.target.dataset.cantidadAnterior = cantidadActual;
    } else {
      if (cambio < 0) {
        dicreaseTotalQualityQuantity(priceTds, cambio * -1);
      } else if (cambio > 0) {
        increaseTotalQualityQuantity(priceTds, cambio);
      }

      ev.target.dataset.cantidadAnterior = cantidadActual;
    }
  });

  //Añadir producto a la tercera columna
  productSelectedContainer.appendChild(productCardCopy);

  // Aumentar contador de productos seleccionados y precio total de ambas calidades
  productsSelectedCounter.textContent = Number(productsSelectedCounter.textContent) + 1;

  productCardCopy.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  if (checkboxs[0].checked && checkboxs[1].checked) {
    increaseTotalQualityQuantity(priceTds, cantidad.value);
  } else if (checkboxs[0].checked) {
    increaseTotalQualityE(quanitytNormalize, priceTds[0].textContent);
    increaseTotalQualityA(quanitytNormalize, priceTds[0].textContent);
  } else {
    increaseTotalQualityE(quanitytNormalize, priceTds[1].textContent);
    increaseTotalQualityA(quanitytNormalize, priceTds[1].textContent);
  }
}
