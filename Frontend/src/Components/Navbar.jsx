import React, { useState, useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const { user, logout } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <img src={assets.logo} className='w-36' alt="" />
            <ul className='hidden sm:flex gap-6 text-sm text-gray-800 ' >
                <NavLink to={'/'} className='flex flex-col items-center gap-1'>
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden'></hr>
                </NavLink>
                <NavLink to={'/About'} className='flex flex-col items-center gap-1'>
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden'></hr>
                </NavLink>
                <NavLink to={'/Collection'} className='flex flex-col items-center gap-1'>
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden'></hr>
                </NavLink>
                <NavLink to={'/Contact'} className='flex flex-col items-center gap-1'>
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-800 hidden'></hr>
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img src={assets.search_icon} className='w-5 cursor-pointer' alt='' />
                {user ? (
                    <div className='group relative'>
                        <img className='w-5 cursor-pointer' src={assets.profile_icon} alt='' />
                        <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-slate-500 rounded'>
                                <NavLink to='/profile' className='cursor-pointer hover:text-black'>My Profile</NavLink>
                                <NavLink to='/orders' className='cursor-pointer hover:text-black'>Orders</NavLink>
                                <p onClick={handleLogout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <NavLink to='/signin' className='bg-gray-800 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-900 transition'>
                        Login
                    </NavLink>
                )}
                <NavLink to='/Cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt='' />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gray-900 aspect-square text-white rounded-full text-[8px]'>10</p>
                </NavLink>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' />
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt='' />
                        <p>Back</p>
                    </div>

                    <NavLink  onClick={()=>setVisible(false)}className='py-2 pl-6 border ' to='/Home'>HOME </NavLink>
                    <NavLink onClick={()=>setVisible(false)}   className='py-2 pl-6 border ' to='/About'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/Collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/Contact'>CONTACT</NavLink>
                    {user ? (
                        <>
                            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/profile'>MY PROFILE</NavLink>
                            <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/orders'>ORDERS</NavLink>
                            <p onClick={() => {
                                handleLogout()
                                setVisible(false)
                            }} className='py-2 pl-6 border cursor-pointer text-gray-600 hover:text-black'>LOGOUT</p>
                        </>
                    ) : (
                        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border ' to='/signin'>LOGIN</NavLink>
                    )}

                </div>
            </div>
        </div>
    )
}
export default Navbar