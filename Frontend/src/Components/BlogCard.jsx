import React from 'react'
import { Badge } from "@/components/ui/Badge.jsx"
import { useNavigate } from 'react-router-dom'
import UseGetAllBlogs from '@/hooks/UseGetAllBlogs';

const BlogCard = ({title,description,content,id,tags,category}) => {
  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/blog/${id}`)} className='card max-w-100 bg-gray-100 rounded-lg border-borderColor shadow-2xl p-4 hover:scale-105 duration-300 ease-in-out transition-all hover:-translate-y-1'>
        <div className='w-full flex flex-col items-start justify-between'>
          
          <div className='flex justify-between items-center w-full mb-2'>
            <span>{category}</span>
            <span>2 days ago</span>
          </div>

          <div className='mb-2'>
            <h1 className='text-xl font-semibold'>{title}</h1>
          </div>

          <p className='text-sm text-gray-500 mb-2'>{description}</p>

          <Badge>{tags}</Badge>

        </div>
    </div>
  )
}

export default BlogCard