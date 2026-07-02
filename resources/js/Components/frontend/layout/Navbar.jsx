import React, { useEffect, useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    Menu,
    UtensilsCrossed,
    Info,
    LogOut,
    ShoppingCart,
    User,
    ShoppingBag,
} from "lucide-react";

import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Dropdown from "@/Components/Dropdown";
import { useCart } from "@/Context/CartContext";
import CartDrawer from "../ui/Menu/Cart";
import Profile from "../../common/Profile/Profile";

const Navbar = () => {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [cartOpen, setCartOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDialogBox, setOpenDialogBox] = useState(false);
    const { cart } = useCart();

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    const currentPath = window.location.pathname;

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const dashboardRoute = user
        ? user.role === "admin"
            ? route("admin.dashboard")
            : user.role === "waiter"
              ? route("waiter.dashboard")
              : route("guest.dashboard")
        : "#";

    const handleLogout = () => {
        if (typeof route !== "undefined") {
            router.post(route("logout"));
        } else {
            router.post("/logout");
        }
    };

    const navLinks = [
        { name: "About", href: "/about", icon: Info },
        { name: "Menu", href: "/menu", icon: UtensilsCrossed },
    ];

    return (
        <nav
            className={`fixed w-full px-6 lg:px-12 top-0 z-50 transition-all duration-300
            ${
                scrolled
                    ? "bg-gray-50/70  backdrop-blur-xl shadow-md"
                    : "bg-transparent border-none"
            }`}
        >
            {" "}
            <div className="container mx-auto flex h-20 items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <div className="flex flex-col">
                        <span
                            className={`text-2xl font-bold ${scrolled ? "text-gray-900" : "text-gray-300 "} leading-none`}
                        >
                            Restaurant
                        </span>
                        <span
                            className={`text-xs font-bold ${scrolled ? "text-gray-900 " : "text-gray-300 "} leading-none`}
                        >
                            Fresh & Delicious
                        </span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`rounded-md px-3 py-2 text-base ${scrolled ? "text-gray-900" : "text-gray-300"} font-medium transition-all duration-300 ${currentPath === link.href ? "text-amber-500" : "hover:text-amber-500"}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCartOpen(true)}
                        className={`relative hidden lg:flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
                            scrolled
                                ? "text-gray-900 hover:text-amber-500"
                                : "text-gray-300 hover:text-amber-500"
                        }`}
                    >
                        <ShoppingCart size={24} />

                        {cartCount > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1 text-[11px] font-semibold text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                {user?.role != "guest" ? (
                                    <Link
                                        href={dashboardRoute}
                                        className="rounded-md bg-gray-900 text-gray-300 px-4 py-2 text-sm transition-all duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <div className="flex rounded-full w-8 h-8  items-center cursor-pointer">
                                                    <img
                                                        src={
                                                            user?.image ||
                                                            "/staticFiles/person.webp"
                                                        }
                                                        alt="Profile"
                                                        className="object-cover cursor-pointer rounded-full"
                                                    />
                                                </div>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content
                                                align="right"
                                                width="48"
                                                contentClasses="bg-gray-800 py-2"
                                            >
                                                <Link
                                                    href={route(
                                                        "myorders",
                                                        user.id,
                                                    )}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                                                >
                                                    <ShoppingBag size={18} />
                                                    My Orders
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        setOpenDialogBox(true);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-100 hover:bg-gray-700"
                                                >
                                                    <User size={18} />
                                                    My Profile
                                                </button>
                                                <hr className="border border-gray-700" />

                                                <Link
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                                                >
                                                    <LogOut size={18} />
                                                    Logout
                                                </Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className={`text-sm font-medium ${scrolled ? "text-gray-900" : "text-gray-300"} hover:text-amber-500 border border-gray-700 px-4 py-2 rounded-md hover:border-amber-500 transition-all duration-300`}
                                >
                                    Login
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="rounded-md bg-amber-700 text-gray-100 px-4 py-2 text-sm transition-all duration-300"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <Drawer
                    direction="right"
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                >
                    <div className="flex items-center gap-5 md:hidden">
                        <button
                            onClick={() => setCartOpen(true)}
                            className={`relative items-center justify-center p-2 rounded-full transition-all duration-300 ${
                                scrolled
                                    ? "text-gray-900 hover:text-amber-500"
                                    : "text-gray-300 hover:text-amber-500"
                            }`}
                        >
                            <ShoppingCart size={24} />

                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-700 px-1 text-[11px] font-semibold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <DrawerTrigger asChild>
                            <button onClick={() => setMenuOpen(true)}>
                                <Menu
                                    className={`h-7 w-7 ${scrolled ? "text-gray-900 hover:text-gray-700" : "text-gray-300 hover:text-gray-100"} p-0 rounded-md transition-all duration-300`}
                                />
                            </button>
                        </DrawerTrigger>
                    </div>

                    <DrawerContent className="h-full max-w-xs ml-auto">
                        <DrawerHeader>
                            <DrawerTitle>Menu</DrawerTitle>
                        </DrawerHeader>

                        <div className="flex flex-col gap-1 py-3 px-4">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`flex items-center gap-3 rounded-none p-2 hover:bg-gray-200 transition-all duration-300 border-b border-gray-200 ${currentPath === link.href ? "bg-gray-200 text-gray-900" : "hover:bg-gray-200"}`}
                                    >
                                        {" "}
                                        <Icon className="h-5 w-5" />{" "}
                                        {link.name}{" "}
                                    </Link>
                                );
                            })}

                            <div className="pt-4">
                                {user ? (
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted">
                                            Welcome, {user.name}
                                        </p>

                                        {user?.role != "guest" ? (
                                            <Link
                                                href={dashboardRoute}
                                                className="block rounded-md bg-gray-900 hover:bg-gray-800 px-4 py-3 text-center text-gray-300 transition-all duration-300"
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <div className="w-full flex flex-col items-center gap-3">
                                                <div className="w-full flex flex-col gap-2 items-center">
                                                    <Link
                                                        href={route(
                                                            "myorders",
                                                            user.id,
                                                        )}
                                                        className={`w-full text-sm flex items-center gap-3 rounded-none p-2 ${currentPath === "my-orders" ? "bg-gray-200 text-gray-900" : "hover:bg-gray-200"} hover:bg-gray-200 transition-all duration-300 border-b border-gray-200 `}
                                                    >
                                                        <ShoppingCart className="h-5 w-5" />
                                                        My Orders
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            setMenuOpen(false);
                                                            setTimeout(() => {
                                                                setOpenDialogBox(
                                                                    true,
                                                                );
                                                            }, 250);
                                                        }}
                                                        className={`w-full text-sm flex items-center gap-3 rounded-none p-2 ${currentPath === "my-profile" ? "bg-gray-200 text-gray-900" : "hover:bg-gray-200"} hover:bg-gray-200 transition-all duration-300 border-b border-gray-200 `}
                                                    >
                                                        <User className="h-5 w-5" />
                                                        My Profile
                                                    </button>
                                                </div>
                                                <Link
                                                    onClick={handleLogout}
                                                    className="w-full block rounded-md bg-red-900 hover:bg-red-800 px-4 py-3 text-center text-gray-300 transition-all duration-300"
                                                >
                                                    Logout
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <Link
                                            href={route("login")}
                                            className="block rounded-md border border-gray-300 hover:bg-gray-200 px-4 py-2 text-center transition-all duration-300"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href={route("register")}
                                            className="block rounded-md bg-gray-900 hover:bg-gray-800 px-4 py-2 text-center text-gray-300 transition-all duration-300"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
            <CartDrawer open={cartOpen} setOpen={setCartOpen} />
            {/* dialog box */}
            <Dialog open={openDialogBox} onOpenChange={setOpenDialogBox}>
                <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <Profile user={user} setOpenDialogBox={setOpenDialogBox} />
                </DialogContent>
            </Dialog>
        </nav>
    );
};

export default Navbar;
