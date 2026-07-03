import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
const Preloader = ({ children }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.on("start", () => setLoading(true));

        router.on("finish", () => {
            setTimeout(() => setLoading(false), 300);
        });
    }, []);
    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
                    <div className="relative w-24 h-24">
                        {/* Amber */}
                        <div className="absolute inset-0 animate-cross-clockwise">
                            <div className="absolute left-1/2 top-1/2 h-20 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500"></div>
                            <div className="absolute left-1/2 top-1/2 h-2 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500"></div>
                        </div>

                        {/* Blue */}
                        <div className="absolute inset-0 rotate-45 animate-cross-counter">
                            <div className="absolute left-1/2 top-1/2 h-20 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"></div>
                            <div className="absolute left-1/2 top-1/2 h-2 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500"></div>
                        </div>
                    </div>
                </div>
            )}

            {children}
        </>
    );
};

export default Preloader;
