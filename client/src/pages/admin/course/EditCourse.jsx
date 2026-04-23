import React from 'react'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import CourseTab from './CourseTab'
import { ArrowLeft, Video } from 'lucide-react'

function EditCourse() {
    return (
        <div className='flex-1'>
            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h1 className='font-extrabold text-2xl tracking-tight'>Course Details</h1>
                    <p className='text-muted-foreground text-sm mt-1'>Fill in all fields, add lectures, then publish your course</p>
                </div>
                <Link to="lecture">
                    <Button className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold px-6">
                        <Video size={16} className='mr-2' />
                        Add / Edit Lectures
                    </Button>
                </Link>
            </div>
            <CourseTab />
        </div>
    )
}

export default EditCourse
