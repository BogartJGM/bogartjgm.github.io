import { createSelectedProductCard } from "./create-selected-product-card.js";
import { removeAttributeFromElementById } from "./utils.js";

/**
 * 
 * @param {HTMLButtonElement} btnImport 
 */
export function initImportExcel(btnImport) {
  btnImport.addEventListener("click", handleinputExcelPickerClick);
}

function handleinputExcelPickerClick() {
  const temporaryExcelFileInput = document.createElement("input");
  temporaryExcelFileInput.setAttribute("type", "file");
  temporaryExcelFileInput.setAttribute("multiple", "false");
  temporaryExcelFileInput.setAttribute("style", "display: none");
  temporaryExcelFileInput.setAttribute("accept", ".xlsx, .ods");
  temporaryExcelFileInput.addEventListener("change", (e) => {
    handleFileChange(e.target.files)
  });
  temporaryExcelFileInput.click();
}

/**
 * Callback function for the file change event. This function is triggered when a file is selected using a file input.
 * It reads the selected file and loads it as an ArrayBuffer using FileReader. Once the file is loaded, it calls the
 * handleFileLoad function to further process the file.
 *
 * @param {FileList} fileList - The list of files selected by the user. Typically obtained from the 'change' event of a file input.
 */
function handleFileChange(fileList) {
  const file = fileList[0]; // Get the first file from the list
  if (file) {
    const reader = new FileReader(); // Create a new FileReader object
    reader.onload = handleFileLoad; // Set the onload event handler to handleFileLoad function
    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  }
}

/**
 * Function to handle file loading and processing. This function is called when a file has been successfully loaded.
 * It processes the file content, converts it to a JSON object, creates product cards from the data, and appends them to the DOM.
 * Finally, it performs actions such as hiding excel picker and enabling search bar after the product cards are inserted.
 *
 * @param {Event} fileEvent - The file event containing the loaded file data.
 */
function handleFileLoad(fileEvent) {
  const fileData = new Uint8Array(fileEvent.target.result); // Get the file data as an Uint8Array
  const workbook = XLSX.read(fileData, { type: "array" }); // Read the file as an Excel workbook
  const firstSheetName = workbook.SheetNames[0]; // Get the name of the first sheet
  const firstSheet = workbook.Sheets[firstSheetName]; // Get the first sheet

  // Convert spreadsheet content to JSON object
  const selectedProductsData = XLSX.utils.sheet_to_json(firstSheet, { raw: true });

  /* Each time the file is loaded, the excelPicker is cleared and the reload dataset is added to the div.products. 
  This dataset is used by the createProductCard function so that in the event of adding a new file, it reloads the product cards and the search
  input references the new elements. */
  const productSelectedContainer = document.getElementById("selected-product-container");

  //Vaciar información de totales y cantidad de productos
  if (productSelectedContainer.innerHTML != "") {
    document.querySelector(".btn-delete-selected").click();
    productSelectedContainer.innerHTML = "";
  }

  // Selecciona los productos que existen en el excel.
  selectedProductsData.forEach((product, index) => {
    createSelectedProductCard(product, index);
  });

  removeAttributeFromElementById("product-search-bar", "disabled");
}
