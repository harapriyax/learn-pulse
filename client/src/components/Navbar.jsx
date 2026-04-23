import React from 'react'
import Logo from './Logo'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import DarkMode from '../DarkMode'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../features/api/authApi'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User log out.")
      navigate("/login")
    }
  }, [isSuccess])

  return (
    <div className='h-16 glass border-b border-border/50 fixed top-0 left-0 right-0 z-50 transition-all duration-300'>
      <div className='max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-6'>
        <Link to="/" className='flex items-center gap-2.5 group'>
          <div className='h-9 w-9 rounded-xl gradient-bg flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300'>
            <Logo size={22} />
          </div>
          <h1 className='font-extrabold text-xl tracking-tight'>
            <span className='gradient-text'>LearnPulse</span>
          </h1>
        </Link>

        {/* User icon and darkmode icon */}
        <div className='flex items-center gap-4'>
          {
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="relative h-9 w-9 rounded-full ring-2 ring-primary/20 hover:ring-primary/50 transition-all duration-300 cursor-pointer focus:outline-none">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} alt={user?.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">{user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[100] bg-card border-border shadow-xl" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="my-learning">
                        My Learning
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="profile">
                        Edit Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler} className="cursor-pointer text-destructive focus:text-destructive">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {
                    user?.role === "instructor" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="cursor-pointer">
                          <Link to="admin/dashboard">
                            Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )
                  }
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center gap-3'>
                <Button variant="ghost" onClick={() => navigate("/login")} className="font-medium">Login</Button>
                <Button onClick={() => navigate("/login")} className="gradient-bg text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 font-medium">Get Started</Button>
              </div>
            )
          }
          <DarkMode />
        </div>
      </div>

      {/* Mobile Device */}
      <div className='flex md:hidden items-center justify-between px-4 h-full'>
        <Link to="/" className='flex items-center gap-2'>
          <div className='h-8 w-8 rounded-lg gradient-bg flex items-center justify-center'>
            <Logo size={18} />
          </div>
          <h1 className='font-extrabold text-lg gradient-text'>LearnPulse</h1>
        </Link>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  )
}

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon' className="rounded-full" variant="outline">
          <FaBars />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col glass">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/" className='gradient-text font-extrabold text-lg'>LearnPulse</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>

        <nav className='flex flex-col space-y-4 mt-6'>
          <Link to="/my-learning" className="text-sm font-medium hover:text-primary transition-colors">My Learning</Link>
          <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">Edit Profile</Link>
          {user && (
            <p onClick={logoutHandler} className="text-sm font-medium text-destructive cursor-pointer hover:underline">Log out</p>
          )}
        </nav>
        {
          user?.role === "instructor" && (
            <SheetFooter className="mt-auto">
              <SheetClose asChild>
                <Button className="gradient-bg text-white border-0 w-full" onClick={() => navigate("/admin/dashboard")}>Dashboard</Button>
              </SheetClose>
            </SheetFooter>
          )
        }
      </SheetContent>
    </Sheet>
  )
}