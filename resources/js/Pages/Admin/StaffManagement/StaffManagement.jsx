import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import { Head, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import {
    Plus,
    UserIcon,
    ArrowUpDown,
    MoreHorizontal,
    Pencil,
    Trash,
    RefreshCcw,
} from "lucide-react";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import StaffDetail from "./StaffDetail";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import StaffForm from "./StaffForm";
import { toast } from "sonner";
import { SpinnerCustom } from "@/Components/ui/spinner";
const StaffManagement = ({ staffMembers }) => {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [viewDetail, setViewDetail] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);

    const handleUpdateStatus = (id) => {
        if (!id) return;

        setUpdatingStatusId(id);

        router.patch(
            route("staff.status-update", id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setUpdatingStatusId(null);
                    toast.success("Status updated successfully");
                },
                onError: () => {
                    setUpdatingStatusId(null);
                    toast.error("Failed to update status");
                },
            },
        );
    };

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
                        className="w-6 h-6 hidden lg:flex rounded-full object-cover"
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
            accessorKey: "username",
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
            accessorKey: "phone",
            header: "Phone",
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                onClick={(e) => e.stopPropagation()}
                                variant="ghost"
                                className="h-8 w-8 p-0 bg-gray-100"
                            >
                                {updatingStatusId === user?.id ? (
                                    <SpinnerCustom />
                                ) : (
                                    <MoreHorizontal className="h-4 w-4" />
                                )}
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-32 px-0">
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedStaff(user);
                                    setIsEdit(true);
                                    setOpenFormModal(true);
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() => handleUpdateStatus(user.id)}
                                className={`${user?.status ? "text-red-500" : "text-blue-500"}`}
                            >
                                {user?.status ? (
                                    <>
                                        <Trash className="mr-2 h-4 w-4" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <RefreshCcw className="mr-2 h-4 w-4" />
                                        Activate
                                    </>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const data = staffMembers.map((staffMember) => ({
        id: staffMember.id,
        name: staffMember.name,
        username: staffMember.username,
        phone: staffMember?.phone || "Not Provided",
        role: staffMember?.role,
        image: staffMember?.profile_photo_path,
        status: staffMember?.is_active,
    }));
    return (
        <AdminLayout>
            {viewDetail ? (
                <StaffDetail
                    selectedStaff={selectedStaff}
                    setViewDetail={setViewDetail}
                />
            ) : (
                <>
                    <Head title="Staff" />
                    <PageTitle
                        title="Staff Management"
                        description="Manage your staff members and their roles."
                    />
                    <div className="body-content flex flex-col gap-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-5 rounded-xl border bg-white shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Male Members
                                    </h3>
                                    <UserIcon className="w-5 h-5 text-blue-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">20</h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total registered males
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border bg-white shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Female Members
                                    </h3>
                                    <UserIcon className="w-5 h-5 text-orange-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">30</h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total registered females
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border bg-white shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Active Members
                                    </h3>
                                    <UserIcon className="w-5 h-5 text-blue-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">25</h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Currently active members
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 rounded-xl border bg-white shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Retired Members
                                    </h3>
                                    <UserIcon className="w-5 h-5 text-orange-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">15</h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Members no longer active
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                            <div className="flex flex-col col-span-2 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                                <div className="flex items-center justify-between gap-3">
                                    <TextInput
                                        placeholder="Search..."
                                        className={`${Styles.input} w-2/3`}
                                    />

                                    <Button
                                        onClick={() => {
                                            setIsEdit(false);
                                            setSelectedStaff(null);
                                            setOpenFormModal(true);
                                        }}
                                        className={`${Styles.button} `}
                                    >
                                        <Plus size={18} />
                                        <span>Add Staff</span>
                                    </Button>
                                </div>

                                <DataTable
                                    columns={columns}
                                    data={data}
                                    isSelect={false}
                                    onSelectRow={setSelectedStaff}
                                    selectedRowId={selectedStaff?.id}
                                />
                            </div>

                            <div className="flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                                <span className="text-base rounded-md font-bold text-gray-100 bg-gray-800 px-3 py-1 text-center">
                                    {selectedStaff?.name || "John Doe"}
                                </span>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                        <span className="text-sm font-medium text-gray-500">
                                            Position
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {selectedStaff?.role || "Guest"}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                        <span className="text-sm font-medium text-gray-500">
                                            Phone
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {selectedStaff?.phone ||
                                                "Not Provided"}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                        <span className="text-sm font-medium text-gray-500">
                                            Username
                                        </span>
                                        <span className="text-sm font-semibold text-gray-800">
                                            {selectedStaff?.username ||
                                                "Not Provided"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                        <span className="text-sm font-medium text-gray-500">
                                            Status
                                        </span>
                                        <span className="text-sm font-semibold text-green-800">
                                            {selectedStaff?.status
                                                ? "Active"
                                                : "InActive"}
                                        </span>
                                    </div>
                                    <hr className="text-gray-300 mt-3" />
                                    <Button
                                        variant="outline"
                                        disabled={!selectedStaff}
                                        className={`${Styles.button}`}
                                        onClick={() => setViewDetail(true)}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Edit User" : "Create User"}
                        </DialogTitle>
                    </DialogHeader>

                    <StaffForm
                        isEdit={isEdit}
                        selectedStaff={selectedStaff}
                        setOpenFormModal={setOpenFormModal}
                    />
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default StaffManagement;
