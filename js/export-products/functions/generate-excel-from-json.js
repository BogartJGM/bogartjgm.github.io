/**
 * Genera un archivo Excel a partir de un arreglo de objetos JSON.
 */
export function generateExcelFromJson() {
  const jsonData = createJSON(".card.product");

  // Crear un nuevo libro de Excel
  const workbook = XLSX.utils.book_new();

  // Convertir datos a una hoja de Excel
  const worksheet = XLSX.utils.json_to_sheet(jsonData);

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  const todayDate = getCurrentDate();
  const fileName = `PRODUCTOS ${todayDate}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}

/**
 * Crea un JSON[] a partir de cartas de producto
 * @param {string} productClassName - Nombre de la clase única para productos seleccionables
 * @returns {Object[]}
 */
function createJSON(productClassName) {
  const jsonProducts = [];

  const selectableProductCards = document.querySelectorAll(productClassName);

  selectableProductCards.forEach(card => {
    const product = {
      "PRODUCTO": card.querySelector(".product.search").textContent,
      "MARCA": card.querySelectorAll("td.qualityName")[0].textContent,
      "P UNI": card.querySelectorAll("td.price")[0].textContent,
      "MARCA_1": card.querySelectorAll("td.qualityName")[1].textContent,
      "P UNI_1": card.querySelectorAll("td.price")[1].textContent
    };

    jsonProducts.push(product);
  });

  return jsonProducts;
}

/**
 * Obtiene la fecha y hora actual en formato DD-MM-YYYY HH.MM.SS
 * @returns {string}
 */
function getCurrentDate() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}.${minutes}.${seconds}`;
}
