import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

const UseGetBlogById = (id) => {
    
    const getBlogByID = async () => {
        const res = await axios.get(`http://localhost:3001/api/v1/blog/${id}`,{withCredentials:true})
        if (res.data.success) return res.data.findBlog
        throw new Error("Failed to fetch blog")
    }

    const {data,isError,isPending,error,} = useQuery({
        queryKey: ['blogById', id],   
        queryFn: getBlogByID,
        enabled: !!id,
    })

  return {
    blog: data,
    isError,
    isPending,
    error,
  }
}

export default UseGetBlogById