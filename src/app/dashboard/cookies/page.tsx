import { cookies } from "next/headers";


import { TabBar } from "@/components/TabBar";

export const metadata = {
    title: 'Cookies Page',
    description: 'FH Next 14 Course project',
}


export default function CookiesPage() {

    const cookieStore = cookies()

    const cookieTab = cookieStore.get('selectedTab')?.value ?? 1


    return (
        <>
            <span className="text-xl">Tabs</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TabBar currentTab={Number(cookieTab)} />
            </div>
        </>
    );
}