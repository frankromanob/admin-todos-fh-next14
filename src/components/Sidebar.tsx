import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "@/components"
import { FaListCheck } from "react-icons/fa6";
import { MdOutlineCategory, MdOutlineListAlt } from "react-icons/md";
import { IoBasketOutline, IoCodeWorkingOutline, IoPersonCircleOutline } from "react-icons/io5";
import { auth } from "@/app/auth";
import { LogOutButton } from "./LogOutButton";


const menuItem = [
  {
    icon: <MdOutlineCategory />,
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    icon: <FaListCheck />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos'
  },
  {
    icon: <MdOutlineListAlt />,
    title: 'Server Actions',
    path: '/dashboard/server-todos'
  },
  {
    icon: <IoCodeWorkingOutline />,
    title: 'Cookies',
    path: '/dashboard/cookies'
  },
  {
    icon: <IoBasketOutline />,
    title: 'Products',
    path: '/dashboard/products'
  },
  {
    icon: <IoPersonCircleOutline />,
    title: 'Perfil',
    path: '/dashboard/profile'
  },
]



export const SideBar = async () => {
  const session = await auth()

  // if (!session) {
  //   redirect('/api/auth/signin')
  // }


  const userName = session?.user?.name ?? 'No Name'
  const userAvatarUrl = session?.user?.picture ?? "https://tailus.io/sources/blocks/leadership/preview/images/woman1.jpg"
  const userRole = session?.user?.roles



  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image width={50} height={50} src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" priority={true} className="w-32" alt="tailus logo" />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image width={50} height={50} src={userAvatarUrl} priority={true} alt="Admin" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block">{userRole?.join(', ')}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {
            menuItem.map(item => (
              <SidebarItem key={item.path} title={item.title} path={item.path} icon={item.icon} />
            ))
          }

        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogOutButton />
      </div>
      {/* <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div> */}
    </aside>

  );
}