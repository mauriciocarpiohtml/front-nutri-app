import axios from 'axios'
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrneContext from '../Context/MyContext'
import Alerta from '../components/Alerta'



 function Login() {

    const {setAutenticado} = useContext(OrneContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState({})

    //navegacion
    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        if([email, password].includes('')){
            setAlerta({
                msg:'Todos los campos son obligatorios',
                error: true
            })
            return
        }
        try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/login`, {email, password})
        // const data = await response.json()
        if(response.status === 200 && response.data){

           await setAutenticado(response.data.token)
           navigate(`/pacientes/${response.data._id}`)
        }
        if(response.status === 403){
            setAlerta({
                msg: response.data.msg,
                error:false
                 })
        return
        }
        
         
        } catch (error) {
            console.log(error)
        }
    }

    const {msg} = alerta
    
    
  return (
    <>
    <h1 
    className='text-indigo-600 font-semibold uppercase px-5 mt-10 text-xl md:text-3xl text-center'>Inicia sesion y administra tus pacientes</h1>

    <div className='p-5 w-[85%] md:w-[55%] flex justify-center items-center mx-auto flex-col '>
        {msg && <Alerta alerta={alerta}/>}
      <form
       onSubmit={handleLogin}
       className='my-3 md:my-5 bg-white shadow-lg p-3 md:p-10 rounded-lg w-full'>
        <div 
         className='my-3'>
          <label
          htmlFor='email' 
          className='uppercase text-stone-500 block font-bold'>Email</label>
          <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

        <input 
        type='submit'
        value='Iniciar sesión'
        className='bg-indigo-700 w-full py-3 text-white uppercase font-bold 
        rounded-md hover:cursor-pointer hover:bg-indigo-800 transition-colors'/>
      </form>

      <nav className='md:flex md:justify-between mb-5'>
        <Link
        className='block text-center my-5 md:my-5 text-stone-700 uppercase hover:text-indigo-500 transition-colors' 
        to='/registrarse'>Registrate</Link>
      </nav>
    </div>
    </>
  )
}

export default Login
