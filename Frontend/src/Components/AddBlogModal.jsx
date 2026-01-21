import * as React from "react"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { useQuery } from "@tanstack/react-query"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const AddBlogModal = ({ onSuccess }) => {
  const [formData, setFormData] = React.useState({
    title: "",
    category: "",
    description: "",
    content: "",
    tags: "",
  })

  const [coverImage, setCoverImage] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [open, setOpen] = React.useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setCoverImage(file)
    setPreview(URL.createObjectURL(file))
  }


  const addBlogMutation = useMutation({
    mutationFn: async (data) => {
      return axios.post(
        "http://localhost:3001/api/v1/blogs",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
    },
    onSuccess: () => {
      setOpen(false)
      onSuccess?.() 
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Failed to add blog")
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!coverImage) {
      alert("Cover image is required")
      return
    }

    const data = new FormData()
    data.append("title", formData.title)
    data.append("description", formData.description)
    data.append("content", formData.content)
    data.append("coverImage", coverImage)

    data.append(
      "category",
      formData.category.split(",").map((c) => c.trim())
    )
    data.append(
      "tags",
      formData.tags.split(",").map((t) => t.trim())
    )

    addBlogMutation.mutate(data)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white hover:bg-black/80 hover:cursor-pointer">
          Add Blog
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">


          <div className="space-y-1">
            <Label>Title</Label>
            <Input name="title" onChange={handleChange} required />
          </div>


          <div className="space-y-1">
            <Label>Category (comma separated)</Label>
            <Input
              name="category"
              placeholder="Finance, Tax"
              onChange={handleChange}
              required
            />
          </div>


          <div className="space-y-1">
            <Label>Description</Label>
            <Textarea
              name="description"
              onChange={handleChange}
              required
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover rounded-md border"
              />
            )}
          </div>

          {/* Content */}
          <div className="space-y-1">
            <Label>Content</Label>
            <Textarea
              name="content"
              className="min-h-30"
              onChange={handleChange}
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <Label>Tags (comma separated)</Label>
            <Input
              name="tags"
              placeholder="career, finance"
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={addBlogMutation.isPending}
          >
            {addBlogMutation.isPending ? "Publishing..." : "Publish Blog"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddBlogModal
