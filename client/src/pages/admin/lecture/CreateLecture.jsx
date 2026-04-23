import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft, Plus, Video } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateLectureMutation, useGetCourseLectureQuery } from '../../../features/api/courseApi';
import { toast } from 'sonner';
import Lecture from './Lecture';

function CreateLecture() {
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();

    const [createLecture, { data, isLoading, isSuccess, error }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureLoading, isError: lectureError, refetch } = useGetCourseLectureQuery(courseId);

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
    }

    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data.message);
        }
        if (error) {
            toast.error(error.data?.message || "Failed to create lecture");
        }
    }, [isSuccess, error])

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-6'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='h-10 w-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg'>
                        <Video size={18} className='text-white' />
                    </div>
                    <h1 className='font-extrabold text-2xl tracking-tight'>Course Lectures</h1>
                </div>
                <p className='text-muted-foreground'>Add lectures to your course. Each lecture can have a video and title.</p>
            </div>
            <div className='space-y-5 bg-card border border-border/60 rounded-2xl p-6 shadow-sm'>
                <div>
                    <Label className="font-semibold">Lecture Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="e.g. Introduction to React Hooks"
                        className="h-11 rounded-xl mt-1"
                    />
                </div>
                <div className='flex items-center gap-3'>
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)} className="rounded-xl">
                        <ArrowLeft size={16} className='mr-2' />
                        Back to course
                    </Button>
                    <Button disabled={isLoading || !lectureTitle.trim()} onClick={createLectureHandler} className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} className='mr-2' />
                                    Create Lecture
                                </>
                            )
                        }
                    </Button>
                </div>
            </div>
            
            {/* Lectures list */}
            <div className='mt-8'>
                <h2 className='font-bold text-lg mb-4'>
                    {lectureData?.lectures?.length > 0 
                        ? `All Lectures (${lectureData.lectures.length})` 
                        : 'No lectures yet'
                    }
                </h2>
                {lectureLoading ? (
                    <div className='flex items-center gap-2 text-muted-foreground py-8'>
                        <Loader2 className='h-4 w-4 animate-spin' />
                        <span>Loading lectures...</span>
                    </div>
                ) : lectureError ? (
                    <p className='text-destructive py-4'>Failed to load lectures.</p>
                ) : lectureData?.lectures?.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-12 rounded-2xl border-2 border-dashed border-border bg-muted/30'>
                        <Video size={32} className='text-muted-foreground mb-3' />
                        <p className='text-muted-foreground font-medium'>No lectures added yet</p>
                        <p className='text-muted-foreground text-sm mt-1'>Create your first lecture above to get started</p>
                    </div>
                ) : (
                    <div className='space-y-2'>
                        {lectureData.lectures.map((lecture, index) => (
                            <Lecture key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreateLecture
