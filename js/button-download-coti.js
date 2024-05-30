import "../js/html2canvas.min.js";

export function descargarImagenCotizacion() {
  const quoteImageElement = document.getElementById("quote-image");
  const quoteImgName = document.getElementById("customer-data-table").textContent;

  // Clone the element
  const clone = quoteImageElement.cloneNode(true);

  // Create necessary containers
  const imgClonContainer = document.createElement("div");
  const imgTagContainer = document.createElement("div");
  const imgTagMembrete = document.createElement("img");
  const clonContainer = document.createElement("div");

  // Set styles and classes
  imgTagMembrete.style.width = "100%";
  imgTagContainer.classList.add("container-fluid");
  imgTagMembrete.src = "../assets/membrete_coti.jpg";
  imgTagMembrete.alt = "Membrete de imagen";
  clonContainer.classList.add("container-fluid", "p-2", "img-to-download", "px-5");

  // Ensure the clone is off-screen and invisible
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '-9999px';
  clone.querySelectorAll("table")[0].className = "";
  clone.querySelectorAll("table")[1].className = "";

  // Append elements minimally to the DOM
  clonContainer.appendChild(clone);
  imgTagContainer.appendChild(imgTagMembrete);
  imgClonContainer.appendChild(imgTagContainer);
  imgClonContainer.appendChild(clonContainer);
  document.body.appendChild(imgClonContainer);

  // Use html2canvas to capture the clone with optimized settings
  html2canvas(imgClonContainer, { scale: 1 }).then((canvas) => {
    // Create a link for downloading the image
    const link = document.createElement("a");
    link.download = `${quoteImgName}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();

    // Clean up the DOM by removing the clone
    document.body.removeChild(imgClonContainer);
  }).catch((error) => {
    console.error('Error capturing image:', error);
    document.body.removeChild(imgClonContainer);
  });
}
