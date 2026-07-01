import Styles from "@/constants/Styles";
import { Menu, Bell, User, LogOut, Settings } from "lucide-react";
import Dropdown from "../Dropdown";
import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";

const Navbar = ({ authUser, onToggleSidebar }) => {
    const handleLogout = () => {
        if (typeof route !== "undefined") {
            router.post(route("logout"));
        } else {
            router.post("/logout");
        }
    };

    return (
        <nav
            className={`w-full h-[72px] border-b ${Styles.border}
     ${Styles.pageLayout} flex items-center justify-between px-4`}
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={onToggleSidebar}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-lg font-bold capitalize">
                    HMS - {authUser.role}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <Bell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
                </button>
                <Dropdown>
                    <Dropdown.Trigger>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <Button
                                aria-label="User Menu"
                                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-50"
                            >
                                <User size={18} />
                            </Button>
                        </div>
                    </Dropdown.Trigger>

                    <Dropdown.Content
                        align="right"
                        width="48"
                        contentClasses="bg-gray-800 py-2"
                    >
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                            <Settings size={18} />
                            Settings
                        </button>

                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700">
                            <User size={18} />
                            Profile
                        </button>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
