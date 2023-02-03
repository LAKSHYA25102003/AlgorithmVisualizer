import React from 'react'

function LandingNavbar() {
  return (
    <div className='main fixed top-0 right-0 left-0 bg-white h-[50px] md:h-[80px]'>
      <div className='h-[100%] pt-[10px] pb-[10px] flex justify-between items-center'>
        <div className=' text-blue-600 ml-[10px] text-[15px] md:text-[30px] font-bold'>
            Algorithms Visualizer
        </div>
        <div className='mr-[10px]'>
            <button className='bg-blue-600 text-white p-[4px] md:p-[6px] md:font-bold rounded-[5px]'>Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default LandingNavbar
