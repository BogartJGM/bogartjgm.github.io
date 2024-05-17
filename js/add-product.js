import { createProductCard } from "./create-product-card.js";

export function addProduct() {
  // Mostrar notificación de producto agregado
  const toastElement = document.getElementById('product-toast');
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  // Obtener valores del formulario
  const productName = document.getElementById("product-name").value;
  const brandE = document.getElementById("name-quality-e").value;
  const brandA = document.getElementById("name-quality-a").value;
  const priceE = document.getElementById("price-quality-e").value;
  const priceA = document.getElementById("price-quality-a").value;

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
}
