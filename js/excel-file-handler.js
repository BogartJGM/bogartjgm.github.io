import "./xlsx.full.min.js";

// Importing functions from external files
import { createProductCard } from "./create-product-card.js";
import { removeAttributeFromElementById } from "./utils.js";

/**
 * Initializes the functionality to load and process an Excel file.
 * @param {HTMLInputElement} inputDropdownExcelPicker - The file input element. It must be a file input type.
 * @param {HTMLElement} inputExcelPicker - The excel picker area for files.
 */
export function initExcelInputs(inputDropdownExcelPicker, inputExcelPicker) {
  inputDropdownExcelPicker.addEventListener("click", handleinputExcelPickerClick);

  if (inputDropdownExcelPicker) {
    inputExcelPicker.addEventListener("click", handleinputExcelPickerClick);
  }
}

/**
 * Handles the click event on the excel picker. Opens a file input dialog when clicked.
 */
function handleinputExcelPickerClick() {
  const temporaryExcelFileInput = document.createElement("input");
  temporaryExcelFileInput.setAttribute("type", "file");
  temporaryExcelFileInput.setAttribute("multiple", "false");
  temporaryExcelFileInput.setAttribute("style", "display: none");
  temporaryExcelFileInput.setAttribute("accept", ".xlsx, .ods");
  temporaryExcelFileInput.addEventListener("change", (e) => {
    handleFileChange(e.target.files)
    console.log("event.target | Evento de click sobre un input type file: " + e.target);
    console.log("Typeof event.target: " + typeof (e.target));
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
  mostrarModal();
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
  setTimeout(() => {
    const fileData = new Uint8Array(fileEvent.target.result); // Get the file data as an Uint8Array
  const workbook = XLSX.read(fileData, { type: "array" }); // Read the file as an Excel workbook
  const firstSheetName = workbook.SheetNames[0]; // Get the name of the first sheet
  const firstSheet = workbook.Sheets[firstSheetName]; // Get the first sheet

  // Convert spreadsheet content to JSON object
  const productsData = XLSX.utils.sheet_to_json(firstSheet, { raw: true });
  productsData.sort(function (a, b) {
    const productA = a.PRODUCTO.toUpperCase(); // Convertir a mayúsculas para asegurar un ordenamiento sin importar la capitalización
    const productB = b.PRODUCTO.toUpperCase();
    if (productA < productB) {
        return -1;
    }
    if (productA > productB) {
        return 1;
    }
    return 0;
  });

  /* Each time the file is loaded, the excelPicker is cleared and the reload dataset is added to the div.products. 
  This dataset is used by the createProductCard function so that in the event of adding a new file, it reloads the product cards and the search
  input references the new elements. */
  const productContainer = document.getElementById("product-container");
  const excelFilePicker = document.getElementById("select-excel-file-area");

  if (productContainer) {
    if (excelFilePicker) {
      excelFilePicker.remove();
    }
    productContainer.innerHTML = "";
  }

  const productsDataString = JSON.stringify(productsData);
  localStorage.setItem('productsData', productsDataString);

  // Create product cards and append them to the DOM
  JSON.parse(localStorage.getItem('productsData')).forEach((product, index) => {
    createProductCard(product, "product-container", index);
  });

  removeAttributeFromElementById("product-search-bar", "disabled");
  cerrarModal();
  }, 500);
}

function mostrarModal() {
  const modal = new bootstrap.Modal(document.getElementById('sorting-data-modal'));
  modal.show();
}

// Función para cerrar el modal utilizando JavaScript puro
function cerrarModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const modalContainer = document.querySelector('.modal.fade.show');
  
  if (modalBackdrop && modalContainer) {
    modalBackdrop.parentNode.removeChild(modalBackdrop); // Eliminar el nodo del modal-backdrop
    modalContainer.classList.remove('show');
    modalContainer.style.display = 'none';
  }
}