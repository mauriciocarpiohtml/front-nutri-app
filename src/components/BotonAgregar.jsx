import React from 'react'
import { useContext } from 'react'
import OrneContext from '../Context/MyContext'

function BotonAgregar() {
    const{abrirFormulario} = useContext(OrneContext)
  return (
    <button
    onClick={abrirFormulario} 
    className="flex flex-col items-center fixed bottom-28 right-28 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-full">
      <span className="mx-auto font-black text-2xl mt-auto mb-1">+</span>
    </button>
  )
}

export default BotonAgregar
