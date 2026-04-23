import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import { useCreateCourseMutation } from '../../../features/api/courseApi';
import { toast } from "sonner";

function AddCourse() {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");

    const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();

    const navigate = useNavigate();
    const getSelectedCategory = (value) => {
        setCategory(value);
    }

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category });
    }

    //for displaying toast
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created.");
            navigate("/admin/course")
        }
    }, [isSuccess, error])

    return (
        <div className='max-w-2xl'>
            <div className='mb-8'>
                <div className='flex items-center gap-3 mb-2'>
                    <div className='h-10 w-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg'>
                        <Sparkles size={18} className='text-white' />
                    </div>
                    <h1 className='font-extrabold text-2xl tracking-tight'>Create New Course</h1>
                </div>
                <p className='text-muted-foreground'>Fill in the basic details to get started with your new course</p>
            </div>
            <div className='space-y-6 bg-card border border-border/60 rounded-2xl p-8 shadow-sm'>
                <div className='space-y-2'>
                    <Label className="font-semibold">Course Title</Label>
                    <Input
                        type="text"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        placeholder="e.g. Complete React Developer Course"
                        className="h-11 rounded-xl"
                    />
                </div>
                <div className='space-y-2'>
                    <Label className="font-semibold">Category</Label>
                    <Select onValueChange={getSelectedCategory}>
                        <SelectTrigger className="w-full rounded-xl h-11">
                            <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next JS">Next JS</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                                <SelectItem value="MERN Stack Development">MERN Stack Development</SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="Python">Python</SelectItem>
                                <SelectItem value="Docker">Docker</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-3 pt-4'>
                    <Button variant="outline" onClick={() => navigate("/admin/course")} className="rounded-xl">
                        <ArrowLeft size={16} className='mr-2' />
                        Back
                    </Button>
                    <Button disabled={isLoading} onClick={createCourseHandler} className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                        {
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Creating...
                                </>
                            ) : "Create Course"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse
