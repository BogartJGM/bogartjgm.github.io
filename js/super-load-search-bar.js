/**
 * Añade funcionalidades extra a la barra de búsqueda
 * @param {HTMLInputElement} searchBar
 */
export function superLoadSearchBar(searchBar) {
  searchBar?.addEventListener("keydown", function (event) {
    const searchedProduct = document.querySelector(".searched-product");

    if (searchedProduct) {
      const inputQuantity = searchedProduct.parentElement.parentElement.nextSibling.lastChild.querySelector(".cantidad")

      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          // Acción para flechaArriba
          let previousProduct;
          let previous = true;
          let previousElement = searchedProduct.parentElement.parentElement.parentElement.previousSibling;

          do {
            if (previousElement == null) {
              previous = false;
            } else if (!previousElement.classList.contains("hided")) {
              previousProduct = previousElement;
              previous = false;
            } else {
              previousElement = previousElement.previousSibling;
            }
          } while (previous);

          if (previousProduct) {
            searchedProduct.classList.remove("searched-product");
            previousProduct.querySelector(".add-product").classList.add("searched-product");
            previousProduct.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          break;
        case "ArrowDown":
          event.preventDefault();

          // Acción para flechaAbajo
          let nextProduct;
          let next = true;
          let nextElement = searchedProduct.parentElement.parentElement.parentElement.nextSibling;

          do {
            if (nextElement == null) {
              next = false;
            } else if (!nextElement.classList.contains("hided")) {
              nextProduct = nextElement;
              next = false;
            } else {
              nextElement = nextElement.nextSibling;
            }
          } while (next);

          if (nextProduct) {
            searchedProduct.classList.remove("searched-product");
            nextProduct.querySelector(".add-product").classList.add("searched-product");
            nextProduct.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          break;
        case "+":
          event.preventDefault();
          inputQuantity.value = inputQuantity.value ? Number(inputQuantity.value) + 1 : 2;
          break;
        case "-":
          event.preventDefault();
          if (inputQuantity.value != "") {
            inputQuantity.value = (inputQuantity.value - 1 != 0 || inputQuantity.value == "") ? Number(inputQuantity.value) - 1 : "";
          }
          break;
        case "Enter":
          event.preventDefault();
          // Acción para Enter
          searchedProduct.click();
          break;
        default:
          // Acción para otras teclas (opcional)
          break;
      }
    }
  });
}