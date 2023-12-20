import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ModificarInspeccion = () => {
  const { inspectionId } = useParams();
  const [inspection, setInspection] = useState({
    lugar: '',
    fecha: '',
    observaciones: '',
    estado: '',
  });
  const [observacionesNuevas, setObservacionesNuevas] = useState('');
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [archivoJPG, setArchivoJPG] = useState('');

  useEffect(() => {
    console.log('ID de inspección:', inspectionId);

    const fetchInspectionDetails = async () => {
      try {
        if (!inspectionId) {
          console.error('ID de inspección no disponible.');
          return;
        }

        const response = await axios.get(`/api/inspections/${inspectionId}`);
        console.log('Detalles de la inspección:', response.data);
        setInspection(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la inspección:', error);
      }
    };

    if (inspectionId) {
      fetchInspectionDetails();
    }
  }, [inspectionId]);
  

  const handleObservationsChange = (event) => {
    setObservacionesNuevas(event.target.value);
  };

  const handleStatusChange = (event) => {
    setNuevoEstado(event.target.value);
  };

  const handleFileChange = (event) => {
    setArchivoJPG(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Verifica si el ID de la inspección está disponible antes de enviar la solicitud
      if (!inspectionId) {
        console.error('ID de inspección no disponible.');
        return;
      }

      // Envía las observaciones y el nuevo estado al backend
      await axios.put(`/inspections/${inspectionId}/observations`, {
        observaciones: observacionesNuevas,
      });
      await axios.put(`/inspections/${inspectionId}/status`, { nuevoEstado });

      // Si hay un archivo JPG seleccionado, lo sube
      if (archivoJPG) {
        const formData = new FormData();
        formData.append('fileName', archivoJPG);
        await axios.post(`/inspections/${inspectionId}/uploadjpg`, formData);
      }

      // Puedes redirigir al usuario o realizar otras acciones después de la actualización exitosa
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <h2>Detalles de la Inspección</h2>
      <p>Lugar: {inspection.lugar}</p>
      <p>Fecha: {inspection.fecha}</p>
      <p>Observaciones: {inspection.observaciones}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="observacionesNuevas">Agregar Observaciones:</label>
        <textarea
          id="observacionesNuevas"
          value={observacionesNuevas}
          onChange={handleObservationsChange}
        />

        <label htmlFor="nuevoEstado">Cambiar Estado:</label>
        <select id="nuevoEstado" value={nuevoEstado} onChange={handleStatusChange}>
          <option value="en espera">En Espera</option>
          <option value="aprobado">Aprobado</option>
          <option value="rechazado">Rechazado</option>
        </select>

        <label htmlFor="archivoJPG">Subir Archivo JPG:</label>
        <input type="file" id="archivoJPG" onChange={handleFileChange} />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ModificarInspeccion;

