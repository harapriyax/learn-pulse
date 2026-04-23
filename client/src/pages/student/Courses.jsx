import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import Course from './Course';
import { useGetPublishedCoursesQuery } from '../../features/api/courseApi';
import { AlertCircle, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Courses() {
    const { data, isLoading, isError } = useGetPublishedCoursesQuery();
    const navigate = useNavigate();

    if (isError) return (
        <div className='flex flex-col items-center justify-center py-20'>
            <AlertCircle className='h-12 w-12 text-destructive mb-4' />
            <h2 className='text-xl font-semibold text-foreground'>Something went wrong</h2>
            <p className='text-muted-foreground mt-2'>We couldn't load courses. Please try again later.</p>
        </div>
    )

    const hasCourses = data?.courses && data.courses.length > 0;

    return (
        <div className='bg-background relative'>
            {/* Subtle pattern */}
            <div className='absolute inset-0 opacity-[0.02]' style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }} />

            <div className='max-w-7xl mx-auto px-6 py-20 relative'>
                <div className='flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4'>
                    <div>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1] text-xs font-bold uppercase tracking-widest mb-3'>
                            <TrendingUp size={12} />
                            Featured Courses
                        </div>
                        <h2 className='font-black text-3xl md:text-4xl tracking-tight text-foreground'>Explore Our Top Courses</h2>
                        <p className='text-muted-foreground mt-2 max-w-lg'>Handpicked courses from expert instructors to help you reach your goals</p>
                    </div>
                    {hasCourses && (
                        <Button 
                            onClick={() => navigate('/course/search?query')}
                            variant="outline" 
                            className="rounded-xl self-start md:self-auto border-[#6366f1]/30 text-[#6366f1] hover:bg-[#6366f1]/5 font-semibold"
                        >
                            View All Courses
                        </Button>
                    )}
                </div>

                {isLoading ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <CourseSkeleton key={index} />
                        ))}
                    </div>
                ) : hasCourses ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {data.courses.map((course, index) => <Course key={index} course={course} />)}
                    </div>
                ) : (
                    /* Empty state - when no courses are published yet */
                    <div className='flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-border bg-card/50'>
                        <div className='h-20 w-20 rounded-3xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl shadow-[#6366f1]/20 mb-6'>
                            <BookOpen size={32} className='text-white' />
                        </div>
                        <h3 className='font-bold text-xl text-foreground mb-2'>No courses published yet</h3>
                        <p className='text-muted-foreground text-center max-w-md mb-6'>
                            Courses will appear here once instructors publish them. Check back soon for exciting new content!
                        </p>
                        <Button 
                            onClick={() => navigate('/course/search?query')}
                            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold px-6"
                        >
                            Browse All Categories
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Courses;

const CourseSkeleton = () => {
    return (
        <div className='bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm'>
            <Skeleton className="w-full h-44" />
            <div className='px-5 py-4 space-y-3'>
                <Skeleton className="h-5 w-3/4 rounded-lg" />
                <div className='flex items-center gap-3'>
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-4 w-24 rounded-lg" />
                </div>
                <div className='flex items-center justify-between pt-3 border-t border-border/30'>
                    <Skeleton className="h-6 w-16 rounded-lg" />
                    <Skeleton className="h-3 w-20 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
