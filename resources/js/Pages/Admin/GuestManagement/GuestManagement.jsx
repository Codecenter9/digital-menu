import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import { Head } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { Plus } from "lucide-react";
import { DataTable } from "@/Components/ui/data-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
const GuestManagement = () => {
    const [selectedGuest, setSelectedGuest] = useState(null);

    const columns = [
        {
            id: "number",
            header: "#",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span>{row.index + 1}</span>

                    <img
                        src="/staticFiles/person.webp"
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover"
                    />
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "position",
            header: "Position",
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            accessorKey: "amount",
            header: "Amount",
        },
    ];

    const data = [
        {
            name: "John Doe",
            position: "Manager",
            email: "john.doe@example.com",
            amount: 5000,
        },
        {
            name: "Jane Smith",
            position: "Employee",
            email: "jane.smith@example.com",
            amount: 4500,
        },
        {
            name: "Bob Johnson",
            position: "Employee",
            email: "bob.johnson@example.com",
            amount: 4000,
        },
    ];

    return (
        <AdminLayout>
            <Head title="Guest" />
            <PageTitle
                title="Guest Management"
                description="Manage your guest members and their roles."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <div className="flex flex-col col-span-2 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                    <div className="flex items-center justify-between gap-3">
                        <TextInput
                            placeholder="Search..."
                            className={`${Styles.input} w-2/3`}
                        />

                        <Button className={`${Styles.button} `}>
                            <Plus size={18} />
                            <span>Add Guest</span>
                        </Button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        isSelect={false}
                        onSelectRow={setSelectedGuest}
                        selectedRowId={selectedGuest?.id}
                    />
                </div>

                <div className="flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                    <span className="text-base rounded-md font-bold text-gray-100 bg-gray-800 px-3 py-1 text-center">
                        {selectedGuest?.name || "John Doe"}
                    </span>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Position
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedGuest?.position || "Guest"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Phone
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedGuest?.phone || "(555) 123-4567"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Email
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedGuest?.email || "john.doe@example.com"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Status
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedGuest?.status || "Active"}
                            </span>
                        </div>
                        <hr className="text-gray-300 mt-3" />
                        <Button
                            variant="outline"
                            className={`${Styles.button}`}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default GuestManagement;
