import "./Sortable.min.js";
import { givePosition } from "./give-position.js";

export function sortableSelectedProducts() {
  const divSelectedProductContainer = document.getElementById(
    "selected-product-container"
  );

  new Sortable(divSelectedProductContainer, {
    handle: ".sort-button", // Especifica el mango
    animation: 150, // Opcional: agrega animación al arrastrar
    ghostClass: 'sortable-ghost', // Clase CSS aplicada al elemento de arrastre fantasma (opcional)
    chosenClass: 'sortable-chosen', // Clase CSS aplicada al elemento seleccionado (opcional)
    dragClass: 'sortable-drag', // Clase CSS aplicada al elemento durante el arrastre (opcional)
    scroll: true,
    scrollSensitivity: 80, // Ajusta la sensibilidad del desplazamiento
    scrollSpeed: 10, // Ajusta la velocidad del desplazamiento
    onEnd: function (evt) {
      document.body.style.cursor = ''; // Restaura el cursor por defecto al dejar de arrastrar
      givePosition(document.getElementById("selected-product-container"));
    },
  });
}
