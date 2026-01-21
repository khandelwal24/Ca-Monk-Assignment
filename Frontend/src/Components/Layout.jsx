// import React from 'react'
// import SidePanel from './SidePanel'
// import { Outlet } from 'react-router-dom'
// import Navbar from './Navbar'
// import Hero from './Hero'

// const Layout = () => {
//   return (
//     <>
//         <Navbar/>
//         <Hero/>
//         <div className="flex mx-auto px-6 gap-6 my-10">
//         {/* Left */}
//         <div className="w-[35%]">
//           <SidePanel />
//         </div>

//         {/* Right */}
//         <div className="w-[65%] bg-blue-100 shadow-xl rounded-lg p-6 my-10">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Layout


import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import SidePanel from './SidePanel'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const isBlogOpen = location.pathname.startsWith('/blog')

  return (
    <>
      <Navbar />
      <Hero />

      <div className="mx-auto mt-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* LEFT PANEL */}
          <div className={`lg:w-[35%] ${isBlogOpen ? 'hidden lg:block' : 'block'}`}>
            <SidePanel />
          </div>

          {/* RIGHT PANEL */}

          <div className={`lg:w-[65%] bg-white rounded-xl shadow p-5 ${!isBlogOpen ? 'hidden lg:block' : 'block'}`}>
            {/* Mobile Back Button */}
            {isBlogOpen && (
              <button onClick={() => navigate('/')} className="lg:hidden mb-4 text-sm text-blue-600 font-medium">
                ← Back to articles
              </button>
            )}

            <Outlet />
          </div>

        </div>
      </div>
    </>
  )
}

export default Layout
