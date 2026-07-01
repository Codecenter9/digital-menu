import { useState, useEffect } from "react";
import {
    User,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import Styles from "@/constants/Styles";
import SidebarLinks from "@/constants/SidebarLinks";
import TextInput from "../TextInput";

const Sidebar = ({ authUser, isOpen, setIsOpen, collapsed, setCollapsed }) => {
    const [openMenu, setOpenMenu] = useState(null);

    const { url } = usePage();

    const menus = SidebarLinks?.[authUser?.role] ?? [];

    const isActive = (path) => {
        if (path === "/") {
            return url === "/";
        }

        return url.startsWith(path);
    };

    useEffect(() => {
        menus.forEach((menu, index) => {
            if (menu.submenu?.some((sub) => url.startsWith(sub.path))) {
                setOpenMenu(index);
            }
        });
    }, [url]);

    const toggleMenu = (index) => {
        setOpenMenu((prev) => (prev === index ? null : index));
    };

    const handleLinkClick = () => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-screen bg-gray-900
                    ${Styles.pageLayout}
                    border-r border-gray-300 
                    z-50 flex flex-col
                    transition-all duration-300 ease-in-out
                    ${collapsed ? "w-20" : "w-64"}
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className="h-[72px] flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                            <User size={18} className="text-gray-300"/>
                        </div>

                        {!collapsed && (
                            <div className="truncate">
                                <h3 className="text-sm font-bold text-gray-300 capitalize font-serif truncate">
                                    {authUser?.name}
                                </h3>

                                <p className="text-xs text-gray-400 font-serif capitalize">
                                    {authUser?.role} Account
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        aria-label={
                            collapsed ? "Expand Sidebar" : "Collapse Sidebar"
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 transition"
                    >
                        {collapsed ? (
                            <ChevronRight size={18} />
                        ) : (
                            <ChevronLeft size={18} />
                        )}
                    </button>
                </div>

                {!collapsed && (
                    <div className="m-4 pb-3 border-b border-gray-700">
                        <TextInput
                            placeholder="Search..."
                            className="w-full rounded-md bg-gray-700 border border-gray-600 text-sm text-gray-100 focus:ring-0 focus:border-emerald-500"
                        />
                    </div>
                )}

                <div className="flex-1 overflow-y-auto scrollbar-hide p-2 space-y-1">
                    {menus.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div key={item.title}>
                                {!item.submenu ? (
                                    <Link
                                        href={item.path}
                                        prefetch
                                        onClick={handleLinkClick}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 font-serif
                                            ${
                                                isActive(item.path)
                                                    ? "bg-emerald-900/10 text-emerald-500"
                                                    : "text-gray-300 hover:bg-emerald-900/10 hover:text-emerald-400"
                                            }`}
                                    >
                                        {Icon && (
                                            <Icon
                                                size={18}
                                                className="shrink-0"
                                            />
                                        )}

                                        {!collapsed && (
                                            <span>{item.title}</span>
                                        )}
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            aria-expanded={openMenu === index}
                                            onClick={() => toggleMenu(index)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition
                                                ${
                                                    openMenu === index
                                                        ? "bg-gray-900/10 text-emerald-400 "
                                                        : "hover:bg-emerald-900/10 hover:text-emerald-400 text-gray-300"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {Icon && <Icon size={18} />}

                                                {!collapsed && (
                                                    <span>{item.title}</span>
                                                )}
                                            </div>

                                            {!collapsed &&
                                                (openMenu === index ? (
                                                    <ChevronUp size={14} />
                                                ) : (
                                                    <ChevronDown size={14} />
                                                ))}
                                        </button>

                                        {!collapsed && openMenu === index && (
                                            <div className="ml-6 mt-1 space-y-1">
                                                {item.submenu.map((sub) => (
                                                    <Link
                                                        key={sub.title}
                                                        href={sub.path}
                                                        prefetch
                                                        onClick={
                                                            handleLinkClick
                                                        }
                                                        className={`block px-3 py-1.5 rounded text-sm transition
                                                                    ${
                                                                        isActive(
                                                                            sub.path,
                                                                        )
                                                                            ? "bg-emerald-500/15 text-emerald-400"
                                                                            : "text-gray-300 hover:bg-emerald-900/10 hover:text-emerald-400"
                                                                    }`}
                                                    >
                                                        {sub.title}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div  className={` bg-gray-900/10 border-t border-gray-700 p-5`}
>
                    <p className="flex items-center justify-center gap-2 text-gray-400 text-left">
                        <span className="text-base">&copy;</span>
                        {!collapsed && (
                            <span className="text-xs">
                                {new Date().getFullYear()} Digital Menu
                            </span>
                        )}
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
