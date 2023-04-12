import React from 'react'

function Alerta({alerta}) {
  return (
    <div className={`${alerta.error ? ' bg-red-600' : 'bg-sky-600'} p-2 text-white text-center font-bold rounded-md mb-5`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta