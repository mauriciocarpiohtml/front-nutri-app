import React from 'react'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation'
import CycloneIcon from '@mui/icons-material/Cyclone';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import OrneContext from '../Context/MyContext';

function ControlCard({resultado}) {

    const {controles, setControles, editarControlPaciente,autenticado} = useContext(OrneContext)

   async function eliminarControl(){
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/controles/${resultado._id}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${autenticado}`
      }
    };
    const respuesta = await fetch(url, options)
    const data = await respuesta.json()
   
   // Actualizando el state
     const controlesActuales = controles.filter((control) => control._id !== data.controlEliminar._id)
     setControles(controlesActuales)
  }
  return (
    <>
        <div className='rounded-lg w-[265px] h-[290px] bg-white shadow-md p-3 transition duration-500 ease-in-out transform hover:scale-110 flex flex-col'>
            <div className='mt-3 flex justify-start items-center gap-3'>
              <FitnessCenterIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Fecha: <span className='font-medium text-stone-500'>{resultado.fecha}</span></p>
            </div>

            <div className='mt-3 flex justify-start items-center gap-3'>
              <FitnessCenterIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Peso Actual: <span className='font-medium text-stone-500'>{resultado.pesoActual} kg</span></p>
            </div>

            <div className='mt-3 flex justify-start items-center gap-3'>
              <AccessibilityNewIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Biceps: <span className='font-medium text-stone-500'>{resultado.biceps} cm</span></p>
            </div>

            <div className='mt-3 flex justify-start items-center gap-3'>
              <SquareFootIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Cintura <span className='font-medium text-stone-500'>{resultado.cintura} cm</span></p>
            </div>

            <div className='mt-3 flex justify-start items-center gap-3'>
              <TransferWithinAStationIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Cuadriceps <span className='font-medium text-stone-500'>{resultado.cuadriceps} cm</span></p>
            </div>

            <div className='mt-3 flex justify-start items-center gap-3'>
              <CycloneIcon className='text-indigo-600'/>
              <p className='font-bold text-stone-600'> Glúteos <span className='font-medium text-stone-500'>{resultado.gluteos} cm</span></p>
            </div>

            <div className='mt-5 flex justify-between items-center'>
              <button 
              onClick={ ()=> editarControlPaciente(resultado) }
              className='ml-1 p-1 rounded-lg bg-cyan-600 text-white cursor-pointer'> <CreateIcon/> </button>
              <button 
                className='p-1 rounded-lg bg-red-500 text-white cursor-pointer mr-1'
                onClick={eliminarControl}>
                <DeleteIcon/> 
              </button>

            </div>
        </div>
        
    </>
  )
}

export default ControlCard
