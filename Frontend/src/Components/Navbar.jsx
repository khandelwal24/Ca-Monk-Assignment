import React, { useState } from 'react'
import { Button } from "@/components/ui/button.jsx"
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {
  const[open,setOpen] = useState(false);
  const path = useLocation();
  const naviagte = useNavigate();

   const logOutHandler = async()=>{
        try{
            const res = await axios.get('http://localhost:3001/api/v1/user/logout',{withCredentials:true})
            if(res?.data?.success){
                toast.success(res?.data?.message);
                setTimeout(()=>naviagte('/login'),1000);
            }
        }
        catch(error){
            console.log('Error Occured',error);
            toast.error(error.response.data?.message);
        }
    }

  return (
    <div className='w-screen bg-gray-100 border-b border-borderColor'>
      <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
        <div className='max-w-480 px-6 md:px-24 lg:px-32 xl:px-36 py-2.5 md:py-3 flex justify-between items-center sticky top-0 inset-x-0 z-50'>
            <span className='text-xl font-bold'>CA MONK</span>

          <div className={`max-sm:fixed max-sm:h-screen max-sm:w-[40%] max-sm:top-12 max-sm:border-l border-border right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all z-50 duration-300 ${path.pathname==='/' ? 'bg-gray-100' : ''} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"}`}>
              <div>
                  <ul className='space-x-7 flex flex-col sm:flex-row items-start'>
                    <a className='hover:font-semibold hover:text-md duration-300 transition-all ease-in-out' href='#tools'>Tools</a>
                    <a className='hover:font-semibold hover:text-md duration-300 transition-all ease-in-out' href='#practice'>Practice</a>
                    <a className='hover:font-semibold hover:text-md duration-300 transition-all ease-in-out' href='#events'>Events</a>
                    <a className='hover:font-semibold hover:text-md duration-300 transition-all ease-in-out' href='#job_board'>Job Board</a>
                    <a className='hover:font-semibold hover:text-md duration-300 transition-all ease-in-out' href='#points'>Points</a>
                  </ul>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                  <Button>Profile</Button>
                  <Button onClick={logOutHandler} className={"hover:cursor-pointer hover:bg-gray-700"}>LogOut</Button>
              </div>
          </div>

           <button className='sm:hidden cursor-pointer' aria-label='Menu' onClick={()=>setOpen(!open)}>
            {open ? <i class="fa-solid fa-xmark"></i>:<i class="fa-solid fa-bars"></i>}
          </button>
        </div>
    </div>
  )
}

export default Navbar