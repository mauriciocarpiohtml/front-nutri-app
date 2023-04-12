
import { useContext, useEffect, useState } from 'react'
import OrneContext from '../Context/MyContext'
import SliderGraficos from '../components/SliderGraficos'
import Sidebar from '../components/Sidebar'
import ListaControl from '../components/ListaControl'
import FormularioControl from '../components/FormularioControl'
import { useParams } from 'react-router-dom'



function PaginaPaciente() {
  const [pacienteData, setPacienteData] = useState([])

  const { id } = useParams()
  const { controles, formularioControl, autenticado} = useContext(OrneContext)
  
  useEffect(()=>{
    async function datosPaciente(){
      const headers = new Headers()
      headers.append("Authorization", `Bearer ${autenticado}`)
      try {
        const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`, { headers: headers });
        const resultado = await respuesta.json()
        setPacienteData(resultado)
      } catch (error) {
        console.log(error)
      }
    }
    datosPaciente()
  },[id])

  return (
    <>
    <div className='flex'>
      <div className='md:w-[20%]'>
          <Sidebar />
      </div>
      <div className='md:w-[80%] ml-auto mr-auto'>
        <div className='mt-5 p-5 flex flex-col'>
          <h3 className='text-indigo-800 font-bold text-3xl text-center uppercase'>{`${pacienteData.nombre} ${pacienteData.apellido}`}</h3>
          <h4 className='text-indigo-600 font-bold text-xl text-center mt-3'>{`${pacienteData.telefono}`}</h4>
        </div>
        <ListaControl/>
        {formularioControl && <FormularioControl/>}
        {controles.length > 0 && <SliderGraficos/>  }
         
      </div>
     
    </div>
    </>
  )
}

export default PaginaPaciente
