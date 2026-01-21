import React, { useState,useEffect } from 'react'
import BlogCard from './BlogCard.jsx'
import { Button } from "@/components/ui/button.jsx"
import AddBlogModal from './AddBlogModal.jsx'
import axios from 'axios'
import UseGetAllBlogs from '@/hooks/UseGetAllBlogs.jsx'

const SidePanel = () => {

  const{data,error,isError,isPending} = UseGetAllBlogs();
  console.log(data);

  if(isPending) {
    return <h1> "Loading...</h1>
  }
  
  if(isError){
    return <h1>{error.message}</h1>
  }

  return (
    <div className='w-fit px-6 space-y-5'>
      <div className='text-xl font-semibold pl-2 flex justify-between items-center '>
       <h1>Latest Articles</h1> 
       <AddBlogModal/>
      </div>
      {data?.map((blog,i)=>{
        return <BlogCard key={i+1} title={blog.title} id={blog._id} description={blog.description} content={blog.content} tags={blog.tags} category={blog.category}/>
      })}
    </div>
  )
}

export default SidePanel