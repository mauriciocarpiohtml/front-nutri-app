 import BarPeso from '../components/BarPeso'
 import BarChart from '../components/Barchart'
 import OrneContext from '../Context/MyContext'
 import { useContext } from 'react'
 import { Swiper, SwiperSlide } from "swiper/react";
 import SwiperCore, { Navigation } from "swiper/core";
 import "swiper/swiper-bundle.css";

 SwiperCore.use([Navigation]);

 function SliderGraficos() {
     const {controles} = useContext(OrneContext)
   return (
     <div className="relative mt-5 mb-10 w-full md:w-[65%] md:h-[45%] mx-auto">
   <Swiper
     spaceBetween={50}
     navigation={{
       prevEl: '.swiper-button-prev',
       nextEl: '.swiper-button-next',
     }}
   >
     <SwiperSlide className="h-full">
       <div className="h-full flex items-center justify-center">
         <BarPeso />
       </div>
     </SwiperSlide>
     <SwiperSlide className="h-full">
       <div className="h-full flex items-center justify-center">
         <BarChart data={controles} label="Biceps" dataKey="biceps" />
       </div>
     </SwiperSlide>
     <SwiperSlide className="h-full">
       <div className="h-full flex items-center justify-center">
         <BarChart data={controles} label="Cintura" dataKey="cintura" />
       </div>
     </SwiperSlide>
     <SwiperSlide className="h-full">
       <div className="h-full flex items-center justify-center">
         <BarChart data={controles} label="Cuadriceps" dataKey="cuadriceps" />
       </div>
     </SwiperSlide>
     <SwiperSlide className="h-full">
       <div className="h-full flex items-center justify-center">
         <BarChart data={controles} label="Glúteos" dataKey="gluteos" />
       </div>
     </SwiperSlide>
     <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2  p-2 rounded-full  z-10 swiper-button-prev">
       <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6 text-gray-400"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
       >
         <path
           strokeLinecap="round"
           strokeLinejoin="round"
           strokeWidth={2}
           d="M15 19l-7-7 7-7"
         />
      </svg>
    </div>
    <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full z-10 swiper-button-next">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
           strokeWidth={2}
           d="M9 5l7 7-7 7"
         />
       </svg>
     </div>
   </Swiper>
 </div>
   )
 }

 export default SliderGraficos
