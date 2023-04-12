import React from 'react'
import { useState, useContext } from 'react'
import OrneContext from '../Context/MyContext'

function Buscador() {
   const {setPacienteBuscado} = useContext(OrneContext)
  return (
    <div className='mt-3 mx-auto flex justify-center items-center md:w-[50%] mb-5'>
      <input
             onChange={(e) => setPacienteBuscado((e.target.value).toLowerCase())} 
             type="text"
             className='shadow-md w-[70%] md:w-full rounded-lg appearance-none border border-slate-300 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
             placeholder='Buscar paciente'/>
    </div>
  )
}

export default Buscador
