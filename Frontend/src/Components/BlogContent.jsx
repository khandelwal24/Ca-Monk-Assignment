import UseGetBlogById from '@/hooks/UseGetBlogById.jsx';
import React from 'react'
import { useParams } from 'react-router-dom'

const BlogContent = () => {
  const {id} = useParams();
  if(!id) return <p className="text-gray-500">Select a blog to read</p>

  const{blog,error,isError,isPending} = UseGetBlogById(id);

  if (isPending) {
    return <p className="text-gray-500">Loading blog...</p>
  }

 
  if (isError) {
    return <p className="text-red-500">{error.message}</p>
  }

 
  if (!blog) {
    return <p className="text-gray-400">Select a blog to read</p>
  }

  return (
    <article className="space-y-4">

      {/* Cover Image */}
      <img
        src={blog.coverImage}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      {/* Title */}
      <h1 className="text-2xl font-bold">{blog.title}</h1>

      {/* Meta */}
      <div className="text-sm text-gray-500">
        {blog.category?.join(', ')} •{" "}
        {new Date(blog.createdAt).toDateString()}
      </div>

      {/* Description */}
      <p className="text-gray-700">{blog.description}</p>

      {/* Content */}
      <div className="text-gray-800 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-4">
        {blog.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

    </article>
  )
}

export default BlogContent