import { addSelectedProduct } from "./add-selected-product.js";
import { givePosition } from "./give-position.js";
import { handleButtonClick, handleCheckedClick, handleFocusOut, handleTdInput, handleTdKeyDown } from "./table-events-handlers.js";

/**
 * Creates a product card with its classes for each element, content, and structure in the DOM.
 * Then inserts this created product card as a child of the element whose id was passed as a parameter of the function (containerProductId).
 * The other parameter (productJson) contains the data needed to create the product card.
 *
 * @param {object} productJson - The JSON object containing the data for creating the product card.
 * @param {string} containerProductId - The id of the container element where the product card will be appended.
 */
export function createProductCard(productJson, containerProductId, index) {
  // Creating DOM elements for the product card
  const cardDiv = document.createElement("div");
  const divActionsContainer = document.createElement("div");
  const divActionsRow = document.createElement("div");
  const spanPosition = document.createElement("span");
  // const btnDown = document.createElement("button");
  const deletetThisCard = document.createElement("button");
  const addButton = document.createElement("button");

  const productNameDiv = document.createElement("div");
  const inputGroupDiv = document.createElement("div");
  const productNameSpan = document.createElement("span");
  const quantityInput = document.createElement("input");
  const rowTable = document.createElement("div");

  const setDataE = {};
  setDataE.definedName = productJson.definedNameE;
  setDataE.definedPrice = productJson.definedPriceE;
  const setDataA = {};
  setDataA.definedName = productJson.definedNameA;
  setDataA.definedPrice = productJson.definedPriceA;
  const qualityEDiv = createQualityTable("CALIDAD E", productJson["MARCA"], productJson["P UNI"], setDataE);
  const qualityADiv = createQualityTable("CALIDAD A", productJson["MARCA_1"], productJson["P UNI_1"], setDataA);

  // Adding classes and attributes
  cardDiv.classList.add("card", "p-2", "product");
  divActionsContainer.classList.add("row", "mb-1");
  divActionsRow.classList.add("input-group", "input-group-sm", "justify-content-between", "actionButtonsContainer");
  spanPosition.classList.add("input-group-text", "col-md-2", "posicion", "py-0", "m-0");
  deletetThisCard.classList.add("btn", "btn-danger", "col-md-5", "eliminar", "py-0", "m-0");
  deletetThisCard.textContent = "Eliminar"
  // btnUp.classList.add("btn", "btn-primary", "col-md-4");
  // btnUp.textContent = "subih"
  addButton.classList.add("btn", "btn-success", "col-md-5", "add-product", "py-0", "m-0");

  productNameDiv.classList.add("form", "mb-1");
  inputGroupDiv.classList.add("input-group", "input-group-sm");
  productNameSpan.classList.add("input-group-text", "col-10", "search", "product", "py-0", "m-0");
  quantityInput.setAttribute("type", "number");
  quantityInput.setAttribute("placeholder", "1");
  quantityInput.dataset.cantidadAnterior = 1;
  quantityInput.classList.add("form-control", "col-2", "cantidad", "py-0", "m-0");
  quantityInput.min = "1";
  rowTable.classList.add("row");
  rowTable.dataset.arrayPosition = index;

  // Setting content
  productNameSpan.textContent = productJson["PRODUCTO"];
  addButton.textContent = "+";
  spanPosition.textContent = String(index + 1);

  addButton.addEventListener("click", () => {
    addSelectedProduct(cardDiv);
    
    const searchBar = document.getElementById("product-search-bar");

    searchBar.value = "";
            let eventito = new Event("input", {
              bubbles: true,
              cancelable: true,
              value: "",
            });

    searchBar.dispatchEvent(eventito);

    quantityInput.dataset.cantidadAnterior = 1;
  });
  quantityInput.addEventListener("input", () => {
    if (quantityInput.value == "") {
      quantityInput.dataset.cantidadAnterior = 1;
    } else {
      quantityInput.dataset.cantidadAnterior = quantityInput.value;
    }
  });
  quantityInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      addButton.click();
      quantityInput.dataset.cantidadAnterior = 1;
    }
  });
  deletetThisCard.addEventListener("click", () => {
    cardDiv.classList.remove("productSelected");
    cardDiv.classList.add("productRemove");

    setTimeout(function () {
      cardDiv.remove();
      
      // Comprobar si existen elementos seleccionados. Si no existen, desactivar barra de búsqueda y botones
      const productsDataString = JSON.parse(localStorage.getItem("productsData")) || [];
      productsDataString.some((product, index) => {
        if (product["PRODUCTO"] == productNameSpan.textContent) {
            productsDataString.splice(index, 1);
            localStorage.setItem("productsData", JSON.stringify(productsDataString));
            return true;  // Detener el bucle
        }
        return false;
      });
      givePosition(document.getElementById("product-container"));
    }, 100);
  });
  

  // Structuring the DOM
  divActionsRow.appendChild(spanPosition);
  divActionsRow.appendChild(deletetThisCard);
  // divActionsRow.appendChild(btnUp);
  divActionsRow.appendChild(addButton);
  divActionsContainer.appendChild(divActionsRow);

  inputGroupDiv.appendChild(productNameSpan);
  inputGroupDiv.appendChild(quantityInput);
  productNameDiv.appendChild(inputGroupDiv);
  rowTable.appendChild(qualityEDiv);
  rowTable.appendChild(qualityADiv);
  cardDiv.appendChild(divActionsContainer);
  cardDiv.appendChild(productNameDiv);
  cardDiv.appendChild(rowTable);

  // Adding the card to the document
  document.getElementById(containerProductId).appendChild(cardDiv);
}

/**
 * Creates a quality table where the content depends on the provided parameters: title, name, and price.
 *
 * @param {string} title - The title of the quality table.
 * @param {string} name - The name of the product.
 * @param {string} price - The price of the product.
 * @returns {HTMLDivElementement} - The created quality table.
 */
function createQualityTable(title, name, price, setData) {
  // Creating DOM elements for the quality table
  const svgPen = createSVG("http://www.w3.org/2000/svg", "16", "16", "0 0 16 16", "path", "d", "M13.646 1.146a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.36.146h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l10-10zM13 2l1 1-10 10h-2v-2l10-10 1 1v1h1v-2h-2");
  const svgPen2 = createSVG("http://www.w3.org/2000/svg", "16", "16", "0 0 16 16", "path", "d", "M13.646 1.146a.5.5 0 0 1 .708 0l1 1a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.36.146h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .146-.354l10-10zM13 2l1 1-10 10h-2v-2l10-10 1 1v1h1v-2h-2");
  const qualityDiv = document.createElement("div");
  const qualityTable = document.createElement("div");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const trHead = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const thInput = document.createElement("input");
  const trBody = document.createElement("tr");
  const trBody2 = document.createElement("tr");
  const tdName = document.createElement("td");
  const tdPrice = document.createElement("td");
  const tdButton = document.createElement("td");
  const tdButton2 = document.createElement("td");
  const buttonPen = document.createElement("button");
  const buttonPen2 = document.createElement("button");

  // Adding classes and attributes
  qualityDiv.classList.add("col-md-6", "box", "animated-col");
  qualityTable.classList.add("table-responsive", "overflow-x-hidden");
  table.classList.add("table", "py-0", "m-0");
  th1.classList.add("title", "py-0", "m-0");
  th1.style.textAlign = "center";
  th1.dataset.originalTitle = title;
  th2.classList.add("py-0", "m-0");
  th2.style.textAlign = "center";
  thInput.classList.add("form-check-input", "custom-checkbox", title.replace(/\s/g, ''));
  thInput.type = "checkbox";
  thInput.setAttribute("checked", "true");
  tdName.dataset.originalName = name;
  tdName.classList.add("search", "td-editable", "qualityName", "py-0", "m-0");
  tdName.style.width = "90%";
  tdName.style.overflowWrap = "break-word";
  tdPrice.dataset.originalPrice = price;
  tdPrice.dataset.previousPrice = setData.definedPrice ? setData.definedPrice : price;
  tdPrice.classList.add("price", "td-editable", "py-0", "m-0");
  tdPrice.style.width = "90%";
  tdPrice.style.overflowWrap = "break-word";
  tdButton.classList.add("py-0", "m-0");
  tdButton.style.width = "10%";
  tdButton2.classList.add("py-0", "m-0");
  tdButton2.style.width = "10%";
  buttonPen.classList.add("btn", "buttonEdit", "py-0", "m-0");
  buttonPen2.classList.add("btn", "buttonEdit", "py-0", "m-0");

  // Setting content
  th1.textContent = title;
  tdName.textContent = setData.definedName ? setData.definedName : name;
  tdPrice.textContent = setData.definedPrice ? setData.definedPrice : price;

  // Adding events
  thInput.addEventListener("click", (e) => {
    handleCheckedClick(e);
  });
  buttonPen.addEventListener("click", function () {
    handleButtonClick(tdName);
  });
  tdName.addEventListener("keydown", function (e) {
    handleTdKeyDown(tdName, e);
  });
  tdName.addEventListener("input", function () {
    handleTdInput(tdName);
  });
  tdName.addEventListener("focusout", function () {
    handleFocusOut(tdName);
  });
  buttonPen2.addEventListener("click", function () {
    handleButtonClick(tdPrice);
  });
  tdPrice.addEventListener("keydown", function (e) {
    tdPrice.dataset.previousPrice = e.target.textContent;
    handleTdKeyDown(tdPrice, e);
  });
  tdPrice.addEventListener("input", function () {
    handleTdInput(tdPrice);
  });
  tdPrice.addEventListener("focusout", function (e) {
    tdPrice.dataset.previousPrice = e.target.textContent;
    handleFocusOut(tdPrice);
  });

  // Structuring the DOM
  buttonPen.appendChild(svgPen);
  buttonPen2.appendChild(svgPen2);
  tdButton.appendChild(buttonPen);
  tdButton2.appendChild(buttonPen2);
  trHead.appendChild(th1);
  th2.appendChild(thInput);
  trHead.appendChild(th2);
  trBody.appendChild(tdName);
  trBody.appendChild(tdButton);
  trBody2.appendChild(tdPrice);
  trBody2.appendChild(tdButton2);
  thead.appendChild(trHead);
  tbody.appendChild(trBody);
  tbody.appendChild(trBody2);
  table.appendChild(thead);
  table.appendChild(tbody);
  qualityTable.appendChild(table);
  qualityDiv.appendChild(qualityTable);

  // Function to create SVG elements
  function createSVG(namespace, width, height, viewBox, element, attribute, value) {
    const svg = document.createElementNS(namespace, "svg");
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("viewBox", viewBox);
    const path = document.createElementNS(namespace, element);
    path.setAttribute(attribute, value);
    svg.appendChild(path);
    return svg;
  }

  return qualityDiv;
}
