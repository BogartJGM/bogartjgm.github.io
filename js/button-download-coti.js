import "../js/html2canvas.min.js";

export function descargarImagenCotizacion() {
  const quoteImageElement = document.getElementById("quote-image");
  const quoteImgName = document.getElementById("customer-data-table");

  // Clonar la tabla  de cotización
  const clone = quoteImageElement.cloneNode(true);

  const imgClonContainer = document.createElement("div");
  const imgTagContainer = document.createElement("div");
  const imgTagMembrete = document.createElement("img");
  const clonContainer = document.createElement("div");

  imgClonContainer.style.width = "70%";
  imgTagContainer.classList.add("contailer-fluid");
  imgTagMembrete.style.width = "100%";
  imgTagMembrete.src = "../assets/membrete_coti.jpg";
  imgTagMembrete.alt = "Membrete de imagen";
  clonContainer.classList.add("container-fluid", "p-2", "img-to-download", "px-5");

  // Asegurarse de que el clon esté fuera de la pantalla y visible
  clone.style.zIndex = "-1";
  // Tabla de datos de cliente
  clone.querySelectorAll("table")[0].className = "img-coti-table";
  clone.querySelectorAll("table")[0].parentElement.className = "col-md-8";
  const colDatosCliente = clone.querySelectorAll("table")[0].querySelectorAll("th[scope=col]");
  colDatosCliente[1].style.width = "25%";
  colDatosCliente[2].style.width = "25%";

  clone.querySelectorAll("table")[1].className = "img-coti-table-warning";
  clone.querySelectorAll("table")[1].parentElement.className = "col-md-4";
  clone.querySelectorAll("table")[2].className = "img-coti-table";
  clone.querySelectorAll("table")[3].className = "img-coti-table";

  clonContainer.appendChild(clone);
  imgTagContainer.appendChild(imgTagMembrete);
  imgClonContainer.appendChild(imgTagContainer);
  imgClonContainer.appendChild(clonContainer);
  document.body.appendChild(imgClonContainer);

  setTimeout(function () {
    html2canvas(imgClonContainer, {
      scale: 3,
    }).then(function (canvas) {
      // Crea un enlace para descargar la imagen
      let link = document.createElement("a");
      link.download = `${quoteImgName.textContent}.jpg`;
      link.href = canvas.toDataURL();
      link.click();

      // Limpia el DOM eliminando el clon
      document.body.removeChild(imgClonContainer);
    }).catch(function (error) {
      console.error('Error generando la captura de pantalla:', error);
      document.body.removeChild(imgClonContainer);
    });
  }, 0);
}
