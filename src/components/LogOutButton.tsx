
'use client'

import { useSession,signIn,signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { CiLogout } from 'react-icons/ci'
import { IoShield } from 'react-icons/io5'


const onLogout = () => {
    //update()
    signOut()
    // redirect('/api/auth/signin')
}
const onLogin = () => {
    //update()
    signIn()
    // redirect('/api/auth/signin')
}

export const LogOutButton = () => {

    const { data: session, status } = useSession()

    if (status === 'loading') {
        return (
            <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShield />
                <span className="group-hover:text-gray-700">Espere...</span>
            </button>
        )
    }
    if (status === 'unauthenticated') {
        return (
            <button onClick={onLogin} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <IoShield />
                <span className="group-hover:text-gray-700">Ingresar</span>
            </button>
        )
    }


    return (

        <button onClick={onLogout} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
            <CiLogout />
            <span className="group-hover:text-gray-700">Logout</span>
        </button>

    )
}
