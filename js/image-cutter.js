export function recortarImagen() {
  const imgsRecortable = document.querySelectorAll(".can-cut");

  let startX, startY, dragging = false;
  let rect = document.createElement('div');
  rect.style.position = 'absolute';
  rect.style.borderRadius = "8px";
  rect.style.pointerEvents = 'none';
  document.body.appendChild(rect);

  function iniciarDrag(e) {
    e.preventDefault();
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    rect.style.border = '2px dashed gray'; // Restaurar el color del borde
  }

  function moverRect(e) {
    if (dragging) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      rect.style.width = Math.abs(width) + 'px';
      rect.style.height = Math.abs(height) + 'px';
      rect.style.left = (width > 0 ? startX : startX + width) + 'px';
      rect.style.top = (height > 0 ? startY : startY + height) + 'px';
    }
  }

  function finalizarDrag(e) {
    dragging = false;
    const rectX = parseInt(rect.style.left);
    const rectY = parseInt(rect.style.top);
    const rectWidth = parseInt(rect.style.width);
    const rectHeight = parseInt(rect.style.height);
    imgsRecortable.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      const scaleX = img.naturalWidth / imgRect.width;
      const scaleY = img.naturalHeight / imgRect.height;
      const imgX = (rectX - imgRect.left) * scaleX;
      const imgY = (rectY - imgRect.top) * scaleY;
      const imgWidth = rectWidth * scaleX;
      const imgHeight = rectHeight * scaleY;
      const canvas = document.createElement('canvas');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight, 0, 0, imgWidth, imgHeight);
      img.src = canvas.toDataURL();
    });
    rect.style.width = '0px';
    rect.style.height = '0px';
    rect.style.border = "0px solid black"; // Eliminar el rectángulo después de recortar la imagen
  }

  imgsRecortable.forEach(img => {
    img.addEventListener('mousedown', iniciarDrag);
    img.addEventListener('mousemove', moverRect);
    img.addEventListener('mouseup', finalizarDrag);
  });
}
