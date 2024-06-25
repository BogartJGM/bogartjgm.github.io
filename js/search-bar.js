/**
 * Añade un evento a un input para controlar la búsqueda de productos.
 * Recupera tarjetas de productos con la clase .search y compara su contenido de texto con el texto de un input.
 * Llama a una función para comparar el texto ingresado con el contenido del texto de la tarjeta y determina la visibilidad de las tarjetas según la puntuación.
 *
 * @param {HTMLInputElement} inputSearchBar - El elemento input al que se agrega el evento.
 * @param {String} cardsClasses - La clase de los productos. Puede ser productos seleccionados o productos.
 */
export function search(inputSearchBar, cardsClasses) {
  inputSearchBar.addEventListener("input", handleSearchInput);
  
  function handleSearchInput(e) {
    const inputSearchBarValue = e.target.value;

    /**
     * Arreglo de letras y palabras. Es usado para filtrar inputArrayWords.
     * @type {Set<string>}
     */
    const wordsToRemove = new Set(["", "de", ..."abcdefghijklmnopqrstuvwxyzñ", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZÑ"]);

    /**
     * Arreglo con las palabras de un input después de filtrarlo.
     * @type {string[]}
     */
    const inputArrayWords = inputSearchBarValue.trim().split(" ").filter(word => !wordsToRemove.has(word));

    /**
     * Valor mínimo requerido para considerar a un producto en una búsqueda.
     * @type {number}
     */
    const minThresholdValue = Math.round(inputArrayWords.length / 2 + inputArrayWords.length / 4);

    /**
     * Cartas de producto que se filtrarán.
     * @type {NodeListOf<HTMLDivElement>}
     */
    const productCards = document.querySelectorAll(cardsClasses);

    productCards.forEach((productCard) => filterProductCard(productCard, inputArrayWords, minThresholdValue));

    if (cardsClasses === "div.card.p-2.product" && inputSearchBarValue !== "") {
      highlightFirstSearchedProduct();
    } else {
      clearHighlightedProduct();
    }
  }

  /**
   * Filtra una tarjeta de producto basado en las palabras de entrada.
   *
   * @param {HTMLDivElement} productCard - La tarjeta de producto a filtrar.
   * @param {string[]} inputArrayWords - Arreglo de palabras del input de búsqueda.
   * @param {number} minThresholdValue - Valor mínimo requerido para considerar a un producto en una búsqueda.
   */
  function filterProductCard(productCard, inputArrayWords, minThresholdValue) {
    if (inputArrayWords.length) {
      /**
       * Arreglo que contiene las palabras importantes de la tarjeta de producto.
       * Estas palabras son las que se contemplarán en la búsqueda.
       * @type {string[]}
       */
      const cardWords = Array.from(productCard.querySelectorAll(".search")).map(element => element.textContent);

      const productWordBool = searchWord(inputArrayWords, cardWords);

      // Si el producto tiene menor score que minThresholdValue, se oculta; si no, se muestra.
      if (!productWordBool) {
        productCard.style.display = "none";
        productCard.classList.add("hided");
      } else {
        productCard.removeAttribute("style");
        productCard.classList.remove("hided");
      }
    } else {
      productCard.removeAttribute("style");
      productCard.classList.remove("hided");
    }
  }

  // function filterProductCard(productCard, inputArrayWords, minThresholdValue) {
  //   if (inputArrayWords.length) {
  //     /**
  //      * Arreglo que contiene las palabras importantes de la tarjeta de producto.
  //      * Estas palabras son las que se contemplarán en la búsqueda.
  //      * @type {string[]}
  //      */
  //     const cardWords = Array.from(productCard.querySelectorAll(".search")).map(element => element.textContent);

  //     const productWordScore = searchWord(inputArrayWords, cardWords);

  //     // Si el producto tiene menor score que minThresholdValue, se oculta; si no, se muestra.
  //     if (productWordScore < minThresholdValue) {
  //       productCard.style.display = "none";
  //       productCard.classList.add("hided");
  //     } else {
  //       productCard.removeAttribute("style");
  //       productCard.classList.remove("hided");
  //     }
  //   } else {
  //     productCard.removeAttribute("style");
  //     productCard.classList.remove("hided");
  //   }
  // }

  /**
   * Resalta el primer producto buscado.
   */
  function highlightFirstSearchedProduct() {
    const previousProductoBuscado = document.querySelector(".searched-product");
    if (previousProductoBuscado) {
      previousProductoBuscado.classList.remove("searched-product");
    }

    const primerProductBuscado = document.querySelector(`${cardsClasses}:not(.hided)`);
    if (primerProductBuscado) {
      primerProductBuscado.querySelector(".add-product").classList.add("searched-product");
      primerProductBuscado.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Elimina la clase resaltada de un producto.
   */
  function clearHighlightedProduct() {
    const previousProductoBuscado = document.querySelector(".searched-product");
    if (previousProductoBuscado) {
      previousProductoBuscado.classList.remove("searched-product");
    }
  }
}

/**
 * Compara dos arreglos de palabras y retorna un puntaje basado en el número de coincidencias.
 *
 * @param {string[]} inputArrayWords - Arreglo de palabras del input de búsqueda.
 * @param {string[]} cardWords - Arreglo de palabras dentro de una tarjeta de producto.
 * @returns {number} - Puntaje basado en el número de coincidencias entre los dos arreglos.
 */
function searchWord(inputArrayWords, cardWords) {
  return inputArrayWords.every(element1 => 
    cardWords.some(element2 => 
      removeAccents(element2.toLowerCase()).includes(removeAccents(element1.toLowerCase()))
    )
  );
}

function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// function searchWord(inputArrayWords, cardWords) {
//   let score = 0;

//   /**
//    * Remueve tildes de una palabra.
//    *
//    * @param {string} word - La palabra de la que se eliminarán las tildes.
//    * @returns {string} - La palabra sin tildes.
//    */
//   function removeDiacritics(word) {
//     return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//   }

//   inputArrayWords.forEach((inputArrayWord) => {
//     cardWords.forEach((cardWord) => {
//       const inputArrayWordWithoutDiacritics = removeDiacritics(inputArrayWord.toLowerCase());
//       const cardWordWithoutDiacritics = removeDiacritics(cardWord.toLowerCase());

//       if (cardWordWithoutDiacritics.includes(inputArrayWordWithoutDiacritics)) {
//         score++; // Incrementa el puntaje si una palabra coincide.
//       }
//     });
//   });

//   return score;
// }
