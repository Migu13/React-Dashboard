import SideNav from "../ui/dashboard/sidenav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gradient-to-br from-white via-white to-white">
            <div className="w-full flex-none md:w-64 border-r border-indigo-100 shadow-xl z-10">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    )
}