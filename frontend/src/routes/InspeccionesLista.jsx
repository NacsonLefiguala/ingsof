import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getInspectionsByInspectorId } from '../services/InspectorService';
import './InspeccionesLista.css';

const InspeccionesLista = () => {
  const [inspecciones, setInspecciones] = useState([]);
  const { inspectorId } = useParams();

  useEffect(() => {
    const fetchInspecciones = async () => {
      try {
        const response = await getInspectionsByInspectorId(inspectorId);

        if (Array.isArray(response.data)) {
          // Si la respuesta es un array, lo asignamos directamente a inspecciones
          setInspecciones(response.data);
          console.log('Inspecciones obtenidas:', response.data);
        } else {
          console.error('Error al obtener las inspecciones. Datos de la respuesta:', response);
        }
      } catch (error) {
        console.error('Error al obtener las inspecciones', error);
      }
    };

    fetchInspecciones();
  }, [inspectorId]);

  return (
    <div>
      <h1>Lista de Inspecciones para el Inspector ID: {inspectorId}</h1>
      <div className="container">
        <div className="column">
          <h2>Todas Las Inspecciones</h2>
          {/* Renderizar el array directamente en pantalla */}
          <pre>{JSON.stringify(inspecciones, null, 2)}</pre>
        </div>
        {inspecciones.length > 0 ? (
          <div className="column">
            <h2>Inspecciones Asignadas</h2>
            <ul>
              {inspecciones.map((inspeccion) => (
                <li key={inspeccion._id}>
                  <Link to={`/inspecciones/${inspeccion._id}`}>
                    {inspeccion.lugar} - {inspeccion.fecha}
                  </Link>
                  <Link to={`/inspecciones/${inspeccion._id}`}>
                    <button>Modificar</button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay inspecciones disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default InspeccionesLista;
