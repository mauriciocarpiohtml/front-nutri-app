import { useState } from 'react'
import Pacientes from './pages/Pacientes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Pacientes/>
    </>
  )
}

export default App
