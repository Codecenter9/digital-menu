import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../AdminLayout";
import { Head } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { CheckCheck, Clock, DollarSign, ShoppingCart } from "lucide-react";
import { DataTable } from "@/Components/ui/data-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import OrderDetail from "./OrderDetail";
import Chart from "./Chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
const Orders = ({ refferedOrder, orders }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [period, setPeriod] = useState("all");

    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const orderDate = new Date(order.created_at);
            const now = new Date();

            switch (period) {
                case "today":
                    return orderDate.toDateString() === now.toDateString();

                case "week": {
                    const weekAgo = new Date();
                    weekAgo.setDate(now.getDate() - 7);
                    return orderDate >= weekAgo;
                }

                case "month":
                    return (
                        orderDate.getMonth() === now.getMonth() &&
                        orderDate.getFullYear() === now.getFullYear()
                    );

                case "year":
                    return orderDate.getFullYear() === now.getFullYear();

                default:
                    return true;
            }
        });
    }, [orders, period]);

    useEffect(() => {
        if (!refferedOrder || !filteredOrders.length) return;

        const found = filteredOrders.find(
            (order) => Number(order.id) === Number(refferedOrder),
        );

        if (!found) return;

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
    }, [refferedOrder, filteredOrders]);

    const pendingOrders = filteredOrders.filter(
        (order) => order.order_status != "completed",
    ).length;

    const completedOrders = filteredOrders.filter(
        (order) => order.order_status === "completed",
    ).length;

    const totalCollected = filteredOrders
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
            accessorKey: "orderStatus",
            header: "Order Status",
            cell: ({ row }) => {
                const order = row.original;
                return (
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                            orderStatusStyles[order.orderStatus]
                        }`}
                    >
                        {order.orderStatus}
                    </button>
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

    const data = filteredOrders.map((order) => ({
        id: order.id,
        orderNumber: order.order_number,
        customerName: order?.customer?.name,
        waiterName: order?.waiter?.name,
        tableNumber: order?.table_number,
        totalItems: order.total_items,
        totalAmount: order.total_amount,
        extra: order?.extra,
        orderStatus: order?.order_status,
        paymentStatus: order?.payment?.payment_status,
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
        <AdminLayout>
            {selectedOrder ? (
                <OrderDetail
                    selectedOrder={selectedOrder}
                    setSelectedOrder={setSelectedOrder}
                />
            ) : (
                <>
                    <Head title="Orders" />
                    <div className="flex items-center justify-between gap-3">
                        <PageTitle
                            title="Orders Management"
                            description="Manage your orders."
                        />
                        <Select value={period} onValueChange={setPeriod}>
                            <SelectTrigger className="w-40">
                                <SelectValue
                                    placeholder="Select period"
                                    className="text-gray-500 capitalize"
                                />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="week">This Week</SelectItem>
                                <SelectItem value="month">
                                    This Month
                                </SelectItem>
                                <SelectItem value="year">This Year</SelectItem>
                                <SelectItem value="all">All Time</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="body-content flex flex-col gap-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div
                                data-aos="fade-up"
                                data-aos-duration="500"
                                data-aos-delay="50"
                                data-aos-easing="ease-in-out"
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md "
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Total Orders
                                    </h3>
                                    <ShoppingCart className="w-5 h-5 text-blue-500" />
                                </div>

                                <div className="mt-3">
                                    <h1 className="text-3xl font-bold">
                                        {filteredOrders.length}
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
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md "
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
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md "
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
                                className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md "
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Collected Amount
                                    </h3>
                                    <DollarSign className="w-5 h-5 text-orange-500" />
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
                        <div className="grid grid-cols-1 gap-6 mt-10">
                            <div className="flex flex-col rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3 max-h-max">
                                <div className="w-full lg:w-1/2 flex items-center justify-between gap-3">
                                    <TextInput
                                        placeholder="Search..."
                                        className={`${Styles.input} w-2/3`}
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
                                <Chart orders={filteredOrders} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
};

export default Orders;
