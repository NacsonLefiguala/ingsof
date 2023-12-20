
import axios from './root.service';
export const getInspectionsByInspectorId = async () => {
  try {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    if (user && user.id) {
      const url = `inspections/rol/${user.id}`;
      console.log('URL:', url);

      const response = await axios.get(url);
      const inspections = response.data;

      // Ajusta esto según la estructura real de tu respuesta
      if (inspections) {
        console.log('Inspecciones obtenidas:', inspections);
        return inspections; // Retorna las inspecciones obtenidas
      } else {
        console.error('No se obtuvieron inspecciones o la estructura de la respuesta no es la esperada.');
        return []; // Retorna un array vacío o un valor por defecto si no hay inspecciones
      }
    } else {
      console.error('No se pudo obtener el ID del usuario desde el local storage.');
      return []; // Retorna un array vacío o un valor por defecto si no hay ID de usuario
    }
  } catch (error) {
    console.error('Error al obtener inspecciones:', error);
    return []; // Retorna un array vacío o un valor por defecto en caso de error
  }
};
