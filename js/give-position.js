/**
 * 
 * @param {HTMLDivElement} containterElement 
 */
export function givePosition(containterElement) {
    containterElement.childNodes.forEach((product, index) => {
        const spanPosition = product.querySelector("span.input-group-text.col-md-1.posicion");

        if (spanPosition) {
            spanPosition.innerHTML = String(index + 1);
        }
    });
}