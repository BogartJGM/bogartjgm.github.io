/**
 *
 * @param {HTMLDivElement} containterElement
 */
export function givePosition(containterElement) {
  const containterElementChildren = containterElement.children;
  Array.from(containterElementChildren).forEach((product, index) => {
    const spanPosition = product.querySelector("span.posicion");

    if (spanPosition) {
      spanPosition.innerHTML = String(index + 1);
    }
  });
}
