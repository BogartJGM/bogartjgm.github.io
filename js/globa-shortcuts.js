export function addGlobalShortcuts() {
  document.addEventListener("keydown", (event) => {
    if (event.altKey) {
      if (Number(event.key) > 0) {
        const searchedProduct = document.querySelector(".searched-product");
        if (searchedProduct) {
          const inputCantidad = searchedProduct.parentElement.parentElement.nextSibling.firstChild.lastChild;
          inputCantidad.value = Number(event.key);
        }
      } else {
        switch (event.key) {
          case "b":
            document.getElementById("product-search-bar").focus();
            break;
          case "v":
            document.getElementById("show-image").click();
            break;
          case "c":
            const btnAccordion = document.querySelector(".accordion-button");

            btnAccordion.click();
        }
      }
    }
  });
}
