// App.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h1>Página Principal</h1>
      
      {/* Botón que redirige a la interfaz del Inspector */}
      <Link to="/inspector/6527498476058358e9d7b2b4">Ir a la interfaz del Inspector</Link>
    </div>
  );
};

export default App;
