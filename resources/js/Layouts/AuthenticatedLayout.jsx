import Navbar from "@/Components/layout/Navbar";
import Sidebar from "@/Components/layout/Sidebar";
import { Toaster } from "@/Components/ui/sonner";
import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AOS from "aos";
import "aos/dist/aos.css";
export default function AuthenticatedLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }, []);

    const user = usePage().props.auth.user;
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="h-screen flex overflow-hidden">
            <Sidebar
                authUser={user}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            />
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    collapsed ? "lg:ml-20" : "lg:ml-64"
                }`}
            >
                <Navbar
                    authUser={user}
                    onToggleSidebar={() => setSidebarOpen(true)}
                />
                {children}
                <Toaster richColors position="top-right" />
            </div>
        </div>
    );
}
