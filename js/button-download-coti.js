import "../js/html2canvas.min.js"

export function descargarImagenCotizacion() {
  const quoteImageElement = document.getElementById("quote-image");
  
  // Clonar el elemento
  const clone = quoteImageElement.cloneNode(true);
  
  // Asegurarse de que el clon esté fuera de la pantalla y visible
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  clone.style.width = `${quoteImageElement.scrollWidth}px`;
  clone.style.height = `${quoteImageElement.scrollHeight}px`;
  clone.style.overflow = 'visible';
  clone.style.zIndex = '-1';
  document.body.appendChild(clone);

  // Usar html2canvas para capturar el clon
  html2canvas(clone).then(function (canvas) {
    // Crea un enlace para descargar la imagen
    let link = document.createElement("a");
    link.download = "imagen_cotizacion.png";
    link.href = canvas.toDataURL();
    link.click();
    
    // Limpiar el DOM removiendo el clon
    document.body.removeChild(clone);
  });
}
