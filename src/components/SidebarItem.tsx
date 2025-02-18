'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    icon: React.ReactNode;
    title: string;
    path: string;
}
export const SidebarItem = ({ title, path, icon }: Props) => {
    const pathName = usePathname()
    {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */ }
    return (
        <li>
            <Link href={path} className=
                {`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group
                hover: bg-gradient-to-r hover:from-sky-600 hover:to-cyan-400 hover:bg-sky-600 hover:text-white
                ${path === pathName ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400' : ''}
                `}
            >
                {icon}
                <span className="-mr-1 font-medium">{title}</span>
            </Link>
        </li>
    );
}