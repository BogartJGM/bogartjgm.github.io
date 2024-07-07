import { addProductToLocalStorage } from "./add-product-to-local-storage.js";
import { addSelectedProduct } from "./add-selected-product.js";

/**
 *
 * @param {JSON} productData
 * @param {HTMLDivElement} productSelectedContainer
 * @param {Number} index
 */
export function createSelectedProductCard(productData, index) {

  if (index == 0) {
    const formulario = document.getElementById("flush-collapse-form-client");
    
    // Se llena la información del formulario del cliente
    formulario.querySelector("#client-name").value = productData["nombreCliente"] || "";
    formulario.querySelector("#client-school-name").value = productData["nombreEscuela"] || "";
    formulario.querySelector("#client-grade-group").value = productData["gradoYGrupo"] || "";
    formulario.querySelector("#quote-date-start").value = productData["fechaCotizacion"] || "";
    formulario.querySelector("#quote-date-end").value = productData["validoHasta"] || "";
    formulario.querySelector("#discount").value = productData["descuento"] || "";
    formulario.querySelector("#client-notes").value = productData["notas"] || "";

    if (!document.getElementById("flush-collapse-form-client").classList.contains("show")) {
      const btnAccordion = document.querySelector(".accordion-button");
      btnAccordion.click();
    }
  }

  /*************************** ZONA DE IMPORTACIÓN DE EXCEL***********************************/
  const productsSelectable = document.querySelectorAll("#product-container div.product");
  let found = false;

  // Si encuentra un producto con el mismo nombre, lo utiliza como plantilla y cambie los datos que sean necesarios:
  /*
    Los datos que sean necesarios son:
    - Cantidad
    Para ambas calidades:
    - Checkbox desmarcados
    - Nombre de la calidad
    - Precio

    Luego hace las operaciones necesarias para los checkboxs desmarcads y finalmente se agrega el producto.
  */
  productsSelectable.forEach((product) => {
    if (product.querySelector("span.product").textContent == productData["PRODUCTO"]) {
      const formatteImportedProduct = product.cloneNode(true);

      formatteImportedProduct.querySelector(".cantidad").value = productData["CANTIDAD"]
      
      formatteImportedProduct.querySelector("input.CALIDADE").checked = productData["CONTEMPLAR"];
      formatteImportedProduct.querySelectorAll(".qualityName")[0].textContent = productData["MARCA"];
      formatteImportedProduct.querySelectorAll(".price")[0].textContent = productData["P UNI"];

      formatteImportedProduct.querySelector("input.CALIDADA").checked = productData["CONTEMPLAR_1"];
      formatteImportedProduct.querySelectorAll(".qualityName")[1].textContent = productData["MARCA_1"];
      formatteImportedProduct.querySelectorAll(".price")[1].textContent = productData["P UNI_1"];
    
      const calidadE = formatteImportedProduct.querySelector(".row:nth-child(3)").children[0];
      const calidadA = formatteImportedProduct.querySelector(".row:nth-child(3)").children[1];

      if (formatteImportedProduct.querySelector("input.CALIDADE").checked && formatteImportedProduct.querySelector("input.CALIDADA").checked)  {
        formatteImportedProduct.querySelector("input.CALIDADE").disabled = "";
        formatteImportedProduct.querySelector("input.CALIDADA").disabled = "";
        calidadE.querySelector("tbody").style.opacity = "";
        calidadA.querySelector("tbody").style.opacity = "";
        calidadE.querySelector(".title").style.display = "";
        calidadA.querySelector(".title").style.display = "";

        calidadE.className = "col-md-6 box animated-col";
        calidadE.querySelector(".title").textContent = "CALIDAD E";
        calidadA.className = "col-md-6 box animated-col";
        calidadA.querySelector(".title").textContent = "CALIDAD A";
      } else if (formatteImportedProduct.querySelector("input.CALIDADE").checked) {
        formatteImportedProduct.querySelector("input.CALIDADE").disabled = true;
        calidadE.querySelector("tbody").style.opacity = "";
        calidadE.querySelector(".title").style.display = "";
        
        calidadE.className = "col-md-9 box animated-col";
        formatteImportedProduct.querySelector("input.CALIDADA").disabled = true;
        calidadE.querySelector(".title").textContent = "CALIDAD A Y E";
        calidadA.className = "col-md-2 box animated-col";
        calidadA.querySelector("tbody").style.opacity = 0.2;
        calidadA.querySelector(".title").style.display = "none";
      } else {
        calidadA.querySelector("tbody").style.opacity = "";
        calidadA.querySelector(".title").style.display = "";

        calidadE.className = "col-md-2 box animated-col";
        calidadE.querySelector("tbody").style.opacity = 0.2;
        calidadE.querySelector(".title").style.display = "none";
        calidadA.className = "col-md-9 box animated-col";
        calidadA.querySelector(".title").textContent = "CALIDAD A Y E";
      }

      addSelectedProduct(formatteImportedProduct);

      found = true;
    }
  });

  // Si no existe, se introduce copia uno que ya existe, se clona y se importa
  if (!found) {
    addProductToLocalStorage(productData);

    document.querySelectorAll("#product-container div.product").forEach((product) => {
      if (product.querySelector("span.product").textContent == productData["PRODUCTO"]) {
        const formatteImportedProduct = product.cloneNode(true);
  
        formatteImportedProduct.querySelector(".cantidad").value = productData["CANTIDAD"]
        
        formatteImportedProduct.querySelector("input.CALIDADE").checked = productData["CONTEMPLAR"];
        formatteImportedProduct.querySelectorAll(".qualityName")[0].textContent = productData["MARCA"];
        formatteImportedProduct.querySelectorAll(".price")[0].textContent = productData["P UNI"];
  
        formatteImportedProduct.querySelector("input.CALIDADA").checked = productData["CONTEMPLAR_1"];
        formatteImportedProduct.querySelectorAll(".qualityName")[1].textContent = productData["MARCA_1"];
        formatteImportedProduct.querySelectorAll(".price")[1].textContent = productData["P UNI_1"];
      
        const calidadE = formatteImportedProduct.querySelector(".row:nth-child(3)").children[0];
        const calidadA = formatteImportedProduct.querySelector(".row:nth-child(3)").children[1];
  
        if (formatteImportedProduct.querySelector("input.CALIDADE").checked && formatteImportedProduct.querySelector("input.CALIDADA").checked)  {
          formatteImportedProduct.querySelector("input.CALIDADE").disabled = "";
          formatteImportedProduct.querySelector("input.CALIDADA").disabled = "";
          calidadE.querySelector("tbody").style.opacity = "";
          calidadA.querySelector("tbody").style.opacity = "";
          calidadE.querySelector(".title").style.display = "";
          calidadA.querySelector(".title").style.display = "";
  
          calidadE.className = "col-md-6 box animated-col";
          calidadE.querySelector(".title").textContent = "CALIDAD E";
          calidadA.className = "col-md-6 box animated-col";
          calidadA.querySelector(".title").textContent = "CALIDAD A";
        } else if (formatteImportedProduct.querySelector("input.CALIDADE").checked) {
          formatteImportedProduct.querySelector("input.CALIDADE").disabled = true;
          calidadE.querySelector("tbody").style.opacity = "";
          calidadE.querySelector(".title").style.display = "";
          
          calidadE.className = "col-md-9 box animated-col";
          formatteImportedProduct.querySelector("input.CALIDADA").disabled = true;
          calidadE.querySelector(".title").textContent = "CALIDAD A Y E";
          calidadA.className = "col-md-2 box animated-col";
          calidadA.querySelector("tbody").style.opacity = 0.2;
          calidadA.querySelector(".title").style.display = "none";
        } else {
          calidadA.querySelector("tbody").style.opacity = "";
          calidadA.querySelector(".title").style.display = "";
  
          calidadE.className = "col-md-2 box animated-col";
          calidadE.querySelector("tbody").style.opacity = 0.2;
          calidadE.querySelector(".title").style.display = "none";
          calidadA.className = "col-md-9 box animated-col";
          calidadA.querySelector(".title").textContent = "CALIDAD A Y E";
        }
  
        addSelectedProduct(formatteImportedProduct);
      }
    });
  }
}
