import React from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='relative bg-[#0f172a] text-white overflow-hidden'>
            {/* Gradient top border */}
            <div className='h-1 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1]' />
            
            {/* Glow */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#6366f1] rounded-full blur-[150px] opacity-10' />

            <div className='max-w-7xl mx-auto px-6 py-16 relative'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                    {/* Brand */}
                    <div className='md:col-span-1'>
                        <div className='flex items-center gap-2.5 mb-4'>
                            <div className='h-10 w-10 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg'>
                                <Logo size={22} />
                            </div>
                            <span className='font-extrabold text-xl'>LearnPulse</span>
                        </div>
                        <p className='text-[#94a3b8] text-sm leading-relaxed'>
                            Empowering learners worldwide with expert-led courses and cutting-edge content.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className='font-bold text-sm uppercase tracking-widest text-white/60 mb-4'>Platform</h4>
                        <ul className='space-y-2.5'>
                            <li><Link to="/" className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200'>Home</Link></li>
                            <li><Link to="/course/search?query" className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200'>Browse Courses</Link></li>
                            <li><Link to="/my-learning" className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200'>My Learning</Link></li>
                            <li><Link to="/profile" className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200'>Profile</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className='font-bold text-sm uppercase tracking-widest text-white/60 mb-4'>Categories</h4>
                        <ul className='space-y-2.5'>
                            <li><span className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200 cursor-pointer'>Web Development</span></li>
                            <li><span className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200 cursor-pointer'>Data Science</span></li>
                            <li><span className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200 cursor-pointer'>Python</span></li>
                            <li><span className='text-[#94a3b8] text-sm hover:text-white transition-colors duration-200 cursor-pointer'>MERN Stack</span></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className='font-bold text-sm uppercase tracking-widest text-white/60 mb-4'>Contact</h4>
                        <ul className='space-y-3'>
                            <li className='flex items-center gap-2 text-[#94a3b8] text-sm'>
                                <Mail size={14} className='text-[#6366f1]' />
                                support@learnpulse.com
                            </li>
                            <li className='flex items-center gap-2 text-[#94a3b8] text-sm'>
                                <Phone size={14} className='text-[#6366f1]' />
                                +91 98765 43210
                            </li>
                            <li className='flex items-center gap-2 text-[#94a3b8] text-sm'>
                                <MapPin size={14} className='text-[#6366f1]' />
                                India
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className='border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4'>
                    <p className='text-[#64748b] text-sm'>
                        © {new Date().getFullYear()} LearnPulse. All rights reserved.
                    </p>
                    <div className='flex items-center gap-6'>
                        <span className='text-[#64748b] text-sm hover:text-white cursor-pointer transition-colors'>Privacy Policy</span>
                        <span className='text-[#64748b] text-sm hover:text-white cursor-pointer transition-colors'>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
