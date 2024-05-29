export function showImage() {
  const selectedProducts = document.querySelectorAll(".productSelected");
  const tablaCotizacionProducts = document.getElementById("selected-products-table");
  // Datos formulario
  const formNombreCliente = document.getElementById("client-name");
  const formNombreEscuela = document.getElementById("client-school-name");
  const formGradoYGrupo = document.getElementById("client-grade-group");
  const formFechaCotizacion = document.getElementById("quote-date-start");
  const formValidoHasta = document.getElementById("quote-date-end");
  const formDescuento = document.getElementById("discount");
  const formNotas = document.getElementById("client-notes");
  // Costos totales de calidad
  const spanTotalQualityE = document.getElementById("economic-quality-sum");
  const spanTotalQualityA = document.getElementById("high-quality-sum");

  /** TABLA */
  // Header
  const tablaDatosCliente = document.getElementById("customer-data-table");
  const tablaCotizadoEn = document.getElementById("customer-quote-start-table");
  const tablaValidoHasta = document.getElementById("customer-quote-end-table");
  const tablaDescuento = document.getElementById("table-cell-discount");
  // Tabla footer
  const tablaCostoTotalCE = document.getElementById("total-economic-quality-cost");
  const tablaCostoTotalCA = document.getElementById("total-high-quality-cost");
  const tablaCostoTDescuentoCE = document.getElementById("total-economic-quality-cost-discount");
  const tablaCostoTDescuentoCA = document.getElementById("total-high-quality-cost-discount");
  const tablaApartadoCE = document.getElementById("initial-economic-quality-deposit");
  const tablaApartadoCA = document.getElementById("initial-high-quality-deposit");

  // Vaciar tabla antes de añadir de nuevo los productos
  tablaCotizacionProducts.innerHTML = "";

  selectedProducts.forEach((product) => {
    const datosProducto = {};

    const checkboxCalidadE = product.querySelector(".CALIDADE");
    const checkboxCalidadA = product.querySelector(".CALIDADA");
    
    const cantidad = product.querySelector(".cantidad").value == "" ? 1 : Number(product.querySelector(".cantidad").value);
    const nombreProducto = product.querySelector(".input-group-text.col-10").textContent;

    const marcaCE = checkboxCalidadE.checked ? product.querySelectorAll(".qualityName")[0].textContent : product.querySelectorAll(".qualityName")[1].textContent;
    const precioUCE = checkboxCalidadE.checked ? Number(product.querySelectorAll(".price")[0].textContent) : Number(product.querySelectorAll(".price")[1].textContent);
    const marcaCA = checkboxCalidadA.checked ? product.querySelectorAll(".qualityName")[1].textContent : product.querySelectorAll(".qualityName")[0].textContent;
    const precioUCA = checkboxCalidadA.checked ? Number(product.querySelectorAll(".price")[1].textContent) : Number(product.querySelectorAll(".price")[0].textContent);

    datosProducto["cantidad"] = cantidad;
    datosProducto["producto"] = nombreProducto;
    datosProducto["MARCA_CE"] = marcaCE;
    datosProducto["PRECIO_U_CE"] = precioUCE;
    datosProducto["IMPORTE_CE"] = cantidad * precioUCE;
    datosProducto["MARCA_CA"] = marcaCA;
    datosProducto["PRECIO_U_CA"] = precioUCA;
    datosProducto["IMPORTE_CA"] = cantidad * precioUCA;

    const productRow = createTableRow(datosProducto);

    tablaCotizacionProducts.appendChild(productRow);

    // Añadir información en header de tabla
    if (formNombreEscuela.value && formGradoYGrupo.value) {
      tablaDatosCliente.textContent = formNombreCliente.value + " " + formNombreEscuela.value + " - " + formGradoYGrupo.value;
    } else if (formNombreEscuela.value) {
      tablaDatosCliente.textContent = formNombreCliente.value + " " + formNombreEscuela.value;
    } else {
      tablaDatosCliente.textContent = formNombreCliente.value + " - " + formGradoYGrupo.value;
    }

    tablaCotizadoEn.textContent = formFechaCotizacion.value;
    tablaValidoHasta.textContent = formValidoHasta.value;
    tablaApartadoCA.textContent = formValidoHasta.value;
    tablaDescuento.textContent = formDescuento.value;
    // Añadir costos en footer de la tabla
    tablaCostoTotalCE.textContent = spanTotalQualityE.textContent;
    tablaCostoTDescuentoCE.textContent = Math.round(Number(spanTotalQualityE.textContent) * (1 - Number(formDescuento.value) / 100)); // Cambiar ese 0.9 por el precio descuento real (según el formulario)
    tablaApartadoCE.textContent = Number(spanTotalQualityE.textContent) * 0.25; 
    tablaCostoTotalCA.textContent = spanTotalQualityA.textContent;
    tablaCostoTDescuentoCA.textContent = Math.round(Number(spanTotalQualityA.textContent) * (1 - Number(formDescuento.value) / 100)); // Cambiar ese 0.9 por el precio descuento real (según el formulario)
    tablaApartadoCA.textContent = Math.round(Number(spanTotalQualityA.textContent) * 0.25);
  });
}

function createTableRow(datosProducto) {
  const rowProduct = document.createElement("tr");

  const tdCantidad = document.createElement("td");
  const tdNombreProducto = document.createElement("td");
  const tdMarcaCE = document.createElement("td");
  const tdPrecioUCE = document.createElement("td");
  const tdImporteCE = document.createElement("td");
  const tdMarcaCA = document.createElement("td");
  const tdPrecioUCA = document.createElement("td");
  const tdImporteCA = document.createElement("td");

  tdCantidad.textContent = datosProducto["cantidad"];
  tdCantidad.classList.add("text-center");
  tdNombreProducto.textContent = datosProducto["producto"];
  tdMarcaCE.textContent = datosProducto["MARCA_CE"];
  tdPrecioUCE.textContent = datosProducto["PRECIO_U_CE"];
  tdPrecioUCE.classList.add("text-end");
  tdImporteCE.textContent = datosProducto["IMPORTE_CE"];
  tdImporteCE.classList.add("text-end");
  tdMarcaCA.textContent = datosProducto["MARCA_CA"];
  tdPrecioUCA.textContent = datosProducto["PRECIO_U_CA"];
  tdPrecioUCA.classList.add("text-end");
  tdImporteCA.textContent = datosProducto["IMPORTE_CA"];
  tdImporteCA.classList.add("text-end");

  rowProduct.appendChild(tdCantidad);
  rowProduct.appendChild(tdNombreProducto);
  rowProduct.appendChild(tdMarcaCE);
  rowProduct.appendChild(tdPrecioUCE);
  rowProduct.appendChild(tdImporteCE);
  rowProduct.appendChild(tdMarcaCA);
  rowProduct.appendChild(tdPrecioUCA);
  rowProduct.appendChild(tdImporteCA);

  return rowProduct;
}
