import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Search, Play, Zap, Star } from 'lucide-react';

function HeroSection() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/course/search?query=${searchQuery}`)
        }
        setSearchQuery("");
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Background */}
            <div className='relative bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#4338ca] py-24 md:py-32 px-4'>
                {/* Decorative grid */}
                <div className='absolute inset-0 opacity-10' style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                }} />
                
                {/* Glowing orbs */}
                <div className='absolute top-10 left-[10%] w-[300px] h-[300px] bg-[#7c3aed] rounded-full blur-[120px] opacity-30' />
                <div className='absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-[#6366f1] rounded-full blur-[150px] opacity-25' />
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#818cf8] rounded-full blur-[200px] opacity-15' />

                <div className='max-w-5xl mx-auto relative z-10'>
                    {/* Badge */}
                    <div className='flex justify-center mb-8'>
                        <span className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl text-white text-sm font-medium border border-white/20 shadow-lg'>
                            <Zap size={14} className='text-yellow-400' />
                            Trusted by 10,000+ learners worldwide
                            <Star size={12} className='text-yellow-400 fill-yellow-400' />
                        </span>
                    </div>
                    
                    {/* Main heading */}
                    <h1 className='text-center text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight'>
                        <span className='text-white'>Unlock Your Potential</span>
                        <br />
                        <span className='text-white'>with </span>
                        <span className='bg-gradient-to-r from-[#c4b5fd] via-[#a78bfa] to-[#f9a8d4] bg-clip-text text-transparent'>
                            Expert-Led Courses
                        </span>
                    </h1>

                    <p className='text-[#c7d2fe] mb-10 text-center text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light'>
                        Discover, learn, and upskill with our curated courses. From web development to data science — start your journey today.
                    </p>

                    {/* Search bar */}
                    <form onSubmit={searchHandler} className='flex items-center bg-white/[0.08] backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto mb-8 border border-white/[0.15] hover:border-white/30 focus-within:border-white/40 transition-all duration-500 group'>
                        <div className='flex items-center pl-6'>
                            <Search size={20} className='text-white/40 group-focus-within:text-white/70 transition-colors duration-300' />
                        </div>
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="What do you want to learn today?"
                            className="flex-grow border-none bg-transparent focus-visible:ring-0 px-4 py-5 text-white placeholder-white/30 text-base md:text-lg"
                        />
                        <Button type="submit" className="bg-white text-[#312e81] hover:bg-[#eef2ff] px-8 py-5 rounded-xl m-2 font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                            Search
                        </Button>
                    </form>

                    {/* CTA buttons */}
                    <div className='flex flex-col sm:flex-row justify-center gap-4 items-center'>
                        <Button 
                            onClick={() => navigate(`/course/search?query`)} 
                            className="bg-white/[0.08] backdrop-blur-sm text-white border border-white/20 rounded-xl hover:bg-white/15 px-8 py-5 font-semibold text-base transition-all duration-300 group hover:border-white/40"
                        >
                            Explore All Courses
                            <ArrowRight size={16} className='ml-2 group-hover:translate-x-1.5 transition-transform duration-300' />
                        </Button>
                        <Button 
                            variant="ghost" 
                            className="text-white/70 hover:text-white hover:bg-white/5 rounded-xl px-6 py-5 font-medium text-base transition-all duration-300 group"
                        >
                            <Play size={16} className='mr-2 text-[#a78bfa]' />
                            Watch Demo
                        </Button>
                    </div>

                    {/* Category tags */}
                    <div className='flex flex-wrap justify-center gap-2 mt-10'>
                        {['React', 'Python', 'Data Science', 'MERN Stack', 'Docker', 'Next.js'].map((tag) => (
                            <span key={tag} onClick={() => navigate(`/course/search?query=${tag}`)} className='px-4 py-1.5 rounded-full bg-white/[0.06] text-white/50 text-xs font-medium border border-white/10 hover:bg-white/15 hover:text-white/90 hover:border-white/30 cursor-pointer transition-all duration-300'>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats bar */}
            <div className='relative bg-card border-b border-border'>
                <div className='absolute inset-0 bg-gradient-to-r from-[#6366f1]/5 via-transparent to-[#8b5cf6]/5' />
                <div className='max-w-5xl mx-auto grid grid-cols-3 gap-4 py-10 px-4 relative'>
                    <div className='text-center group'>
                        <div className='flex justify-center mb-3'>
                            <div className='h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/20 group-hover:shadow-xl group-hover:shadow-[#6366f1]/30 transition-all duration-300 group-hover:scale-110'>
                                <BookOpen size={20} className='text-white' />
                            </div>
                        </div>
                        <p className='text-3xl font-black text-foreground'>200+</p>
                        <p className='text-sm text-muted-foreground font-medium'>Expert Courses</p>
                    </div>
                    <div className='text-center group'>
                        <div className='flex justify-center mb-3'>
                            <div className='h-12 w-12 rounded-2xl bg-gradient-to-br from-[#06b6d4] to-[#0891b2] flex items-center justify-center shadow-lg shadow-[#06b6d4]/20 group-hover:shadow-xl group-hover:shadow-[#06b6d4]/30 transition-all duration-300 group-hover:scale-110'>
                                <Users size={20} className='text-white' />
                            </div>
                        </div>
                        <p className='text-3xl font-black text-foreground'>10K+</p>
                        <p className='text-sm text-muted-foreground font-medium'>Active Learners</p>
                    </div>
                    <div className='text-center group'>
                        <div className='flex justify-center mb-3'>
                            <div className='h-12 w-12 rounded-2xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shadow-lg shadow-[#f59e0b]/20 group-hover:shadow-xl group-hover:shadow-[#f59e0b]/30 transition-all duration-300 group-hover:scale-110'>
                                <Award size={20} className='text-white' />
                            </div>
                        </div>
                        <p className='text-3xl font-black text-foreground'>95%</p>
                        <p className='text-sm text-muted-foreground font-medium'>Satisfaction Rate</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
