import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import OrneContext from '../Context/MyContext'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

function PacienteCard({paciente}) {
  const { editarPacienteCard, autenticado, pacientes, setPacientes} = useContext(OrneContext)

    
  async function eliminarPaciente(){
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente._id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${autenticado}`
      }
    };
    const respuesta = await fetch(url, options)
    const resultado = await respuesta.json()

     const pacientesActuales = pacientes.filter((paciente) => paciente._id !== resultado.datos._id);
     setPacientes(pacientesActuales)
    
  }

  return (
    
      <div
        className='rounded-lg w-[180px] h-[200px] bg-indigo-600 shadow-md transition duration-500 ease-in-out transform hover:scale-110 flex flex-col'>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-person-vcard text-white w-[50%] p-1 mx-auto" viewBox="0 0 16 16">
            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
        </svg>

        <div className='flex flex-col justify-center items-center'>
         <Link to={`/paciente/${paciente._id}`}>
            <h3 
            className='uppercase text-center text-white font-bold hover:underline cursor-pointer'>{paciente.nombre}</h3>
            <h3 className='uppercase text-center text-white font-semibold hover:underline cursor-pointer'>{paciente.apellido}</h3>
          </Link>
            <h3 className='uppercase text-white font-semibold'>{paciente.telefono}</h3>
        </div>
        <div className=' flex justify-between items-center'>
          <button
            onClick={()=>editarPacienteCard(paciente)}
            className='ml-3 mb-3 p-1 rounded-lg bg-emerald-600 text-white cursor-pointer'> <CreateIcon/> </button>
          <button
            onClick={eliminarPaciente} 
            className='p-1 rounded-lg bg-red-500 text-white cursor-pointer mr-3 mb-3'>
            <DeleteIcon/> 
          </button>

        </div>
      </div>
    
  )
}

export default PacienteCard
