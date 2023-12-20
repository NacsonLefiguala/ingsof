import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import InspeccionesLista from './routes/InspeccionesLista.jsx';
import ModificarInspeccion from './routes/ModificarInspeccion.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/inspector/:inspectorId',
        element: <InspeccionesLista />,
      },
      
      {
        path: '/inspecciones',
        element: <ModificarInspeccion />
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
