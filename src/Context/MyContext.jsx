
import { useState, createContext } from 'react'

const OrneContext = createContext()

function MyContext({children}) {

  // estados pagina de añadir
    const [pacientes, setPacientes] = useState([])
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [pacienteBuscado, setPacienteBuscado] = useState('')
   
    // estados formulario pacientes
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')

     // estados formulario Control
     const [fecha, setFecha] = useState('')
     const [pesoActual, setPesoActual] = useState('')
     const [biceps, setBiceps] = useState('')
     const [cintura, setCintura] = useState('')
     const [cuadriceps, setCuadriceps] = useState('')
     const [gluteos, setGluteos] = useState('')

     //estados pagina paciente
    const [controles, setControles] = useState([])

    const [formularioControl, setFormularioControl] = useState(false)

    const [autenticado, setAutenticado] = useState('')

    //Editar pacientes db
    const [editarPaciente, setEditarPaciente] = useState(false)
    const [obtenerId, setObtenerId] =useState('')

    // editar controles
    const [editarControl , setEditarControl] = useState(false)
    // Obtener el id del control
    const [idControl, setIdControl] = useState(true)

    function abrirFormularioControl(){
      setFormularioControl(true)
    }
    
    function abrirFormulario(){
        setMostrarFormulario(true)
    }

    // Setear formulario pacientes
    function setFormPacientes(){
      setMostrarFormulario(false)
      setNombre('')
      setApellido('')
      setEmail('')
      setTelefono('')
    }

    // Editar paciente, desde la card de pacientes

     function editarPacienteCard(paciente){
      setMostrarFormulario(true)
      setNombre(paciente.nombre)
      setEmail(paciente.email)
      setApellido(paciente.apellido)
      setTelefono(paciente.telefono)
      setEditarPaciente(true)
      setObtenerId(paciente._id)
    }

    function limpiarFormControl(){
      setFormularioControl(false)
      setPesoActual('')
      setFecha('')
      setBiceps('')
      setCintura('')
      setCuadriceps('')
      setGluteos('')
      setIdControl('')
    }

    // Editar control
    function editarControlPaciente(resultado){
      setFecha(resultado.fecha)
      setPesoActual(resultado.pesoActual)
      setBiceps(resultado.biceps)
      setCintura(resultado.cintura)
      setCuadriceps(resultado.cuadriceps)
      setGluteos(resultado.gluteos)
      setEditarControl(true)
      setIdControl(resultado._id)
      setFormularioControl(true)
    }
    
  return (
    <OrneContext.Provider 
    value={{nombre, setNombre, email, setEmail, apellido, setApellido, telefono, setTelefono, abrirFormulario, mostrarFormulario, setMostrarFormulario, setFormPacientes,
    pacientes, setPacientes, pacienteBuscado, setPacienteBuscado, editarPacienteCard,
    formularioControl, setFormularioControl, abrirFormularioControl, limpiarFormControl, editarControl , setEditarControl, editarControlPaciente, fecha, setFecha, pesoActual,
    setPesoActual, biceps, setBiceps, cintura, setCintura, cuadriceps, setCuadriceps,
     gluteos, setGluteos, autenticado, setAutenticado, editarPaciente, setEditarPaciente, obtenerId, setObtenerId, controles, setControles, idControl, setIdControl }}>
        {children}
    </OrneContext.Provider>
  )
}

export default OrneContext

export {MyContext}
