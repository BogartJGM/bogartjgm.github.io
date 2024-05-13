/**
 * Removes the specified attribute from the HTML element with the given ID.
 * If the element with the provided ID does not exist, returns true if the attribute is successfully removed, false otherwise.
 *
 * @param {string} elementId - The ID of the HTML element from which to remove the attribute.
 * @param {string} attributeName - The name of the attribute to be removed.
 * @returns {boolean} - Returns true if the attribute is successfully removed, false otherwise.
 */
export function removeAttributeFromElementById(elementId, attributeName) {
  /**
   * @type {HTMLElement|null} element
   */
  const element = document.getElementById(elementId);

  if (element) {
    element.removeAttribute(attributeName);
    return true;
  } else {
    return false;
  }
}

/**
 * Función para simplificar el uso de document.getElementById()
 * @param {string} id - El ID del documento que se desea obtener
 * @returns {HTMLElement|null} - El elemento correspondiente al ID proporcionado, o null si no se encuentra.
 */
export function getElemById(id) {
  return document.getElementById(id);
}
