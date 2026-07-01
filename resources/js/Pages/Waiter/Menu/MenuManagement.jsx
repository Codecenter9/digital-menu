import React, { useState } from "react";
import WaiterLayout from "../WaiterLayout";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ArrowUpDown,
    Check,
    MoreHorizontal,
    Pencil,
    Trash,
} from "lucide-react";
import { Head, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import TextInput from "@/Components/TextInput";
import { DataTable } from "@/Components/ui/data-table";
import Styles from "@/constants/Styles";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";
import { SpinnerCustom } from "@/Components/ui/spinner";
const MenuManagement = ({ menuItems }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [updatingStatusId, setUpdatingStatusId] = useState(null);

    const menuStatusStyles = {
        1: "bg-green-100 text-green-700",
        0: "bg-yellow-100 text-yellow-700",
    };

    const handleUpdateStatus = (id) => {
        if (!id) return;
        setUpdatingStatusId(id);
        router.patch(
            route("waiter.update-menu-item-status", id),
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
            id: "actions",
            header: "Status",
            cell: ({ row }) => {
                const menuItem = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                                    menuStatusStyles[menuItem.isAvailable]
                                }`}
                            >
                                {updatingStatusId === menuItem?.id ? (
                                    <SpinnerCustom />
                                ) : (
                                    <div>
                                        {Number(menuItem?.isAvailable) === 1 ? (
                                            <>Available</>
                                        ) : (
                                            <>UnAvailable</>
                                        )}
                                    </div>
                                )}
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            onClick={(e) => e.stopPropagation()}
                            align="end"
                            className={`rounded-md py-1 ${
                                menuItem.isAvailable
                                    ? "bg-red-700"
                                    : "bg-green-700"
                            }`}
                        >
                            <DropdownMenuItem
                                className={`rounded-md px-3 py-1 text-xs text-gray-100 font-semibold capitalize ${
                                    menuItem.isAvailable
                                        ? "hover:bg-red-600"
                                        : "hover:bg-green-600"
                                }`}
                                onClick={() => {
                                    handleUpdateStatus(menuItem.id);
                                    setSelectedItem(menuItem);
                                }}
                            >
                                <div>
                                    {Number(!menuItem?.isAvailable) === 1 ? (
                                        <>Available</>
                                    ) : (
                                        <>UnAvailable</>
                                    )}
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const data = menuItems.map((menuItem) => ({
        id: menuItem.id,
        itemName: menuItem.menu_item,
        price: menuItem.price,
        description: menuItem.description,
        ingredients: menuItem.ingredients,
        image: menuItem.image,
        isAvailable: Number(menuItem.is_available),
    }));
    return (
        <WaiterLayout>
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
                                Price
                            </span>
                            <span className="text-sm font-semibold text-green-800">
                                {selectedItem?.price || "Not Selected"}
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
                        <hr className="text-gray-300 mt-1" />
                        <div
                            className={`rounded-md px-3 py-2 text-center text-sm font-semibold capitalize ${
                                menuStatusStyles[selectedItem?.isAvailable]
                            }`}
                        >
                            {selectedItem?.isAvailable
                                ? "Available"
                                : " UnAvailable"}
                        </div>
                    </div>
                </div>
            </div>
        </WaiterLayout>
    );
};

export default MenuManagement;
