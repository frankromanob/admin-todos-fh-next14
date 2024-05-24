'use client'
import { useSession } from 'next-auth/react'

export default function ProfilePage() {

    const { data: session } = useSession()
    if (!session) { return }

    //if (session) {
    console.log(JSON.stringify(session))
    const userName = session.user?.name ?? 'No Name'
    const userAvatarUrl = session.user?.picture ?? "No image"
    // const userRoles = session.user?.roles ?? ['No roles']
    const userId = session.user?.id ?? 'No UUID'
    const userEmail = session.user?.email ?? 'No Email'
    // }
    return (
        <div>
            <h1>Profile Page Client Side</h1>
            <hr />
            <div className='flex flex-col'>
                <span>{userName}</span>
                <span>{userEmail}</span>
                <span>{userAvatarUrl}</span>
                <span>{userId}</span>
                {/* <span>{userRoles}</span> */}
            </div>

        </div>
    );
}