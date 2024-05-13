/**
 * Adds input event listener to a text input field.
 * Retrieves product cards with .search class and compares their text content with the input text.
 * Calls a function to compare input text with card text content and determines visibility of cards based on score.
 *
 * @param {HTMLInputElement} inputSearchBar - The input element to which the event listener is added.
 * @param {String} cardsClasses - Las clase de los productos. Puede ser productos seleccionados o productos
 */
export function search(inputSearchBar, cardsClasses) {
  let productCards;

  inputSearchBar.addEventListener("input", (e) => {
    const inputSearchBarValue = e.target.value;

    // Words commonly removed from search terms
    const inputArrayWords = inputSearchBarValue.trim().split(" ");
    const alphabet = Array.from("abcdefghijklmnopqrstuvwxyz");
    let wordsToRemove = ["de"];
    wordsToRemove = [...wordsToRemove, ...alphabet]; // Add alphabet characters to words to remove

    // Remove common words from input search terms
    inputArrayWords.forEach((inputArrayWord, index) => {
      if (wordsToRemove.includes(inputArrayWord)) {
        inputArrayWords.splice(index, 1);
      }
    });

    // Get product cards
    productCards = document.querySelectorAll(cardsClasses);

    // Iterate through product cards and adjust visibility based on input search terms
    productCards.forEach((productCard) => {
      if (inputSearchBarValue != "") {
        const cardWords = [];
        const elementsWithString = productCard.querySelectorAll(".search");
        elementsWithString.forEach((elementWithString) => {
          cardWords.push(elementWithString.textContent);
        });

        const productWordScore = searchWord(inputArrayWords, cardWords);
        // Si el producto tiene menor socre según el Math.round, se oculta, si no, se muestra
        if (productWordScore < Math.round((inputArrayWords.length / 5) * 4)) {
          productCard.style.display = "none"; // Hide card if score is below threshold
        } else {
          if (productCard.style.display) {
            productCard.removeAttribute("style"); // Show card if score is above threshold
          }
        }
      } else {
        if (productCard.style.display) {
          productCard.removeAttribute("style"); // Show all cards if search input is empty
        }
      }
    });
  });
}

/**
 * Compares two arrays of words and returns a score based on the number of matches.
 *
 * @param {string[]} inputArrayWords - Array of words from the input search terms.
 * @param {string[]} cardWords - Array of words from the product card text content.
 * @returns {number} - The score based on the number of matches between the two arrays.
 */
function searchWord(inputArrayWords, cardWords) {
  let score = 0;

  // Function to remove diacritics from words
  function removeDiacritics(word) {
    return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Compare each word in input search terms with words in product card text content
  inputArrayWords.forEach(function (inputArrayWord) {
    cardWords.forEach(function (cardWord) {
      const inputArrayWordWithoutDiacritics = removeDiacritics(inputArrayWord.toLowerCase());
      const cardWordWithoutDiacritics = removeDiacritics(cardWord.toLowerCase());

      if (cardWordWithoutDiacritics.includes(inputArrayWordWithoutDiacritics)) {
        score++; // Increment score for each match found
      }
    });
  });
  return score;
}
