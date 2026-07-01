import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
const WaiterLayout = ({ children }) => {
    return (
        <AuthenticatedLayout>
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </AuthenticatedLayout>
    );
};

export default WaiterLayout;
