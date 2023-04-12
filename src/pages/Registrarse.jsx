import axios from 'axios';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alerta from '../components/Alerta'

function Registrarse() {

    // Estados formulario
  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const navigate = useNavigate();


  async function handleSubmit(e){
    e.preventDefault()
    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta( {msg:'Todos los campos son obligatorios', error: true} )
       return
    }
    if(password !== repetirPassword){
      setAlerta( {msg:'Los passwords no son iguales', error: true} )
      return
    }
    setAlerta({})

    // Creando el usuario en la API
    // Se envia la Url a la que queremos enviar esos datos y los datos que queremos enviar
    try {
      // Asi accedemos directamente a la respuesta de la peticion fetch
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {nombre, password,email})
      setAlerta({
        msg: data.msg,
        error:false
      })

      // Si el codigo llega hasta aca significa que el ya esta registrado
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
      setAlerta({})
      
      // Enviar el usuario al login
      navigate('/login');

    } catch (error) {
      console.log(error)
    }
  }

  // Extraigo el mensaje de la alerta
  const {msg} = alerta

  return (
    <>
     <h1 className='text-indigo-600 uppercase font-semibold text-3xl text-center mt-10'>Crea tu cuenta</h1>
    <div className='p-5 w-[80%] md:w-[55%] flex justify-center items-center mx-auto flex-col '>

      <form 
      onSubmit={handleSubmit}
      className='my-3 md:my-3 bg-white shadow-lg p-10 rounded-lg w-full '>

         {/* // mostrar alerta  */}

      {msg && <Alerta alerta={alerta}/>}

        <div className='my-3'>
          <label
          htmlFor='nombre' 
          className='uppercase text-stone-500 block font-bold'>Nombre</label>
          <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          id='nombre' 
          type='text'
          placeholder='Ingresa tu nombre'
          className='p-3 w-full rounded-lg mt-1 border bg-gray-50'/>
        </div>
        <div className='my-3'>
          <label
          htmlFor='email' 
          className='uppercase text-stone-500 block font-bold'>Email</label>
          <input
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          id='email' 
          type='email'
          placeholder='Ingresa tu email'
          className='p-3 w-full rounded-lg mt-1 border bg-gray-50'/>
        </div>

        <div className='my-3'>
          <label
          htmlFor='password' 
          className='uppercase text-stone-500 block font-bold'>Password</label>
          <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id='password' 
          type='password'
          placeholder='Ingresa tu password'
          className='p-3 w-full rounded-lg mt-3 mb-3 border bg-gray-50'/>
        </div>

        <div className='my-3'>
          <label
          htmlFor='password2' 
          className='uppercase text-stone-500 block font-bold'>Reepite tu password</label>
          <input
          value={repetirPassword}
          onChange={(e) => setRepetirPassword(e.target.value)}
          id='password2' 
          type='password'
          placeholder='Reepite tu password'
          className='p-3 w-full rounded-lg mt-3 mb-3 border bg-gray-50'/>
        </div>

        <input 
        type='submit'
        value='Crear cuenta'
        className='bg-indigo-700 w-full py-3 text-white uppercase font-bold 
        rounded-md hover:cursor-pointer hover:bg-indigo-800 transition-colors'/>
      </form>

      <nav className='md:flex md:justify-between mb-5'>
        <Link
        className='block text-center my-5 md:my-5 text-stone-700 uppercase hover:text-indigo-500 transition-colors' 
        to='/login'>Iniciar sesión</Link>
      </nav>
    </div>  
    </>
  )
}

export default Registrarse
