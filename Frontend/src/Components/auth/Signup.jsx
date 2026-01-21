import React, { useState,useEffect } from 'react'
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function Signup() {
    
    const navigate = useNavigate();
    const path = useLocation();

    const [showpassword,setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userInfo,setUsrInfo] = useState({
        username:'',
        email:'',
        password:''
    })

    const getVal = (e)=>{
        const oldData = {...userInfo};
        const InputName = e.target.name;
        const InputValue = e.target.value;
        oldData[InputName] = InputValue;
        setUsrInfo(oldData);
    }
    
    // Isme Api call Karenge...
    const handleSubmit = async (e) =>{
        e.preventDefault();
        e.stopPropagation();
        try{
            setLoading(true);
            const res = await axios.post('http://localhost:3001/api/v1/user/register',userInfo, {headers:{"Content-Type":'application/json'}, withCredentials:true });
            if(res.data.success){
                toast.success(res.data.message);
                setUsrInfo({
                    username:'',
                    email:'',
                    password:''
                })
                setTimeout(()=>navigate('/login'),2000); // After 2 seconds naviagate kar dega to Login page
            }
        }
        catch(error){
            console.log('Error Occured',error);
            toast.error(error.response.data.message)
        }
        finally{
            setLoading(false);
        }
    }


  return (

    <div className='h-screen w-screen flex justify-center items-center bg-gray-800'>
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
    <div className='w-full p-5 my-3'>
    <form onSubmit={handleSubmit} className='max-w-100 mx-auto p-4 bg-gray-300 border border-black rounded-md shadow-xl overflow-hidden'>
        <p className='sm:text-md text-2xl font-semibold text-center mb-4'>Sign Up to see CA monk Latest Blogs</p>
        
        <p className='mb-4'>
        <label className='font-semibold'>Username : </label>
        <input required type='text' placeholder='Enter username' name='username' value={userInfo.username} onChange={getVal}  className='p-2 w-full border border-gray-800 rounded-md focus-visible:ring-1 outline-none'/>
        </p>

        <p className='mb-4'>
        <label className='font-semibold'>Email : </label>
        <input required type='email' placeholder='Enter email' name='email' value={userInfo.email} onChange={getVal}  className='p-2 w-full rounded-md border border-gray-800  focus-visible:ring-1 outline-none'/>
        </p>

        <p className='mb-4'>
        <label className='font-semibold'>Password : </label>
        <p className='relative'>
        <input required type={showpassword ? 'text' : 'password'} placeholder='Enter password' name='password' value={userInfo.password}  onChange={getVal} className='p-2 w-full border border-gray-800 rounded-md focus-visible:ring-1 outline-none'/>
        {showpassword ? <FaEye className='absolute right-2 top-[33%] hover:cursor-pointer' onClick={()=>setShowPassword(!showpassword)}/> : <FaEyeSlash className='absolute right-2 top-[33%] hover:cursor-pointer' onClick={()=>setShowPassword(!showpassword)}/> }        
        </p>
        </p>

        <button type='submit' className='w-full mt-4 mb-2 text-center bg-black text-white font-semibold p-2 rounded-md hover:bg-gray-700'>Sign Up</button>
        <p className='text-center'>Already have an account? <NavLink to={'/Login'} className='text-blue-700 underline hover:text-black hover:font-semibold'>Login</NavLink> </p>

    </form>
   
      
    </div>
    </div>
  )
}

export default Signup