import React, { useState, useEffect } from "react";
import AdminLayout from "../../AdminLayout";
import { Head, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import {
    Check,
    MoreHorizontal,
    Plus,
    ArrowUpDown,
    Pencil,
    Trash,
} from "lucide-react";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
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
import MenuForm from "./MenuForm";
import { SpinnerCustom } from "@/Components/ui/spinner";
import { toast } from "sonner";
import DangerButton from "@/Components/DangerButton";

const MenuItems = ({ menuItems, categories, selectedMenuItem }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [openFormModal, setOpenFormModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (selectedMenuItem && menuItems?.length) {
            const found = menuItems.find(
                (item) => item.id === Number(selectedMenuItem),
            );

            if (found) {
                setSelectedItem({
                    id: found.id,
                    categoryId: found.category_id,
                    itemName: found.menu_item,
                    price: found.price,
                    description: found.description,
                    ingredients: found.ingredients,
                    categoryName: found.menu_category?.category_name,
                    itemType: found.menu_category?.is_drink ? "drink" : "meal",
                    image: found.image,
                    isAvailable: found.is_available,
                });
            }
        }
    }, [selectedMenuItem, menuItems]);

    const handleDelete = () => {
        if (!selectedItem?.id) return;

        setIsDeleting(true);

        router.delete(route("menu-items.delete", selectedItem.id), {
            preserveScroll: true,
            onSuccess: () => {
                setOpenDeleteModal(false);
                setSelectedItem(null);
                toast.success("Item removed successfully");
            },
            onError: () => {
                toast.error("Failed to remove item");
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
                        className="w-6 h-6 hidden lg:flex rounded-full object-cover"
                    />
                </div>
            ),
        },
        {
            accessorKey: "itemName",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Item
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
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
            accessorKey: "price",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "itemType",
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
                const menuItem = row.original;

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
                                    setSelectedItem(menuItem);
                                    setOpenFormModal(true);
                                }}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="border border-gray-700" />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedItem(menuItem);
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

    const data = menuItems.map((menuItem) => ({
        id: menuItem.id,
        categoryId: menuItem.category_id,
        itemName: menuItem.menu_item,
        price: menuItem.price,
        description: menuItem.description,
        ingredients: menuItem.ingredients,
        categoryName: menuItem.menu_category?.category_name,
        itemType: menuItem.menu_category?.is_drink ? "drink" : "meal",
        image: menuItem.image,
        isAvailable: menuItem.is_available,
    }));

    return (
        <AdminLayout>
            <Head title="Menu Items" />
            <PageTitle
                title="Menu Items Management"
                description="Manage your menu items."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
                <div className="flex flex-col col-span-2 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                    <div className="flex items-center justify-between gap-3">
                        <TextInput
                            placeholder="Search..."
                            className={`${Styles.input} w-2/3`}
                        />

                        <Button
                            className={`${Styles.button}`}
                            onClick={() => {
                                setIsEdit(false);
                                setSelectedItem(null);
                                setOpenFormModal(true);
                            }}
                        >
                            <Plus size={18} />
                            <span>Add Menu Item</span>
                        </Button>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        isSelect={false}
                        onSelectRow={setSelectedItem}
                        selectedRowId={selectedItem?.id}
                    />
                </div>

                <div className="flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                    <span className="text-base rounded-md font-bold text-gray-100 bg-gray-800 px-3 py-1 text-center">
                        {selectedItem?.itemName || "Not Selected"}
                    </span>
                    <div className="group overflow-hidden w-full rounded-md">
                        <img
                            src={
                                selectedItem?.image ||
                                "/staticFiles/placeholder.webp"
                            }
                            alt="Profile"
                            className="object-cover cursor-pointer h-[200px] w-full group-hover:scale-105 transition-all duration-300"
                        />
                    </div>
                    <div className="max-h-[300px] overflow-y-auto scrollbar-hide flex flex-col gap-2">
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Category
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedItem?.categoryName || "Not Selected"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Price
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedItem?.price || "Not Selected"}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-1 bg-gray-50">
                            <span className="text-sm font-medium text-gray-500">
                                Type
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedItem?.itemType}
                            </span>
                        </div>
                        <hr className="text-gray-300 mt-1" />
                        <div className="flex items-center flex-col gap-3 py-1">
                            <span className="text-sm font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                                Ingredients
                            </span>
                            <div className="grid grid-cols-2 gap-y-1 gap-x-3 w-full">
                                {selectedItem?.ingredients?.map(
                                    (ingredient, index) => (
                                        <span
                                            key={index}
                                            className="flex items-center gap-2 text-xs"
                                        >
                                            <Check
                                                size={15}
                                                className="text-green-400"
                                            />
                                            {ingredient}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                        <hr className="text-gray-300 mt-1" />
                        <div className="flex items-center flex-col gap-3 py-1">
                            <span className="text-sm font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                                Description
                            </span>
                            <span className="text-xs font-medium">
                                {selectedItem?.description}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* dialog box */}
            <Dialog open={openFormModal} onOpenChange={setOpenFormModal}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Edit Menu Item" : "Create Menu Item"}
                        </DialogTitle>
                    </DialogHeader>

                    <MenuForm
                        categories={categories}
                        isEdit={isEdit}
                        menuItem={selectedItem}
                        setOpenFormModal={setOpenFormModal}
                    />
                </DialogContent>
            </Dialog>

            {/* delete dialog box */}
            <Dialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Delete menu item</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-gray-600">
                        Are you sure you want to permanently delete this item?
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
                                "Delete Item"
                            )}
                        </DangerButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
};

export default MenuItems;
