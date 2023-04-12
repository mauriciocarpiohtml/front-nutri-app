import React from 'react'
import { useState, useContext} from 'react'
import OrneContext from '../Context/MyContext'

function Formulario() {
    
  const { nombre, setNombre, email, setEmail, apellido, setApellido, telefono, setTelefono,
        setPacientes, pacientes, setFormPacientes, setMostrarFormulario, autenticado, editarPaciente, setEditarPaciente, obtenerId, setObtenerId} = useContext(OrneContext)

  const [mensajeError, setMensajeError] = useState(false)

 async function handleFormulario(e){
    e.preventDefault()
    if([nombre, apellido, email, telefono].includes('')){
      setMensajeError(true)
      setTimeout(()=>{
        setMensajeError(false)
      },4500)
      return
    }

    const headers = new Headers()
    headers.append("Authorization", `Bearer ${autenticado}`)
    headers.append("Content-Type", "application/json")

    // Esto despues hacer refactor jajajaj
    if(!editarPaciente){
      try {
        const respuesta = await fetch('http://localhost:3010/api/pacientes', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono
          })
      })
      const resultado = await respuesta.json()
      setPacientes([...pacientes, resultado])
      
      //Resetear formulario
      setFormPacientes()

        } catch (error) {
          console.log(error)
        }
        return
    }

    const url = `http://localhost:3010/api/pacientes/${obtenerId}`
    const datos = { nombre, apellido, email, telefono }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${autenticado}`
      },
      body: JSON.stringify(datos)
    }
    
    const respuesta = await fetch(url, options)
    const resultado = await respuesta.json()

    // Actualizar el objeto del paciente en el arreglo 'pacientes'
    setPacientes(pacientes.map(paciente => {
      if (paciente._id === obtenerId) {
        return resultado
      } else {
        return paciente
      }
    }))
    setEditarPaciente(false)
    // Setear form
    setFormPacientes()
    }
    
  
  return (
    <>
    <div 
      className="fixed z-10 top-0 left-0 h-screen w-screen bg-black bg-opacity-75 flex items-center justify-center">
      <form 
       className="p-10 bg-gray-100 rounded-lg shadow-md mt-5 h-3/4 overflow-y-scroll relative w-[75%] md:w-[55%]">

        <h2 
         className="text-2xl text-center font-bold mb-4 text-stone-500"> 
          {editarPaciente ? 'Revisa los datos y edita tu paciente' : 'Completa los datos y empieza a agregar pacientes'}
        </h2>

         {/* Mostrar error */}
        {mensajeError && <div className='bg-red-500 animate-pulse text-white uppercase mx-auto text-center font-bold rounded-lg p-2 my-3'>Hay campos por completar</div>}

        <div className="mb-4">
          <label htmlFor="nombre" className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type="text" 
          id="nombre" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="apellido" className="block text-gray-700 font-bold mb-2">Apellido</label>
          <input
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          type="text"
           id="apellido" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="telefono" className="block text-gray-700 font-bold mb-2">Teléfono</label>
          <input 
          value={telefono}
          onChange={(e) => setTelefono(Number(e.target.value))}
          type="number" 
          id="telefono" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          id="email" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className='text-center'>
          <button
           onClick={(e) => handleFormulario(e)}
           className='w-full md:w-[50%] transition-colors ease-in uppercase bg-indigo-600 hover:bg-indigo-700 p-3 mt-5 mb-3 rounded-lg text-white font-bold '>
            {editarPaciente ? 'Editar paciente' : 'Agregar paciente'} 
          </button>
        </div>
        
      </form>

      <svg
        onClick={() => setMostrarFormulario(false)}
        className='absolute right-10 top-5 w-12 h-25 p-2 cursor-pointer text-white' 
        xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
    </>
  )
}

export default Formulario
