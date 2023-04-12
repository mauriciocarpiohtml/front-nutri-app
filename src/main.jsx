import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { MyContext } from './Context/MyContext'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Pacientes from './pages/Pacientes'
import PaginaPaciente from './pages/PaginaPaciente'
import Registrarse from './pages/Registrarse'
import Login from './pages/Login'

const router = createBrowserRouter([
  {path:'/', element:<Registrarse/>},
  {path:'/login', element:<Login/>},
  {path:'/pacientes/:id', element:<Pacientes/>},
  {path:'/paciente/:id', element:<PaginaPaciente/>}
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyContext>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </MyContext>
    
  </React.StrictMode>,
)
