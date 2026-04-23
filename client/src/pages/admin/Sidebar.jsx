import { Link, Outlet, useLocation } from 'react-router-dom'
import React from 'react'
import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'

function Sidebar() {
    const location = useLocation();
    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className='flex'>
            <div className='hidden lg:block w-[260px] space-y-2 border-r border-border/50 p-6 sticky top-16 h-[calc(100vh-4rem)] bg-card/50'>
                <p className='text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3'>Admin Panel</p>
                <Link 
                    to="dashboard" 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('dashboard') 
                            ? 'bg-primary/10 text-primary shadow-sm' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                >
                    <ChartNoAxesColumn size={18} />
                    <span>Dashboard</span>
                </Link>
                <Link 
                    to="course" 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive('course') 
                            ? 'bg-primary/10 text-primary shadow-sm' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                >
                    <SquareLibrary size={18} />
                    <span>Courses</span>
                </Link>
            </div>
            <div className='flex-1 p-8 max-w-6xl'>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar
