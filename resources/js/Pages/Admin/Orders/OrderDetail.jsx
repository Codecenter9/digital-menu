import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { ArrowLeft, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const OrderDetail = ({ selectedOrder, setSelectedOrder }) => {
    const [activeImage, setActiveImage] = useState(null);

    useEffect(() => {
        if (selectedOrder?.items?.length) {
            const images = selectedOrder.items
                .map((item) => item.menuItem?.itemImage)
                .filter(Boolean);

            if (images.length) {
                const randomIndex = Math.floor(Math.random() * images.length);
                setActiveImage(images[randomIndex]);
            }
        }
    }, [selectedOrder]);

    const statusStyles = {
        pending: "bg-yellow-100 text-yellow-700",
        preparing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
    };

    const paymentStyles = {
        pending: "bg-yellow-100 text-yellow-700",
        paid: "bg-green-100 text-green-700",
    };
    return (
        <div>
            <Head title="Order Detail" />
            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 w-full">
                    <Button
                        onClick={() => setSelectedOrder()}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <PageTitle
                        title={"Order - #" + selectedOrder.orderNumber}
                        description="Manage your orders."
                        isDetail="true"
                    />
                </div>
                <Button variant="outline" className="pointer-events-none">
                    {new Date(selectedOrder?.createdAt).toLocaleDateString(
                        "en-ET",
                        {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        },
                    )}
                </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="overflow-hidden flex items-center gap-5 flex-col">
                    <div className="h-max w-full flex flex-col gap-3 px-3 py-8 rounded-md border border-gray-300">
                        <div className="w-full h-56 rounded-md overflow-hidden">
                            <img
                                src={
                                    activeImage ||
                                    "/staticFiles/placeholder.webp"
                                }
                                alt="Selected Item"
                                className="w-full h-full object-cover transition-all duration-300"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                            {selectedOrder?.items?.map((item) => (
                                <img
                                    key={item.id}
                                    src={
                                        item.menuItem?.itemImage ||
                                        "/staticFiles/placeholder.webp"
                                    }
                                    alt={item.menuItem?.name}
                                    onClick={() =>
                                        setActiveImage(item.menuItem?.itemImage)
                                    }
                                    className={`w-16 h-16 rounded-md object-cover cursor-pointer border-2 transition-all duration-200 ${
                                        activeImage === item.menuItem?.itemImage
                                            ? "border-amber-500 scale-105"
                                            : "border-transparent hover:border-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-start gap-5 w-full justify-center">
                        <div className="w-full flex items-center flex-col rounded-md border border-gray-300 p-3 justify-center gap-5">
                            <span className="text-normal font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                                General Information
                            </span>
                            <div className="w-full bg-gray-50 rounded-md border border-gray-300 flex flex-col items-center gap-2 p-3">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                    <span className="text-sm font-medium text-gray-500">
                                        Waiter
                                    </span>
                                    <span className="text-xs font-semibold text-gray-800">
                                        {selectedOrder?.waiterName ||
                                            "Not provided"}
                                    </span>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                    <span className="text-sm font-medium text-gray-500">
                                        Customer
                                    </span>
                                    <span className="text-xs font-semibold text-gray-800">
                                        {selectedOrder?.customerName ||
                                            "Not provided"}
                                    </span>
                                </div>
                                <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                    <span className="text-sm font-medium text-gray-500">
                                        Table Number
                                    </span>
                                    <span className="text-xs font-semibold text-gray-800">
                                        {selectedOrder?.tableNumber ||
                                            "Not Provided"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-5 col-span-2 px-3 h-max py-8 rounded-md border border-gray-300">
                    <div className="w-full flex items-center justify-center">
                        <span className="text-xl font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                            Order Detail
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row items-start gap-5 w-full justify-center">
                        <div className="w-full flex items-center flex-col rounded-md border border-gray-300 p-3 justify-center gap-5">
                            <span className="text-normal font-bold text-gray-900 border-b border-amber-800 px-3 py-1 text-center">
                                Basic Information
                            </span>
                            <div className="w-full bg-gray-50 rounded-md border border-gray-300 flex flex-col items-center gap-2 p-3">
                                <div className="w-full flex items-center justify-between border-b border-gray-200 pb-1">
                                    <span className="text-sm font-medium text-gray-500">
                                        Order Id
                                    </span>
                                    <span className="text-sm font-semibold text-gray-800">
                                        #{selectedOrder?.orderNumber}
                                    </span>
                                </div>
                                <div className="w-full flex flex-col gap-3 border-b border-gray-200 pb-1">
                                    <span className="w-max mx-auto px-3 text-center border-b border-amber-800 text-sm font-medium text-gray-500">
                                        Item
                                    </span>
                                    <div className="flex flex-col items-center gap-2">
                                        {selectedOrder?.items?.map(
                                            (item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center justify-between gap-1 w-full"
                                                >
                                                    <span className="text-xs font-semibold text-gray-800">
                                                        {index + 1}.{" "}
                                                        {
                                                            item?.menuItem
                                                                ?.itemName
                                                        }
                                                    </span>

                                                    <div className="flex items-center gap-1">
                                                        <p className="flex items-center gap-1 text-xs text-gray-500">
                                                            {item.unitPrice}
                                                            <X size={10} />
                                                            {item.quantity}{" "}
                                                            {"="}
                                                        </p>
                                                        <span className="text-xs font-semibold text-gray-800">
                                                            {item.subtotal}
                                                        </span>
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <div className="w-full flex items-center justify-between rounded-md bg-gray-100 border border-gray-300 px-3 py-1">
                                        <span className="text-sm">Price</span>
                                        <span className="text-sm">
                                            {selectedOrder?.totalAmount} Br.
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-3 border-b border-gray-200 pb-1">
                                    <span className="w-max mx-auto px-3 text-center border-b border-amber-800 text-sm font-medium text-gray-500">
                                        Additionals
                                    </span>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex items-center justify-between gap-1 w-full">
                                            <span className="text-xs font-semibold text-gray-800">
                                                1. Half Injera
                                            </span>
                                            <span className="text-xs font-semibold text-gray-800">
                                                25
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full flex items-center justify-between rounded-md bg-gray-100 border border-gray-300 px-3 py-1">
                                        <span className="text-sm">Price</span>
                                        <span className="text-sm">25 Br.</span>
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-between rounded-md bg-amber-100 border border-gray-300 px-3 py-1">
                                    <span className="text-normal">
                                        Total Price
                                    </span>
                                    <span className="text-normal text-amber-500">
                                        675 Br.
                                    </span>
                                </div>

                                <div className="w-full flex flex-col gap-3 mt-5">
                                    {/* Order Status */}
                                    <div className="w-full flex items-center justify-between rounded-md bg-slate-100 border px-3 py-2">
                                        {" "}
                                        <span className="text-sm font-medium text-gray-900">
                                            Order Status
                                        </span>
                                        <span
                                            className={`text-xs font-semibold capitalize px-2 py-1 rounded-md ${
                                                statusStyles[
                                                    selectedOrder?.orderStatus
                                                ] || "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {selectedOrder?.orderStatus}
                                        </span>
                                    </div>

                                    <div className="w-full flex items-center justify-between rounded-md bg-slate-100 border px-3 py-2">
                                        {" "}
                                        <span className="text-sm font-medium text-gray-900">
                                            Payment Status
                                        </span>
                                        <span
                                            className={`text-xs font-semibold capitalize px-2 py-1 rounded-md ${
                                                paymentStyles[
                                                    selectedOrder?.paymentStatus
                                                ] || "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {selectedOrder?.paymentStatus ||
                                                "pending"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
