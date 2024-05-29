/**
 * 
 * @param {HTMLDivElement} containterElement 
 */
export function givePosition(containterElement) {
    containterElement.childNodes.forEach((product, index) => {
        const spanPosition = product.querySelector("span.posicion");

        if (spanPosition) {
            spanPosition.innerHTML = String(index + 1);
        }
    });
}