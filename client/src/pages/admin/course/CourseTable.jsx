import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from 'react-router-dom'
import { useGetCreatorCourseQuery } from '../../../features/api/courseApi'
import { Edit, Plus, Loader2, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function CourseTable() {
  const { data, isLoading } = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if (isLoading) return (
    <div className='flex flex-col items-center justify-center min-h-[400px]'>
      <Loader2 className='h-8 w-8 animate-spin text-[#6366f1] mb-4' />
      <p className='text-muted-foreground text-sm font-medium'>Loading your courses...</p>
    </div>
  );

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-extrabold text-3xl tracking-tight'>My Courses</h1>
          <p className='text-muted-foreground mt-1'>Manage and edit your published courses</p>
        </div>
        <Button
          onClick={() => navigate(`create`)}
          className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold px-6"
        >
          <Plus size={16} className='mr-2' />
          Create Course
        </Button>
      </div>

      {data?.courses?.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 rounded-2xl border-2 border-dashed border-border bg-card/50'>
          <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl mb-4'>
            <BookOpen size={28} className='text-white' />
          </div>
          <h3 className='font-bold text-lg'>No courses yet</h3>
          <p className='text-muted-foreground mt-1 mb-4'>Create your first course and start teaching</p>
          <Button
            onClick={() => navigate(`create`)}
            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg font-semibold"
          >
            <Plus size={16} className='mr-2' />
            Create Your First Course
          </Button>
        </div>
      ) : (
        <div className='bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm'>
          <Table>
            <TableCaption className='pb-4'>A list of your courses</TableCaption>
            <TableHeader>
              <TableRow className='bg-muted/30'>
                <TableHead className="font-bold">Title</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="text-right font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.courses.map((course) => (
                <TableRow key={course._id} className="hover:bg-muted/30 transition-colors duration-200">
                  <TableCell className="font-semibold">{course.courseTitle}</TableCell>
                  <TableCell>
                    <span className='font-bold text-[#6366f1]'>
                      {course?.coursePrice ? `₹${course.coursePrice}` : "Free"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge className={course.isPublished ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500/20"}>
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)} className='rounded-xl hover:bg-[#6366f1]/10 hover:text-[#6366f1] transition-all duration-200'>
                      <Edit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

export default CourseTable
