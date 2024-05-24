export function addGlobalShortcuts() {
  document.addEventListener("keydown", (event) => {
    if (event.altKey) {
      switch (event.key) {
        case "b" || "B":
          document.getElementById("product-search-bar").focus();
          break;
        case "v" || "V":
          document.getElementById("show-image").click();
          break;
        case "c" || "C":
          const btnAccordion = document.querySelector(".accordion-button");
          btnAccordion.click();
          break;
        case "n" || "N":
          document.getElementById("create-product").click();
      }
    }
  });
}
