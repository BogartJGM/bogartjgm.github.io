import { increaseTotalQualityE, dicreaseTotalQualityE, increaseTotalQualityA, dicreaseTotalQualityA} from "./modify-total-quality-of-qualities.js";

/**
 *
 * @param {HTMLTableCellElement} tdElement - Elemento td a hacerle focus edit
 */
export function handleButtonClick(tdElement) {
  tdElement.setAttribute("contenteditable", "true");
  tdElement.focus();

  const range = document.createRange();
  range.selectNodeContents(tdElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

/**
 * Function to handle enter keydown event on td elements
 *
 * @param {HTMLTableCellElement} tdElement - Elemento td a añadirle el evento enter key down
 * @param {Event} event - Evento que ocasionó el evento
 */
export function handleTdKeyDown(tdElement, event) {
  if (event.key === "Enter") {
    tdElement.setAttribute("contenteditable", "false");

    const selection = window.getSelection();
    selection.removeAllRanges();

    if (!tdElement.textContent) {
      tdElement.textContent = Object.values(tdElement.dataset)[0];
    }

    if (!(tdElement.textContent == tdElement.dataset.previousPrice) && (tdElement.classList[0] == "price")) {
      let cantidad = tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".cantidad").value == "" ? 1 : Number(tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".cantidad").value);
      let previousPrice = Number(tdElement.dataset.previousPrice);
      let precioActual = Number(tdElement.textContent); 

      if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E") {
        dicreaseTotalQualityE(cantidad, previousPrice);

        increaseTotalQualityE(cantidad, precioActual);

        tdElement.dataset.previousPrice = tdElement.textContent;
      } else {
        dicreaseTotalQualityA(cantidad, previousPrice);

        increaseTotalQualityA(cantidad, precioActual);

        tdElement.dataset.previousPrice = tdElement.textContent;
      }
    }
    // parentElement.parentElement.parentElement.querySelector("thead").textContent;
  }
}

/**
 * Function to handle focusout event on td elements
 *
 * @param {HTMLTableCellElement} tdElement - Td que ocasiona el evento
 */
export function handleFocusOut(tdElement) {
  tdElement.setAttribute("contenteditable", "false");

  if (!(tdElement.textContent == tdElement.dataset.previousPrice) && (tdElement.classList[0] == "price")) {
    let cantidad = tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".cantidad").value == "" ? 1 : Number(tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".cantidad").value);
    let previousPrice = Number(tdElement.dataset.previousPrice);
    let precioActual = Number(tdElement.textContent); 

    if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E") {
      dicreaseTotalQualityE(cantidad, previousPrice);

      increaseTotalQualityE(cantidad, precioActual);

      tdElement.dataset.previousPrice = tdElement.textContent;
    } else {
      dicreaseTotalQualityA(cantidad, previousPrice);

      increaseTotalQualityA(cantidad, precioActual);

      tdElement.dataset.previousPrice = tdElement.textContent;
    }
  }
}

/**
 * Function to handle input event on td elements
 * Al llamar a esta función, se selecciona automáticamente todo el textContent del elemetno
 */
export function handleTdInput() {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    selection.removeAllRanges();
  }
}
