import { createProductCard } from "./create-product-card.js";

export function addProductToLocalStorage(productData) {
  // Mostrar notificación de producto agregado
  const toastElement = document.getElementById('product-toast');
  const toast = new bootstrap.Toast(toastElement);
  let productName;
  let brandE;
  let brandA;
  let priceE;
  let priceA;

  // Obtener valores del formulario
  if (productData) {
    productName = productData["PRODUCTO"];
    brandE = productData["MARCA"];
    brandA = productData["MARCA_1"];
    priceE = productData["P UNI"];
    priceA = productData["P UNI_1"];
  } else {
    productName = document.getElementById("product-name").value;
    brandE = document.getElementById("name-quality-e").value;
    brandA = document.getElementById("name-quality-a").value;
    priceE = document.getElementById("price-quality-e").value;
    priceA = document.getElementById("price-quality-a").value;
  }

  // Crear objeto de producto con valores del formulario
  const product = {
    "PRODUCTO": productName,
    "MARCA": brandE,
    "MARCA_1": brandA,
    "P UNI": priceE,
    "P UNI_1": priceA
  };

  // Obtener datos de productos almacenados en localStorage
  const productsDataString = JSON.parse(localStorage.getItem("productsData")) || [];

  // Agregar el nuevo producto a la lista
  productsDataString.push(product);

  // Ordenar productos alfabéticamente por nombre
  productsDataString.sort((a, b) => {
    const productA = a.PRODUCTO.toUpperCase();
    const productB = b.PRODUCTO.toUpperCase();
    return (productA < productB) ? -1 : (productA > productB) ? 1 : 0;
  });

  // Limpiar contenedor de productos
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  // Crear tarjetas de producto y agregarlas al contenedor
  productsDataString.forEach((product, index) => {
    createProductCard(product, "product-container", index);
  });

  // Actualizar localStorage con la nueva lista de productos
  localStorage.setItem("productsData", JSON.stringify(productsDataString));

  toast.show();
  setTimeout(function() {
    toast.hide();
  }, 800); // 5000 milisegundos = 5 segundos
}
