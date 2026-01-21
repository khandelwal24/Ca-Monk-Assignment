import React from 'react'

const Hero = () => {
  return (
    <div className='w-screen bg-gray-200 max-h-screen/3 shadow-lg'>
        <div className='px-6 sm:px-16 md:px-24 lg:px-32 xl:px-36 py-4 text-center'>
            <div className='my-10 space-y-2.5'>
              <h1 className='md:text-5xl text-3xl font-bold'>CA Monk Blog</h1>
              <p className='text-gray-800 font-medium md:text-md text-sm'>Stay updated with the latest trends in finance, accounting and career growth.</p>
            </div>
        </div>
    </div>
  )
}

export default Hero