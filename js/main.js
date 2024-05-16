// Importando funciones desde clases externas
import { initExcelInputs } from "./excel-file-handler.js";
import { search } from "./search-bar.js";
import { downloadExcel } from "./download-cotizacion.js";
import { showImage } from "./show-image.js";
import { descargarImagenCotizacion } from "./button-download-coti.js";
import { createProductCard } from "./create-product-card.js";
import { givePosition } from "./give-position.js";

// Elementos del DOM
const inputDropdownExcelPicker = document.getElementById("select-excel-file");
const inputExcelPicker = document.getElementById("select-excel-file-area");
const inputSearchBar = document.getElementById("product-search-bar");
const productSelectedSearchBar = document.getElementById("selected-product-search-bar");
const buttonProductSelected = document.getElementById("download-coti");
const buttonShowImage = document.getElementById("show-image");
const buttonDownloadImage = document.getElementById("download-image");

// Inicializa el input selector de excel
const productsDataString = localStorage.getItem("productsData");
if (productsDataString) {
  inputExcelPicker.remove();
  JSON.parse(productsDataString).forEach((product) => {
    createProductCard(product, "product-container");
  });
  givePosition("product-container");
}
initExcelInputs(inputDropdownExcelPicker, inputExcelPicker);

// Inicializa la barra de búsqueda
search(inputSearchBar, "div.card.p-2.product");
search(productSelectedSearchBar, "div.card.p-2.productSelected");

buttonProductSelected.addEventListener("click", () => {
  downloadExcel();
});

buttonShowImage.addEventListener("click", () => showImage());

buttonDownloadImage.addEventListener("click", () => descargarImagenCotizacion());