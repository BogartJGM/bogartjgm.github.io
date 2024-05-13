/**
 * 
 * @param {JSON} datosJSON - Datos en JSON de los productos seleccionados y los datos del cliente
 */
export function downloadExcel() {
  let datosJSON = createJSON();
  console.log(datosJSON);

  // Crear un nuevo libro de Excel
  let workbook = XLSX.utils.book_new();

  // // Convertir datos a una hoja de Excel
  let worksheet = XLSX.utils.json_to_sheet(datosJSON);

  // // Ajustar automáticamente el ancho de las columnas
  let maxWidths = [];
  datosJSON.forEach((row) => {
    Object.keys(row).forEach((key, index) => {
      const cellLength = row[key].toString().length;
      if (!maxWidths[index] || maxWidths[index] < cellLength) {
        maxWidths[index] = cellLength;
      }
    });
  });

  maxWidths.forEach((width, index) => {
    worksheet["!cols"] = worksheet["!cols"] || [];
    worksheet["!cols"][index] = { width: width + 5 }; // Add some padding for better readability
  });

  // // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // // Convertir el libro a un archivo Excel y guardarlo
  let nombreArchivo = "datos.xlsx";
  XLSX.writeFile(workbook, nombreArchivo);
}

function createJSON() {
  let jsonProductos = [];
  const productsSelected = document.querySelectorAll("div.card.p-2.productSelected");
  const formulario = document.getElementById("flush-collapse-form-client");
  
  productsSelected.forEach((productSelected, index) => {
    let producto = {};
    
    producto["cantidad"] = (productSelected.querySelector(".cantidad").value) ? Number(productSelected.querySelector(".cantidad").value) : 1;
    producto["PRODUCTO"] = productSelected.querySelector("span.input-group-text").textContent;
    producto["MARCA"] = productSelected.querySelectorAll("td.qualityName")[0].textContent;
    producto["P UNI"] = productSelected.querySelectorAll("td.price")[0].textContent;
    producto["CONTEMPLAR"] = productSelected.querySelectorAll("input.form-check-input")[0].checked;
    producto["MARCA_1"] = productSelected.querySelectorAll("td.qualityName")[1].textContent;
    producto["P UNI_1"] = productSelected.querySelectorAll("td.price")[1].textContent;
    producto["CONTEMPLAR_1"] = productSelected.querySelectorAll("input.form-check-input")[1].checked;
    
    jsonProductos.push(producto);
    
    if (index == 0) {
      producto["nombreCliente"] = formulario.querySelector("#client-name").value;
      producto["nombreEscuela"] = formulario.querySelector("#client-school-name").value;
      producto["gradoYGrupo"] = formulario.querySelector("#client-grade-group").value;
      producto["fechaCotizacion"] = formulario.querySelector("#quote-date-start").value;
      producto["validoHasta"] = formulario.querySelector("#quote-date-end").value;
      producto["descuento"] = formulario.querySelector("#discount").value;
      producto["notas"] = formulario.querySelector("#client-notes").value;
    }
  });

  return jsonProductos;
}