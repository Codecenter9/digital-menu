import React, { useState } from "react";
import AdminLayout from "../../AdminLayout";
import { Head, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { Pencil, Plus, Trash, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import CategoryDetail from "./CategoryDetail";

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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from "./CategoryForm";
import { toast } from "sonner";
import { SpinnerCustom } from "@/Components/ui/spinner";
import DangerButton from "@/Components/DangerButton";

const MenuCategory = ({ categories, menuItems }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [viewDetail, setViewDetail] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!selectedCategory?.id) return;

        setIsDeleting(true);

        router.delete(route("menu-categories.delete", selectedCategory.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDeleteModal(false);
                setSelectedCategory(null);
                toast.success("Category removed successfully");
            },
            onError: () => {
                toast.error("Failed to remove category");
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const columns = [
        {
            id: "number",
            header: "#",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <span>{row.index + 1}</span>

                    <img
                        src="/staticFiles/food-icon.webp"
                        alt="Profile"
                        className="w-6 h-6 rounded-full object-cover"
                    />
                </div>
            ),
        },
        {
            accessorKey: "categoryName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Category
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "categoryType",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Type
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            id: "actions",
            cell: ({ row }) => {
                const category = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                onClick={(e) => e.stopPropagation()}
                                variant="ghost"
                                className="h-8 w-8 p-0 bg-gray-100"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            onClick={(e) => e.stopPropagation()}
                            align="end"
                            className="w-32  px-0"
                        >
                            <DropdownMenuItem
                                className="text-blue-500 "
                                onClick={() => {
                                    setIsEdit(true);
                                    setSelectedCategory(category);
                                    setOpenFormModal(true);
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="border border-gray-700" />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenDeleteModal(true);
                                }}
                                className="text-red-600 hover:bg-gray-800 cursor-pointer w-full rounded-none"
                            >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const data = categories.map((category) => ({
        id: category.id,
        categoryName: category.category_name,
        categoryType: category.is_drink,
    }));

    return (
        <AdminLayout>
            {viewDetail ? (
                <CategoryDetail
                    selectedCategory={selectedCategory}
                    setViewDetail={setViewDetail}
                    menuItems={menuItems}
                />
            ) : (
                <>
                    <Head title="Menu Category" />
                    <PageTitle
                        title="Menu Category Management"
                        description="Manage your menu categories."
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                        <div className="flex flex-col col-span-2 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                            <div className="flex items-center justify-between gap-3">
                                <TextInput
                                    placeholder="Search..."
                                    className={`${Styles.input} w-2/3`}
                                />

                                <Button
                                    className={Styles.button}
                                    onClick={() => {
                                        setIsEdit(false);
                                        setSelectedCategory(null);
                                        setOpenFormModal(true);
                                    }}
                                >
                                    <Plus size={18} />
                                    <span>Add Category</span>
                                </Button>
                            </div>

                            <DataTable
                                columns={columns}
                                data={data}
                                isSelect={false}
                                onSelectRow={setSelectedCategory}
                                selectedRowId={selectedCategory?.id}
                            />
                        </div>

                        <div className="flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                            <span className="text-base rounded-md font-bold text-gray-100 bg-gray-800 px-3 py-1 text-center">
                                {selectedCategory?.categoryName || "Not Set"}
                            </span>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                    <span className="text-sm font-medium text-gray-500">
                                        Category
                                    </span>
                                    <span className="text-sm font-semibold text-green-800">
                                        {selectedCategory?.categoryName ||
                                            "Not Set"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                    <span className="text-sm font-medium text-gray-500">
                                        Type
                                    </span>
                                    <span className="text-sm font-semibold text-green-800">
                                        {selectedCategory?.categoryType
                                            ? "Drink"
                                            : "Meal"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                                    <span className="text-sm font-medium text-gray-500">
                                        Total Items
                                    </span>
                                    <span className="text-sm font-semibold text-green-800">
                                        {
                                            menuItems?.filter(
                                                (item) =>
                                                    item?.category_id ===
                                                    selectedCategory?.id,
                                            ).length
                                        }{" "}
                                        items
                                    </span>
                                </div>
                                <hr className="text-gray-300 mt-3" />
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        setViewDetail(
                                            selectedCategory.categoryName,
                                        )
                                    }
                                    disabled={!selectedCategory}
                                    className={`${Styles.button}`}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* modals section */}

            <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Edit Category" : "Create Category"}
                        </DialogTitle>
                    </DialogHeader>

                    <CategoryForm
                        isEdit={isEdit}
                        category={selectedCategory}
                        setOpenFormModal={setOpenFormModal}
                    />
                </DialogContent>
            </Dialog>

            {/* delete dialog box */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete category</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to permanently delete this
                        category? This action cannot be undone.
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
                                "Delete Category"
                            )}
                        </DangerButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default MenuCategory;
