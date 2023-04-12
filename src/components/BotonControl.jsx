import React from 'react'
import { useContext } from 'react'
import OrneContext from '../Context/MyContext'


function BotonControl() {
  const {abrirFormularioControl} = useContext(OrneContext)

  return (
    <div className=' md:w-full mt-10 flex justify-center items-center mb-10'>
        <button
        onClick={abrirFormularioControl} 
        className='rounded-lg shadow-md p-3 bg-indigo-800 mx-auto
        font-bold text-white transition duration-500 ease-in-out transform hover:scale-110'>
            Añadir control
        </button>
    </div>
  )
}

export default BotonControl
