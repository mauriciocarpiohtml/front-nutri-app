import React from 'react'
import BotonAgregar from '../components/BotonAgregar'
import Formulario from '../components/Formulario'
import OrneContext from '../Context/MyContext'
import { useContext, useEffect,useState } from 'react'
import Buscador from '../components/Buscador'
import PacienteCard from '../components/PacienteCard'
import Sidebar from '../components/Sidebar'

function Pacientes() {
    // aca se van a mostrar la lista de todos los pacientes 
    // tiene que haber un boton 
    const {pacientes,setPacientes, mostrarFormulario, pacienteBuscado, autenticado} = useContext(OrneContext)

    const [nutricionista, setNutricionista] = useState({})

   
    // Mostrar info del doctor 
    useEffect(() =>{
      async function obtenerNutricionista(){
        const headers = new Headers()
        headers.append("Authorization", `Bearer ${autenticado}`)

        try {
          const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/perfil`, { headers: headers });
          const resultado = await respuesta.json()
          setNutricionista(resultado)
          
        } catch (error) {
          console.log(error);
        }
      }
      obtenerNutricionista()
    },[autenticado])

    // Obtener Pacientes
useEffect(() =>{
  async function mostrarPacientes(){
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${autenticado}`)

    try {
      const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`, { headers: headers });
      const resultado = await respuesta.json()
      setPacientes(resultado.pacientes)
    } catch (error) {
      console.log(error);
    }
  }
  mostrarPacientes()
},[autenticado])

let pacientesFiltrados = pacientes


  if(pacienteBuscado.length >= 1){
      pacientesFiltrados = pacientes.filter( pacientes => {
      const nombre = pacientes.nombre.toLowerCase()
      const apellido = pacientes.apellido.toLowerCase()
      const textoBusqueda = pacienteBuscado.toLowerCase()
     return nombre.includes(textoBusqueda) || apellido.includes(textoBusqueda)
    })
    }
    
    return (
      <>
    <div className='flex'>
        <div className='md:w-[20%]'>
          <Sidebar />
        </div>
        <div className='md:w-[80%] ml-auto mr-auto'>
          <div className='mt-8 md:mt-5 p-5'>
            <h3 className='text-indigo-600 font-bold text-3xl text-center uppercase'>{`Pacientes ${nutricionista.nombre}`}</h3>
          </div>
          <Buscador />
          {mostrarFormulario && <Formulario />}
          <div className='w-full mt-5 p-3 flex flex-wrap gap-5'>
            {pacientesFiltrados?.map(paciente => (
              <PacienteCard key={paciente._id} paciente={paciente} />
            ))}
          </div> 
          <BotonAgregar />
        </div>
    </div>
    </>
    )
}

export default Pacientes
