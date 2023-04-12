
import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

 
function Sidebar() {
  const { id } = useParams()

    const [menuMobile, setMenuMobile] = useState(false)
    const enlaces = [
        {nombre: 'Inicio', to: `/pacientes/${id}`, icon:HomeIcon},
      ]

  return (
  <>
    
    
      <div className=' md:flex hidden flex-col w-[240px] py-10 px-4 bg-white h-[100vh] fixed'>
        {enlaces.map((enlace=>
          <NavLink 
            key={enlace.nombre}
            to={enlace.to} 
            className={({ isActive}) =>
            isActive? 'bg-indigo-700 rounded-lg p-3 w-full text-white flex justify-start items-center my-5 text-sm font-medium uppercase hover:font-bold' : ' flex justify-start items-center my-5 text-sm font-medium text-indigo-500 hover:text-indigo-600 uppercase'}>
            <enlace.icon className='h-6 w-6 mr-2'/>    
            {enlace.nombre}
          </NavLink>))}
      </div>
    

    <div className='absolute md:hidden block top-3 right-3 '>
        {menuMobile ? (
         <CloseIcon 
         className='w-6 h-6 text-stone-700 mr-2 cursor-pointer'
         onClick={()=> setMenuMobile(false)}/>
          
        ): (
          <MenuIcon 
          className='w-6 h-6 text-stone-700 mr-2 cursor-pointer'
          onClick={()=> setMenuMobile(true)}/>
        )}
    </div>

    <div className={`fixed top-0 h-screen w-2/4 bg-white p-3 z-10 md:hidden transition-all duration-300 ease-in ${menuMobile ? 'left-0 opacity-100' : '-left-full opacity-30'}`}>
      {enlaces.map((enlace=>
          <NavLink 
            key={enlace.nombre}
            to={enlace.to} 
            className={({ isActive}) =>
            isActive? 'bg-indigo-700 rounded-lg p-3 text-white  flex justify-start items-center my-5 text-sm font-medium uppercase hover:font-bold' : ' flex justify-start items-center my-5 text-sm font-medium  text-indigo-500 hover:text-indigo-600 uppercase'}>
            <enlace.icon className='h-6 w-6 mr-2'/>    
            {enlace.nombre}
          </NavLink>))}
    </div>
  </>
  )
}

export default Sidebar