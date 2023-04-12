import React, { useEffect } from 'react'
import BotonControl from './BotonControl'
import ControlCard from './ControlCard'
import { useContext, useState } from 'react'
import OrneContext from '../Context/MyContext'
import { useParams } from 'react-router-dom'


function ListaControl() {
    const { id } = useParams()
    const {controles, setControles, autenticado} = useContext(OrneContext)

    useEffect(()=>{
      async function buscarControles(){
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${autenticado}`)
  
        try {
          const respuesta = await fetch(`http://localhost:3010/api/controles/${id}`, { headers: headers });
          const resultado = await respuesta.json()
          setControles(resultado)
        } catch (error) {
          console.log(error)
        }
      }
      buscarControles()
    },[id])

  
  return (
    <>
      {controles?.length > 0 ? (
        <>
        <div className='my-3 p-3 '>
          <h3 className='text-stone-600 text-xl font-bold ml-10'>Resultados</h3>
        </div>

       <div className='w-[85%] flex flex-wrap gap-5 mt-3 mb-3 mx-auto'>
        {controles?.map((resultado=>
                                <ControlCard
                                resultado={resultado}
                                key={resultado._id}/>))}
       </div> 
       </>
      ): (
        <>
        <div className='my-3 p-3 '>
          <h3 className='text-stone-500 text-xl font-bold text-center'>Aún no hay controles, empieza a agregarlos y aparecerean aquí</h3>
        </div>
        </>

      )}
        
        <BotonControl/>
    </>
  )
}

export default ListaControl
