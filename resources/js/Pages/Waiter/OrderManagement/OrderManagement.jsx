import {
    ArrowUpDown,
    Check,
    ShoppingCart,
    CheckCheck,
    Clock,
    BadgeDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WaiterLayout from "../WaiterLayout";
import OrderDetail from "./OrderDetail";
import { Head, router } from "@inertiajs/react";
import { toast } from "sonner";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import { DataTable } from "@/Components/ui/data-table";
import PageTitle from "@/Components/PageTitle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import UpdateStatusForm from "../PaymentManagement/UpdateStatusForm";
import { SpinnerCustom } from "@/Components/ui/spinner";
import Chart from "./Chart";
const OrderManagement = ({ orders, refferedOrder }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState(null);
    const [updatedPaymentMethod, setUpdatedPaymentMethod] = useState(null);
    const [paidAmount, setPaidAmount] = useState(null);
    const orderStatuses = ["pending", "preparing", "completed"];
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    useEffect(() => {
        if (!refferedOrder || !orders?.length) return;

        const found = orders.find(
            (order) => Number(order.id) === Number(refferedOrder),
        );

        setSelectedOrder((prev) => {
            if (prev?.id === found.id) return prev;

            return {
                id: found.id,
                orderNumber: found.order_number,
                customerName: found?.customer?.name,
                waiterName: found?.waiter?.name,
                tableNumber: found?.table_number,
                totalItems: found.total_items,
                totalAmount: found.total_amount,
                extra: found?.extra,
                orderStatus: found?.order_status,
                paymentStatus: found?.payment?.payment_status,
                createdAt: found?.created_at,
                items: found.order_items.map((item) => ({
                    id: item.id,
                    quantity: item.quantity,
                    unitPrice: item.unit_price,
                    subtotal: item.subtotal,
                    menuItem: {
                        id: item.menu_item.id,
                        itemName: item.menu_item.menu_item,
                        itemImage: item.menu_item.image,
                        itemPrice: item.menu_item.price,
                    },
                })),
            };
        });
    }, [refferedOrder, orders]);

    const pendingOrders = orders.filter(
        (order) => order.order_status != "completed",
    ).length;
    const completedOrders = orders.filter(
        (order) => order.order_status === "completed",
    ).length;
    const totalCollected = orders
        ?.filter((order) => order?.payment?.payment_status === "paid")
        ?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    const orderStatusStyles = {
        pending: "bg-yellow-100 text-yellow-700",
        preparing: "bg-blue-100 text-blue-700",
        completed: "bg-green-100 text-green-700",
    };

    const paymentStatusStyles = {
        pending: "bg-red-100 text-red-700",
        paid: "bg-green-100 text-green-700",
    };

    const updateOrderStatus = (id, currentStatus, newStatus) => {
        if (currentStatus === newStatus) return;

        setUpdatingOrderId(id);

        router.patch(
            route("waiter.orders.update-status", id),
            {
                order_status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setUpdatingOrderId(null);
                    toast.success("Order status updated.");
                },
                onError: () => {
                    setUpdatingOrderId(null);
                    toast.error("Unable to update order.");
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
                        className="hidden lg:flex w-6 h-6 rounded-full object-cover"
                    />
                </div>
            ),
        },
        {
            accessorKey: "orderNumber",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Order Id
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "totalItems",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Total Items
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "totalAmount",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Total Price
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },

        {
            id: "orderStatus",
            header: "Order Status",
            cell: ({ row }) => {
                const order = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                onClick={(e) => e.stopPropagation()}
                                className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                                    orderStatusStyles[order.orderStatus]
                                }`}
                            >
                                {updatingOrderId === order.id ? (
                                    <SpinnerCustom />
                                ) : (
                                    <>{order.orderStatus}</>
                                )}
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-40 py-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {orderStatuses.map((status) => (
                                <DropdownMenuItem
                                    key={status}
                                    disabled={order.orderStatus === status}
                                    onClick={() =>
                                        updateOrderStatus(
                                            order.id,
                                            order.orderStatus,
                                            status,
                                        )
                                    }
                                    className="px-3 capitalize flex  border-b border-gray-800 justify-between cursor-pointer"
                                >
                                    {status}

                                    {order.orderStatus === status && (
                                        <Check className="w-4 h-4 text-green-500" />
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
        {
            id: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => {
                const order = row.original;

                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenUpdateModal(true);
                            setUpdatedPaymentStatus(order?.paymentStatus);
                            setUpdatedPaymentMethod(order?.paymentMethod);
                            setPaidAmount(order?.totalAmount);
                            setUpdatedOrder(order?.id);
                        }}
                        className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                            paymentStatusStyles[order.paymentStatus]
                        }`}
                    >
                        {order.paymentStatus ?? "Pending"}
                    </button>
                );
            },
        },
    ];

    const data = orders.map((order) => ({
        id: order.id,
        orderNumber: order.order_number,
        customerName: order?.customer?.name,
        waiterName: order?.waiter?.name,
        tableNumber: order?.table_number,
        totalItems: order?.total_items,
        totalAmount: order?.total_amount,
        extra: order?.extra,
        orderStatus: order?.order_status,
        paymentStatus: order?.payment?.payment_status,
        paymentMethod: order?.payment?.payment_method,
        createdAt: order?.created_at,

        // Order Items
        items: order.order_items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            unitPrice: item.unit_price,
            subtotal: item.subtotal,

            menuItem: {
                id: item.menu_item.id,
                itemName: item.menu_item.menu_item,
                itemImage: item.menu_item.image,
                itemPrice: item.menu_item.price,
            },
        })),
    }));

    return (
        <WaiterLayout>
            {selectedOrder ? (
                <OrderDetail
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />
            ) : (
                <>
                    <Head title="Orders" />
                    <div className="flex items-center gap-3 justify-between">
                        <PageTitle
                            title="Orders Management"
                            description="Manage your orders."
                        />
                        <Button
                            variant="outline"
                            className="pointer-events-none"
                        >
                            {new Date().toLocaleDateString("en-ET", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            })}
                        </Button>
                    </div>
                    <div className="body-content flex flex-col gap-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="50"
                                data-aos-easing="ease-in-out"
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Total Orders
                                    </h3>
                                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">
                                        {orders.length}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total orders
                                    </p>
                                </div>
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-duration="800"
                                data-aos-delay="50"
                                data-aos-easing="ease-in-out"
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Completed Orders
                                    </h3>
                                    <CheckCheck className="w-5 h-5 text-green-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">
                                        {completedOrders}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total completed orders
                                    </p>
                                </div>
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-duration="1000"
                                data-aos-delay="50"
                                data-aos-easing="ease-in-out"
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Pending Orders
                                    </h3>
                                    <Clock className="w-5 h-5 text-orange-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">
                                        {pendingOrders}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total pending orders
                                    </p>
                                </div>
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-duration="1200"
                                data-aos-delay="50"
                                data-aos-easing="ease-in-out"
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Collected Amount
                                    </h3>
                                    <BadgeDollarSign className="w-5 h-5 text-orange-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">
                                        {totalCollected}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Total money collected
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                            <div className="w-full lg:w-1/2 flex items-center justify-between gap-3">
                                <TextInput
                                    placeholder="Search..."
                                    className={`${Styles.input} `}
                                />
                            </div>

                            <DataTable
                                columns={columns}
                                data={data}
                                isSelect={false}
                                onSelectRow={setSelectedOrder}
                                selectedRowId={setSelectedOrder?.id}
                            />
                        </div>

                        <div className="w-full flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                            <span className="w-full lg:w-1/2 px-16 mx-auto text-base rounded-md font-bold text-gray-900 bg-gray-100 py-1 text-center">
                                Graphical representation
                            </span>
                            <Chart orders={orders} />
                        </div>
                    </div>
                </>
            )}

            {/* modal content */}
            <Dialog open={openUpdateModal} onOpenChange={setOpenUpdateModal}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Update payment status</DialogTitle>
                    </DialogHeader>

                    <UpdateStatusForm
                        setOpenUpdateModal={setOpenUpdateModal}
                        paymentStatus={updatedPaymentStatus}
                        paymentMethod={updatedPaymentMethod}
                        paidAmount={paidAmount}
                        updatedOrder={updatedOrder}
                    />
                </DialogContent>
            </Dialog>
        </WaiterLayout>
    );
};

export default OrderManagement;
