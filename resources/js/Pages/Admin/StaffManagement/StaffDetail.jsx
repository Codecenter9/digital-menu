import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Styles from "@/constants/Styles";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import DangerButton from "@/Components/DangerButton";
import { SpinnerCustom } from "@/Components/ui/spinner";
const StaffDetail = ({ selectedStaff, setViewDetail }) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!selectedStaff?.id) return;

        setIsDeleting(true);

        router.delete(
            route("staff.delete", selectedStaff?.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsDeleting(false);
                    toast.success("Status updated successfully");
                },
                onError: () => {
                    setIsDeleting(false);
                    toast.error("Failed to update status");
                },
            },
        );
    };
    return (
        <div>
            <Head title={selectedStaff.name} />
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 w-full">
                    <Button
                        onClick={() => setViewDetail(false)}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <PageTitle
                        title={selectedStaff.name}
                        description="Manage your staff members and their roles."
                        isDetail="true"
                    />
                </div>
                <Button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-300">
                    25 june 2026
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="h-max flex flex-col items-center gap-3 px-3 py-8 rounded-md border border-gray-300">
                    <div className="w-full flex items-center justify-between gap-1">
                        <hr className="flex-1 border-gray-300" />
                        {selectedStaff?.gender === "female" ? (
                            <img
                                src="/staticFiles/profile-female.webp"
                                alt="Profile"
                                className="w-28 h-28 object-cover"
                            />
                        ) : (
                            <img
                                src="/staticFiles/profile-male.webp"
                                alt="Profile"
                                className="w-28 h-28 object-cover"
                            />
                        )}
                        <hr className="flex-1 border-gray-300" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Position
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedStaff?.role || "Not Provided"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Phone
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedStaff?.phone || "Not Provided"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Email
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedStaff?.email || "Not Provided"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Gender
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                                {selectedStaff?.gender || "Not Provided"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Status
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedStaff?.status ? "Active" : "InActive"}
                            </span>
                        </div>
                        <DangerButton
                            onClick={() => {
                                setOpenDeleteModal(true);
                            }}
                            className="flex items-center justify-center"
                        >
                            Delete Staff Premanently
                        </DangerButton>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5 col-span-2 px-3 h-max py-8 rounded-md border border-gray-300">
                    <div className="w-full flex items-center justify-center mb-5">
                        <span className="text-lg font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                            Work History
                        </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                        <div className="relative bg-gray-50 rounded-md border border-gray-300 flex flex-col items-center gap-2 p-3">
                            <span className="absolute mx-auto -top-3 h-6 w-6 text-sm rounded-full flex items-center justify-center bg-gray-100 text-amber-900">
                                1
                            </span>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Order Id
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    0001
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Price
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    350
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Customer
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    John
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Status
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    Paid
                                </span>
                            </div>
                            <Button className={`${Styles.button} w-full mt-3`}>
                                View Order Detail
                            </Button>
                        </div>
                        <div className="relative bg-gray-50 rounded-md border border-gray-300 flex flex-col items-center gap-2 p-3">
                            <span className="absolute mx-auto -top-3 h-6 w-6 text-sm rounded-full flex items-center justify-center bg-gray-100 text-amber-900">
                                1
                            </span>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Order Id
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    0001
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Price
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    350
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Customer
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    John
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Status
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    Paid
                                </span>
                            </div>
                            <Button className={`${Styles.button} w-full mt-3`}>
                                View Order Detail
                            </Button>
                        </div>
                        <div className="relative bg-gray-50 rounded-md border border-gray-300 flex flex-col items-center gap-2 p-3">
                            <span className="absolute mx-auto -top-3 h-6 w-6 text-sm rounded-full flex items-center justify-center bg-gray-100 text-amber-900">
                                1
                            </span>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Order Id
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    0001
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Price
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    350
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Customer
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    John
                                </span>
                            </div>
                            <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                <span className="text-sm font-medium text-gray-500">
                                    Status
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    Paid
                                </span>
                            </div>
                            <Button className={`${Styles.button} w-full mt-3`}>
                                View Order Detail
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* delete dialog box */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete staff</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to permanently delete this member?
                        This action cannot be undone.
                    </p>

                    <DialogFooter className="flex flex-row items-center justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setOpenDeleteModal(false)}
                        >
                            Cancel
                        </Button>

                        <DangerButton
                            disabled={isDeleting}
                            onClick={handleDelete}
                        >
                            {isDeleting ? (
                                <div className="flex items-center gap-1">
                                    <SpinnerCustom /> <span>Deleting...</span>
                                </div>
                            ) : (
                                "Delete Staff"
                            )}
                        </DangerButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default StaffDetail;
