import { 
  increaseTotalQualityE,
  dicreaseTotalQualityE,
  increaseTotalQualityA,
  dicreaseTotalQualityA
} from "./modify-total-quality-of-qualities.js";

/**
 * 
 * @param { Event } ev 
 */
export function handleCheckedClick(ev) {
  const checkbox = ev.target;
  const checkboxState = checkbox.checked;
  
  const qualityTitle = checkbox.parentElement.previousSibling;
  const qualityContainer = qualityTitle.parentElement.parentElement.parentElement.parentElement.parentElement;
  const qualityBody = qualityContainer.querySelector("tbody");
  const otherQualityContainer = qualityContainer.nextSibling ? qualityContainer.nextSibling : qualityContainer.previousSibling;
  const otherQualityTitle = otherQualityContainer.querySelector(".title");
  const otherQualityCheckbox = otherQualityTitle.nextElementSibling.firstChild;

  if (checkboxState) {
    qualityTitle.style.display = "";
    qualityContainer.classList.remove("col-md-2");
    qualityContainer.classList.add("col-md-6");
    qualityBody.style.opacity = "";
    checkbox.setAttribute("checked", "true");

    otherQualityTitle.textContent = otherQualityTitle.dataset.originalTitle;
    otherQualityContainer.classList.remove("col-md-9");
    otherQualityContainer.classList.add("col-md-6");
    otherQualityCheckbox.disabled = "";
    otherQualityCheckbox.setAttribute("checked", "true");
  } else {
    qualityTitle.style.display = "none";
    qualityContainer.classList.remove("col-md-6");
    qualityContainer.classList.add("col-md-2");
    qualityBody.style.opacity = 0.2;
    checkbox.setAttribute("checked", "false");
    
    otherQualityTitle.textContent = "CALIDAD A Y E";
    otherQualityContainer.classList.remove("col-md-6");
    otherQualityContainer.classList.add("col-md-9");
    otherQualityCheckbox.disabled = true;
    otherQualityCheckbox.setAttribute("checked", "true");
  }
}
/*
const table = ev.target.closest('.row');

  // Cambiar las clases col-md de las tablas
  const tables = table.querySelectorAll('.table-responsive');
  if (tables.length === 2) {
    tables[0].parentNode.classList.remove('col-md-6');
    tables[1].parentNode.classList.remove('col-md-6');
    tables[0].parentNode.classList.add('col-md-2');
    tables[0].style.opacity = "0.2";
    tables[1].parentNode.classList.add('col-md-9');
    tables[1].querySelector(".title").textContent = "CALIDAD E Y A"
  }

  // Ocultar el <th> que contiene el textContent "CALIDAD E"
  const ths = table.querySelectorAll('th');
  ths.forEach(th => {
    if (th.textContent.trim() === 'CALIDAD E') {
      th.style.display = 'none';
    }
  });
*/
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

    // Poner valor por defecto si el textContent está vacío
    if (!tdElement.textContent) {
      tdElement.textContent = Object.values(tdElement.dataset)[0];
    }

    // Modificar el JSON solo si son eventos de los porductos de columna de productos para seleccionar
    if (tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id == "product-container") {
      let productIndex = tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.arrayPosition;
      // Modificar el JSON de localstorage
      if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E" && (tdElement.classList[0] == "price")) {
        const dataChange = JSON.parse(localStorage.getItem("productsData"));
        dataChange[productIndex].definedPriceE = tdElement.textContent;
        localStorage.setItem("productsData", JSON.stringify(dataChange));
      } else if (tdElement.classList[0] == "price") {
        const dataChange = JSON.parse(localStorage.getItem("productsData"));
        dataChange[productIndex].definedPriceA = tdElement.textContent;
        localStorage.setItem("productsData", JSON.stringify(dataChange));
      } else if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E" && "CALIDAD E" && tdElement.classList.contains("qualityName")) {
        const dataChange = JSON.parse(localStorage.getItem("productsData"));
        dataChange[productIndex].definedNameE = tdElement.textContent;
        localStorage.setItem("productsData", JSON.stringify(dataChange));
      } else {
        const dataChange = JSON.parse(localStorage.getItem("productsData"));
        dataChange[productIndex].definedNameA = tdElement.textContent;
        localStorage.setItem("productsData", JSON.stringify(dataChange));
      }
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

  // Poner valor por defecto si el textContent está vacío
  if (!tdElement.textContent) {
    tdElement.textContent = Object.values(tdElement.dataset)[0];
  }

  // Modificar el JSON solo si son eventos de los porductos de columna de productos para seleccionar
  if (tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id == "product-container") {
    let productIndex = tdElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.arrayPosition;
    // Modificar el JSON de localstorage
    if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E" && (tdElement.classList[0] == "price")) {
      const dataChange = JSON.parse(localStorage.getItem("productsData"));
      dataChange[productIndex].definedPriceE = tdElement.textContent;
      localStorage.setItem("productsData", JSON.stringify(dataChange));
    } else if (tdElement.classList[0] == "price") {
      const dataChange = JSON.parse(localStorage.getItem("productsData"));
      dataChange[productIndex].definedPriceA = tdElement.textContent;
      localStorage.setItem("productsData", JSON.stringify(dataChange));
    } else if (tdElement.parentElement.parentElement.parentElement.querySelector("thead").textContent == "CALIDAD E" && "CALIDAD E" && tdElement.classList.contains("qualityName")) {
      const dataChange = JSON.parse(localStorage.getItem("productsData"));
      dataChange[productIndex].definedNameE = tdElement.textContent;
      localStorage.setItem("productsData", JSON.stringify(dataChange));
    } else {
      const dataChange = JSON.parse(localStorage.getItem("productsData"));
      dataChange[productIndex].definedNameA = tdElement.textContent;
      localStorage.setItem("productsData", JSON.stringify(dataChange));
    }
  }

  // Si el td es del producto es modificado y el producto está en la columna de productos seleccionados. E
  // En los productos que están en la columna de selección, el previousPrice siempre va a hacer igual al precio actual.
  // En los productos seleccionados no, porque su evento solo llama a este método
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
