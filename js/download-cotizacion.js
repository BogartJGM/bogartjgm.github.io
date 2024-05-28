export function downloadExcel() {
  let datosJSON = createJSON();
  console.log(datosJSON);

  // Crear un nuevo libro de Excel
  let workbook = XLSX.utils.book_new();

  // // Convertir datos a una hoja de Excel
  let worksheet = XLSX.utils.json_to_sheet(datosJSON);

  // Agregar la hoja al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

  // Convertir el libro a un archivo Excel y guardarlo
  const fileName = document.getElementById("file-name");

  let nombreArchivo = `${fileName.value.trim()}.xlsx`;
  let imageLoaded = document.querySelector(".image-tag-placeholder");

  XLSX.writeFile(workbook, nombreArchivo);
  if (imageLoaded.complete && imageLoaded.naturalHeight !== 0) {
    const imageAnchor = document.createElement("a");
    imageAnchor.href = imageLoaded.dataset.originalSrc;
    imageAnchor.download = `${fileName.value.trim()}.jpeg`
    imageAnchor.click();
  }
}

function createJSON() {
  let jsonProductos = [];
  const productsSelected = document.querySelectorAll("#selected-product-container .productSelected");
  const formulario = document.getElementById("flush-collapse-form-client");
  
  productsSelected.forEach((productSelected, index) => {
    let producto = {};
    
    producto["CANTIDAD"] = (productSelected.querySelector(".cantidad").value) ? Number(productSelected.querySelector(".cantidad").value) : 1;
    producto["PRODUCTO"] = productSelected.querySelector(".product").textContent;
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