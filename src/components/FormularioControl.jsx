import { useContext, useState } from "react"
import OrneContext from "../Context/MyContext"
import { useParams } from 'react-router-dom'

function FormularioControl() {

  const { id } = useParams()

    const { setFormularioControl, editarControl , limpiarFormControl, fecha, setFecha, pesoActual, 
            setPesoActual, biceps, setBiceps, cintura, 
           setCintura, cuadriceps, setCuadriceps, gluteos, setGluteos, autenticado, idControl, 
           controles, setControles,  } = useContext(OrneContext)

    const [error, setError] = useState(false)

    async function handleFormularioControl(e){
        e.preventDefault()
        if([pesoActual, biceps, cintura, cuadriceps, gluteos].includes('' || 0)){
            setError(true)
            setTimeout(()=>{
              setError(false)
            },4500)
            return
          }

          // Enviar post a api
          const headers = new Headers()
          headers.append("Authorization", `Bearer ${autenticado}`)
          headers.append("Content-Type", "application/json")

          
          if(!editarControl){
            try {
              const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/controles/${id}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                  fecha: fecha,
                  pesoActual: pesoActual,
                  biceps: biceps,
                  cintura: cintura,
                  cuadriceps: cuadriceps,
                  gluteos: gluteos
                })
            })
            const resultado = await respuesta.json()
            setControles([...controles, resultado])
            //Reset form
            limpiarFormControl()
      
              } catch (error) {
                console.log(error)
              }
              return
          }  

          const url = `${import.meta.env.VITE_BACKEND_URL}/api/controles//${idControl}`
          const datos = { fecha, pesoActual, biceps, cintura, cuadriceps, gluteos}
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
      
          // Actualizar los controles en el state
          setControles(controles.map(control => {
            if (control._id === idControl) {
              return resultado
            } else {
              return control
            }
          }))

          // Reset form
          limpiarFormControl()
            
            
    }

  return (
    <div className="fixed z-10 top-0 left-0 h-screen w-screen bg-black bg-opacity-75 flex items-center justify-center">
      <form 
       className="p-10 bg-gray-100 rounded-lg shadow-md mt-5 h-3/4 overflow-y-scroll relative w-[75%] md:w-[55%]">

        <h2 
        className="text-2xl text-center font-bold mb-4 text-stone-500">{editarControl ? 'Edita los datos y guarda tu control' : 'Completa los datos para añadir un control'}</h2>
        {error && <div className='bg-red-500 animate-pulse text-white uppercase mx-auto text-center font-bold rounded-lg p-2 my-3'>Hay campos por completar</div>}

        <div className="mb-4">
          <label 
          htmlFor="fecha" 
          className="block text-gray-700 font-bold mb-2">Fecha</label>
          <input
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          type="date"
          step="any" 
          id="fecha" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label 
          htmlFor="peso" 
          className="block text-gray-700 font-bold mb-2">Peso actual</label>
          <input
          value={pesoActual}
          onChange={(e) => setPesoActual(Number(e.target.value))}
          type="number" 
          step="any" 
          id="peso" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="biceps" 
          className="block text-gray-700 font-bold mb-2">Biceps</label>
          <input
          value={biceps}
          onChange={(e) => setBiceps(Number(e.target.value))}
          type="number" 
          step="any" 
          id="biceps" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="cintura" 
          className="block text-gray-700 font-bold mb-2">Cintura</label>
          <input
          value={cintura} 
          onChange={(e) => setCintura(Number(e.target.value))}
          type="number"
          step="any" 
          id="cintura" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="cuadriceps" 
          className="block text-gray-700 font-bold mb-2">Cuadriceps</label>
          <input
          value={cuadriceps} 
          onChange={(e) => setCuadriceps(Number(e.target.value))}
          type="number" 
          step="any" 
          id="cuadriceps" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label htmlFor="gluteos" 
          className="block text-gray-700 font-bold mb-2">Gluteos</label>
          <input
          value={gluteos} 
          onChange={(e) => setGluteos(Number(e.target.value))}
          type="number" 
          step="any" 
          id="gluteos" 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className='text-center'>
          <button
           onClick={(e) => handleFormularioControl(e)}
           className='w-full md:w-[50%] transition-colors ease-in uppercase bg-indigo-600 hover:bg-indigo-700 p-3 mt-5 mb-3 rounded-lg text-white font-bold'>
            {editarControl ? 'Editar control' : 'Agregar control'}
          </button>
        </div>
        
      </form>

      <svg
        onClick={() => setFormularioControl(false)}
        className='absolute right-10 top-5 w-12 h-25 p-2 cursor-pointer text-white' 
        xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    </div>
  )
}

export default FormularioControl
