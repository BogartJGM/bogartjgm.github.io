import "../js/html2canvas.min.js"

export function descargarImagenCotizacion() {
  const quoteImageElement = document.getElementById("quote-image");
  
  // Clonar el elemento
  const clone = quoteImageElement.cloneNode(true);
  
  const imgClonContainer = document.createElement("div");
  const imgTagContainer = document.createElement("div");
  const imgTagMembrete = document.createElement("img");
  const clonContainer = document.createElement("div");

  imgTagMembrete.style.width = "100%";
  imgTagContainer.classList.add("contailer-fluid");
  imgTagMembrete.src = "../assets/membrete_coti.jpg";
  imgTagMembrete.alt = "Membrete de imagen";
  clonContainer.classList.add("container-fluid", "p-2", "img-to-download", "px-5");
  
  // Asegurarse de que el clon esté fuera de la pantalla y visible
  clone.style.zIndex = '-1';
  clone.querySelectorAll("table")[0].className = "";
  clone.querySelectorAll("table")[1].className = "";

  clonContainer.appendChild(clone);
  imgTagContainer.appendChild(imgTagMembrete);
  imgClonContainer.appendChild(imgTagContainer);
  imgClonContainer.appendChild(clonContainer);
  document.body.appendChild(imgClonContainer);

  // Usar html2canvas para capturar el clon
  html2canvas(imgClonContainer, { scale: 1 }).then(function (canvas) {
    // Crea un enlace para descargar la imagen
    let link = document.createElement("a");
    link.download = "imagen_cotizacion.png";
    link.href = canvas.toDataURL();
    link.click();
    
    // Limpiar el DOM removiendo el clon
    document.body.removeChild(imgClonContainer);
  });
}
