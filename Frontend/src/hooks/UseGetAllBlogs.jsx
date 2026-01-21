import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const UseGetAllBlogs = () => {
    
    const fetchBlogs = async()=>{
        const res = await axios.get(`http://localhost:3001/api/v1/blogs`,{withCredentials:true});
        if(res.data.success) return res.data.allblog;
    }

    const {isError,error,data,isPending} = useQuery({
        queryKey:['Blogs'],
        queryFn:fetchBlogs,
    })

    return{
        data,error,isError,isPending
    }
};

export default UseGetAllBlogs