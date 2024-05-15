/**
 * 
 * @param {string} contenedor 
 */
export function givePosition(containerString) {
    const contenedor = document.getElementById(containerString);

    contenedor.childNodes.forEach((product, index) => {
        const spanPosition = product.querySelector("span.input-group-text.col-md-1.posicion");
        spanPosition.innerHTML = String(index + 1);
    });
}