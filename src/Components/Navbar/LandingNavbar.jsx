import React from 'react'
import Context from '../../Context/Context'
import { useContext } from 'react'

function LandingNavbar() {
  const {setNum}=useContext(Context);
  return (
    <div className='main fixed top-0 right-0 left-0 bg-white h-[50px] md:h-[70px]'>
      <div className='h-[100%] pt-[10px] pb-[10px] flex justify-between items-center'>
        <div className=' text-blue-600 ml-[10px] text-[15px] md:text-[27px] font-bold cursor-pointer' onClick={()=>{setNum
        (1)}}>
            Algorithms Visualizer
        </div>
        <div className='mr-[10px]'>
            <button className='bg-blue-600 text-white p-[4px] md:p-[6px] md:font-bold rounded-[5px]' onClick={()=>{setNum
            (2)}}>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default LandingNavbar
