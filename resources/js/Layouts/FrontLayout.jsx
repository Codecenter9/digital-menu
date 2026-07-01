import React, { useEffect } from "react";
import Footer from "@/Components/frontend/layout/Footer";
import Navbar from "@/Components/frontend/layout/Navbar";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import AOS from "aos";
import "aos/dist/aos.css";

const FrontLayout = ({ children }) => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }, []);

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
        <>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
            <Toaster richColors position="top-right" />
        </>
    );
};

export default FrontLayout;
