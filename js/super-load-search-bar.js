/**
 * Añade funcionalidades extra a la barra de búsqueda
 * @param {HTMLInputElement} searchBar
 */
export function superLoadSearchBar(searchBar) {
  searchBar?.addEventListener("keydown", function (event) {
    const searchedProduct = document.querySelector(".searched-product");

    if (searchedProduct) {
      const inputQuantity = searchedProduct.parentElement.parentElement.nextSibling.lastChild.querySelector(".cantidad");

      if (event.altKey) {
        if (Number(event.key) > 0) {
          const inputCantidad = searchedProduct.parentElement.parentElement.nextSibling.firstChild.lastChild;
          inputCantidad.value = Number(event.key);
          inputQuantity.dataset.cantidadAnterior = Number(event.key);
        }
      } else {
        switch (event.key) {
          case "ArrowUp":
            event.preventDefault();
            // Acción para flechaArriba
            let previousProduct;
            let previous = true;
            let previousElement =
              searchedProduct.parentElement.parentElement.parentElement
                .previousSibling;

            /*  Se comprueba si existe un producto previo. Esta comprobación
                Esta comprobación es ya que la clase de "searched-product" se aplica
                sobre todas las tarjetas indiferentemente de si estas están con display hide
                Se recorre los productos que no tenga la clase "hided" hasta encontrar uno y
                aplicarle la clase searched-product. El otro escenario es que ya no existan
                productos previos y por ende la clase searched-product se mantenga en el mismo elemento.
            */
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
              previousProduct
                .querySelector(".add-product")
                .classList.add("searched-product");
              previousProduct.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
            break;
          case "ArrowDown":
            event.preventDefault();

            // Acción para flechaAbajo
            let nextProduct;
            let next = true;
            let nextElement =
              searchedProduct.parentElement.parentElement.parentElement
                .nextSibling;

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
              nextProduct
                .querySelector(".add-product")
                .classList.add("searched-product");
              nextProduct.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
            break;
          case "+":
            event.preventDefault();
            inputQuantity.value = inputQuantity.value ? Number(inputQuantity.value) + 1 : 2;

            inputQuantity.dataset.cantidadAnterior++;
            break;
          case "-":
            event.preventDefault();
            if (inputQuantity.value != "") {
              inputQuantity.value = inputQuantity.value - 1 != 0 || inputQuantity.value == "" ? Number(inputQuantity.value) - 1 : "";

              if (inputQuantity.dataset.cantidadAnterior - 1 != 0) {
                inputQuantity.dataset.cantidadAnterior--;
              }
            }
            break;
          case "Enter":
            event.preventDefault();
            // Acción para Enter
            searchedProduct.click();

            searchBar.value = "";
            let eventito = new Event("input", {
              bubbles: true,
              cancelable: true,
              value: "",
            });

            inputQuantity.dataset.cantidadAnterior = 1;

            searchBar.dispatchEvent(eventito);
            break;
          default:
            // Acción para otras teclas (opcional)
            break;
        }
      }
    }
  });
}

/**
 * Añade dos eventos de escucha para las teclas "arriba" y "abajo" a un input de tipo búsqueda
 * Las teclas de arriba y abajo hacen que los productos de la columna de productos seleccionados se puedan desplazar entre ellos.
 * @param {HTMLInputElement} searchBar 
 */
export function highlightSelectedProductsSearchBar(searchBar) {
  // Bogart del Futuro, lo siento mucho por tener que mirar este código.
  /* Este código es para resaltar los productos cuando se está en su bara de búsqueda correspondiente. 
  ** Si no le entiendes, dentro de poco el Bogart que escribe esto tampoco jaja, suerte
  */
  if (searchBar) {
    
    searchBar.addEventListener("keydown", (ev) => {
      const firstSelectedProductName = document.getElementById("selected-product-container").firstElementChild.querySelector(".product");
      const firstSelectedProductQuantity = document.getElementById("selected-product-container").firstElementChild.querySelector(".cantidad");
      const highlightedProduct = document.querySelector(".hightLightedProduct");
      const highlightedProductQuantity = document.querySelector(".hightLightedProductQuantity");

      switch (ev.key) {
        case "ArrowUp":
          ev.preventDefault();

          let previousProductName;
          let previousProductQuantity;
          
          if (highlightedProduct) {
            previousProductName = highlightedProduct.closest(".productSelected").previousElementSibling?.querySelector(".product") || highlightedProduct;
            previousProductQuantity = previousProductName.nextElementSibling;
            
            if (previousProductName) {
              highlightedProduct.classList.remove("hightLightedProduct");
              highlightedProductQuantity.classList.remove("hightLightedProductQuantity");

              previousProductName.classList.add("hightLightedProduct");
              previousProductQuantity.classList.add("hightLightedProductQuantity");
            }
          } else {
            previousProductName = firstSelectedProductName;
            previousProductQuantity = firstSelectedProductQuantity

            previousProductName.classList.add("hightLightedProduct");
            previousProductQuantity.classList.add("hightLightedProductQuantity");
          }

          // Se hace scroll para que el elemento que tenga la clase 
          document.querySelector(".hightLightedProduct").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });

          break;
        case "ArrowDown":
          ev.preventDefault();

          let nextProductName;
          let nextProductQuantity;

          if (highlightedProduct) {
            nextProductName = highlightedProduct.closest(".productSelected").nextElementSibling?.querySelector(".product") || highlightedProduct;
            nextProductQuantity = nextProductName.nextElementSibling;

            console.log(nextProductQuantity);
            
            if (nextProductName) {
              highlightedProduct.classList.remove("hightLightedProduct");
              highlightedProductQuantity.classList.remove("hightLightedProductQuantity");

              nextProductName.classList.add("hightLightedProduct");
              nextProductQuantity.classList.add("hightLightedProductQuantity");
            }
          } else {
            nextProductName = firstSelectedProductName;
            nextProductQuantity = firstSelectedProductQuantity

            nextProductName.classList.add("hightLightedProduct");
            nextProductQuantity.classList.add("hightLightedProductQuantity");
          }

          // Se hace scroll para que el elemento que tenga la clase 
          document.querySelector(".hightLightedProduct").scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          break;
        case "Escape": 
          highlightedProduct.classList.remove("hightLightedProduct");
          highlightedProductQuantity.classList.remove("hightLightedProductQuantity");
          break;
      }
    });
  } else {
    return console.error("La barra de búsqeda pasada por parámetro no existe");
  }
}