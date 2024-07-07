function getDay() {
  const formFechaCotizacion = document.getElementById("quote-date-start");
  const formValidoHasta = document.getElementById("quote-date-end");

  // Obtener día de hoy
  const today = new Date();
  const utcMinusSixDate = new Date(today.getTime() - 6 * 60 * 60 * 1000); // Convert to UTC-6
  const year = utcMinusSixDate.getUTCFullYear();
  const month = String(utcMinusSixDate.getUTCMonth() + 1).padStart(2, "0"); // Month starts from 0
  const day = String(utcMinusSixDate.getUTCDate()).padStart(2, "0");
  const dateFormatted = `${year}-${month}-${day}`;

  // Obtener día fecha de hoy + 10 días
  // Restarle 6 horas para ajustar al UTC-6
  today.setUTCHours(today.getUTCHours() - 6);

  // Sumarle 15 días
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 15);

  // Formatear la fecha en formato "yyyy-MM-dd"
  const formattedDate = futureDate.getUTCFullYear() + "-" + ("0" + (futureDate.getUTCMonth() + 1)).slice(-2) + "-" + ("0" + futureDate.getUTCDate()).slice(-2);

  // Asignar fechas a inputs
  formFechaCotizacion.value = dateFormatted;
  formValidoHasta.value = formattedDate;
}
