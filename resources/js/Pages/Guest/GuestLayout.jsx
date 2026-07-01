import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

const GuestLayout = ({ children }) => {
    return (
        <AuthenticatedLayout>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </AuthenticatedLayout>
    );
};

export default GuestLayout;
