import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'
import { Clock, Users } from 'lucide-react';

function Course({ course }) {
    return (
        <Link to={`/course-detail/${course._id}`}>
            <Card className="overflow-hidden rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-2xl hover:shadow-[#6366f1]/10 transform hover:scale-[1.03] hover:-translate-y-2 transition-all duration-400 group cursor-pointer">
                <div className='relative overflow-hidden'>
                    <img src={course.courseThumbnail}
                        alt={course.courseTitle}
                        className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    {/* Overlay gradient */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400' />
                    {course.courseLevel && (
                        <Badge className="absolute top-3 left-3 bg-white/90 text-[#312e81] backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider shadow-lg border-0 px-2.5 py-1">
                            {course.courseLevel}
                        </Badge>
                    )}
                    {/* Play button on hover */}
                    <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400'>
                        <div className='h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-400'>
                            <div className='w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-[#312e81] border-b-[8px] border-b-transparent ml-1' />
                        </div>
                    </div>
                </div>
                <CardContent className="px-5 py-4 space-y-3">
                    <h1 className='font-bold text-[15px] line-clamp-2 leading-snug group-hover:text-[#6366f1] transition-colors duration-300'>{course.courseTitle}</h1>
                    <div className='flex items-center gap-2.5'>
                        <Avatar className="h-6 w-6 ring-2 ring-[#6366f1]/10">
                            <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="bg-[#6366f1]/10 text-[#6366f1] text-[10px] font-bold">{course.creator?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className='font-medium text-xs text-muted-foreground'>{course.creator?.name}</span>
                    </div>
                    <div className='flex items-center justify-between pt-2.5 border-t border-border/50'>
                        <span className='text-xl font-black bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent'>₹{course.coursePrice}</span>
                        <div className='flex items-center gap-1 text-muted-foreground'>
                            <Users size={12} />
                            <span className='text-[11px] font-medium'>{course.enrolledStudents?.length || 0} enrolled</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default Course
