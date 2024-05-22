export function addGlobalShortcuts() {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey) {
      switch (event.key) {
        case "b":
          document.getElementById("product-search-bar").focus();
          break;
        case "i":
          document.getElementById("show-image").click();
          break;
      }
    }
  });
}
