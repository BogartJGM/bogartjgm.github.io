export function descargarImagenCotizacion() {
  html2canvas(document.getElementById("quote-image")).then(function (canvas) {
    // Crea un enlace para descargar la imagen
    var link = document.createElement("a");
    link.download = "imagen_cotizacion.png"; // Cambiar nombre al que me diga lili
    link.href = canvas.toDataURL();
    link.click();
  });
}
