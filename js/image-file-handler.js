/**
 *
 * @param {HTMLDivElement} inputImgPicker
 */
export function initImageInput(inputImgPicker) {
  inputImgPicker.addEventListener("click", handleInputImgPicker);
}

function handleInputImgPicker() {
  const temporaryImgFileInput = document.createElement("input");
  temporaryImgFileInput.setAttribute("type", "file");
  temporaryImgFileInput.setAttribute("multiple", "false");
  temporaryImgFileInput.setAttribute("style", "display: none");
  temporaryImgFileInput.setAttribute("accept", ".jpg, .png, .jpeg, .webp");
  temporaryImgFileInput.addEventListener("change", (e) => {
    handleFileChange(e.target.files);
  });
  temporaryImgFileInput.click();
}

function handleFileChange(imgFiles) {
  if (imgFiles.length > 0) {
    const imgFile = imgFiles[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const imgTagPlaceholder = document.querySelector(
        ".image-tag-placeholder"
      );
      if (imgTagPlaceholder) {
        imgTagPlaceholder.dataset.originalSrc = event.target.result;
        imgTagPlaceholder.src = event.target.result;
        imgTagPlaceholder.style.display = "";
      }
    };

    reader.onloadend = () => {
      const resetImgSize = document.querySelector(".reset-size-image");
      resetImgSize.style.display = "";
      resetImgSize.style.borderStyle = "solid";

      const zoneImagePicker = document.querySelector(".zoneImagePicker");
      const svgImage = zoneImagePicker.querySelector("svg");
      const pText = zoneImagePicker.querySelector("p");
      zoneImagePicker.classList.remove("p-5");
      zoneImagePicker.classList.remove("rounded-4");
      zoneImagePicker.classList.add("p-1", "rounded-2");
      zoneImagePicker.style.borderStyle = "solid";
      svgImage.style.width = "12px";
      svgImage.style.height = "12px";
      pText.style.display = "inline";
    }
    reader.readAsDataURL(imgFile);
  }
}
