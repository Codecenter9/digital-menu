import React from "react";

const GuestLayout = ({ children }) => {
    return (
        <div className="bg-black flex min-h-screen overflow-hidden">
            {/* Left Side */}
            <div
                className="hidden lg:flex relative w-1/2 items-center justify-center bg-cover bg-center"
                style={{
                    backgroundImage: "url('/staticFiles/placeholder.webp')",
                }}
            >
                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 text-end px-10">
                    <h1 className="text-5xl font-mono italic text-white">
                        Integrated
                    </h1>

                    <h2 className="mt-2 text-2xl font-serif text-amber-400">
                        Digital Menu
                    </h2>

                    <p className="text-sm mt-6 max-w-sm text-gray-300">
                        Smart restaurant management with digital menus, orders,
                        inventory, analytics, and more.
                    </p>
                </div>
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;
