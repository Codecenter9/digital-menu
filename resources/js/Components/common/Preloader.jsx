import { useEffect, useState } from "react";

const Preloader = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
                <div className="relative h-16 w-16">
                    <div className="absolute inset-0 rounded-full border-[5px] border-blue-500 border-r-transparent border-b-transparent animate-spin" />

                    <div
                        className="absolute inset-1 rounded-full border-[5px] border-amber-500 border-l-transparent border-t-transparent animate-spin"
                        style={{
                            animationDirection: "reverse",
                            animationDuration: "0.9s",
                        }}
                    />
                </div>
            </div>
        );
    }

    return children;
};

export default Preloader;
