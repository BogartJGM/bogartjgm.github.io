// Importando funciones desde clases externas
import { initExcelInputs } from "./excel-file-handler.js";
import { search } from "./search-bar.js";
import { downloadExcel } from "./download-cotizacion.js";
import { showImage } from "./show-image.js";
import { descargarImagenCotizacion } from "./button-download-coti.js";
import { createProductCard } from "./create-product-card.js";
import { addProductToLocalStorage } from "./add-product-to-local-storage.js";
import { superLoadSearchBar } from "./super-load-search-bar.js";
import { addGlobalShortcuts } from "./globa-shortcuts.js";
import { initImageInput } from "./image-file-handler.js";
import { recortarImagen } from "./image-cutter.js";

// Elementos del DOM
const inputDropdownExcelPicker = document.getElementById("select-excel-file");
const inputExcelPicker = document.getElementById("select-excel-file-area");
const inputSearchBar = document.getElementById("product-search-bar");
const inputImgPicker = document.getElementById("select-img-file-area");
const productSelectedSearchBar = document.getElementById("selected-product-search-bar");
const buttonProductSelected = document.getElementById("download-coti");
const buttonShowImage = document.getElementById("show-image");
const buttonDownloadImage = document.getElementById("download-image");
const buttonaddProductToLocalStorage = document.getElementById("add-product");
const myModal = document.getElementById("expand-create-product");
const myInput = document.getElementById("product-name");
const btnAccordion = document.querySelector(".accordion-button");
const inputClientName = document.getElementById("client-name");
const inputQuoteDateStart = document.getElementById("quote-date-start");
const btnShowDownloadCoti = document.getElementById("show-download-coti");
const formCreateProduct = document.getElementById('create-product-form');
const formClientData = document.getElementById("client-data-form");

// Inicializa el input selector de excel
const productsDataString = localStorage.getItem("productsData");
if (productsDataString) {
  inputExcelPicker.remove();
  JSON.parse(productsDataString).forEach((product, index) => {
    createProductCard(product, "product-container", index);
  });
}

myModal.addEventListener("shown.bs.modal", () => myInput.focus());
buttonProductSelected.addEventListener("click", () => downloadExcel());
buttonShowImage.addEventListener("click", (ev) => {
  if (!formClientData.checkValidity()) {
    ev.preventDefault();
    ev.stopPropagation();

    if (!document.getElementById("flush-collapse-form-client").classList.contains("show")) {
      btnAccordion.click();
    }
    formClientData.classList.add("was-validated");
  } else {
    const modalShowImage = new bootstrap.Modal(document.getElementById('expand-image'));
    modalShowImage.show();
    showImage();
  }
});
buttonDownloadImage.addEventListener("click", () => descargarImagenCotizacion());
buttonaddProductToLocalStorage.addEventListener("click", (ev) => {
  if (!formCreateProduct.checkValidity()) {
    ev.preventDefault();
    ev.stopPropagation();

    formCreateProduct.classList.add('was-validated');
  } else {
    addProductToLocalStorage();

    const modalCrateProduct = bootstrap.Modal.getInstance(myModal);
    modalCrateProduct.hide();
  }
});
btnAccordion.addEventListener("click", () => { setTimeout(() => { inputClientName.focus(); }, 100) });
inputQuoteDateStart.addEventListener("change", (ev) => {
  const formValidoHasta = document.getElementById("quote-date-end");

  let choosedDate = new Date(ev.target.value + " " + "GMT-0600");

  choosedDate.setUTCHours(choosedDate.getUTCHours() - 6);
  console.log(choosedDate);
  let futureDate = new Date(choosedDate);
  futureDate.setDate(futureDate.getDate() + 30);

  let formattedDate = futureDate.getUTCFullYear() + "-" + ("0" + (futureDate.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + futureDate.getUTCDate()).slice(-2);

  formValidoHasta.value = formattedDate;
});
btnShowDownloadCoti.addEventListener("click", (ev) => {
  if (!formClientData.checkValidity()) {
    ev.preventDefault();
    ev.stopPropagation();

    if (!document.getElementById("flush-collapse-form-client").classList.contains("show")) {
      btnAccordion.click();
    }
    formClientData.classList.add("was-validated");
  } else {
    const modalChangeName = new bootstrap.Modal(document.getElementById('expand-select-name'));

    const clientName = document.getElementById("client-name");
    const clientSchool = document.getElementById("client-school-name");
    const gradeAndGroup = document.getElementById("client-grade-group");
    const inputFileName = document.getElementById("file-name");

    inputFileName.value = `${clientName.value} ${clientSchool.value} ${gradeAndGroup.value}`;

    modalChangeName.show();
  }
});

search(inputSearchBar, "div.card.p-2.product");
search(productSelectedSearchBar, "div.card.p-2.productSelected");
initExcelInputs(inputDropdownExcelPicker, inputExcelPicker);
initImageInput(inputImgPicker);
superLoadSearchBar(inputSearchBar);
addGlobalShortcuts();
recortarImagen();