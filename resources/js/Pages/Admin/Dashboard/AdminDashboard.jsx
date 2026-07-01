import React, { useState } from "react";
import AdminLayout from "../../admin/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import {
    BadgeDollarSign,
    ShoppingCart,
    TrendingUp,
    TrendingDown,
} from "lucide-react";
import Chart from "./Chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
const AdminDashboard = ({ orders }) => {
    const [period, setPeriod] = useState("all");

    const filteredOrders = orders.filter((order) => {
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

    const totalCollected = filteredOrders
        ?.filter((order) => order?.payment?.payment_status === "paid")
        ?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    const itemSales = filteredOrders.reduce((acc, order) => {
        order.order_items.forEach((item) => {
            const name = item.menu_item.menu_item;

            acc[name] = (acc[name] || 0) + Number(item.quantity);
        });

        return acc;
    }, {});

    const topSellingItem =
        Object.keys(itemSales).length > 0
            ? Object.keys(itemSales).reduce((a, b) =>
                  itemSales[a] > itemSales[b] ? a : b,
              )
            : "N/A";

    const leastSellingItem =
        Object.keys(itemSales).length > 0
            ? Object.keys(itemSales).reduce((a, b) =>
                  itemSales[a] < itemSales[b] ? a : b,
              )
            : "N/A";

    return (
        <AdminLayout>
            <Head title="Admin Dashboard" />
            <div className="flex items-center gap-3 justify-between">
                <PageTitle
                    title="Dashboard"
                    description="View your dashboard details here."
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
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                        <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="body-content flex flex-col gap-8">
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
                            <h1 className="text-2xl font-bold">
                                {filteredOrders.length}
                                <sub className="text-xs">orders</sub>
                            </h1>
                            <p className="text-xs mt-3 text-gray-500 font-mono">
                                Total customer orders
                            </p>
                            <hr className="w-full border border-gray-100 mt-3" />
                            <Link
                                href={route("admin.order-management")}
                                className="text-sm text-blue-500 hover:underline mt-2 block"
                            >
                                View all orders
                            </Link>
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
                                Top Selling Item
                            </h3>
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold truncate">
                                    {topSellingItem}
                                </h1>
                            </div>
                            <p className="text-xs mt-3 text-gray-500 font-mono">
                                Best-selling menu item
                            </p>
                            <hr className="w-full border border-gray-100 mt-3" />
                            <Link
                                href={route("admin.menu-item")}
                                className="text-sm text-blue-500 hover:underline mt-2 block"
                            >
                                View menu items
                            </Link>
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
                                Least Selling Item
                            </h3>
                            <TrendingDown className="w-5 h-5 text-red-500" />
                        </div>

                        <div className="mt-3">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-bold truncate">
                                    {leastSellingItem}
                                </h1>
                            </div>
                            <p className="text-xs mt-3 text-gray-500 font-mono">
                                Lowest-selling menu item
                            </p>
                            <hr className="w-full border border-gray-100 mt-3" />
                            <Link
                                href={route("admin.menu-item")}
                                className="text-sm text-blue-500 hover:underline mt-2 block"
                            >
                                View menu items
                            </Link>
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
                                Total Revenue
                            </h3>
                            <BadgeDollarSign className="w-5 h-5 text-emerald-500" />
                        </div>

                        <div className="mt-3">
                            <h1 className="text-2xl font-bold">
                                {totalCollected.toLocaleString()}{" "}
                                <sub className="text-xs">ETB</sub>
                            </h1>
                            <p className="text-xs mt-3 text-gray-500 font-mono">
                                Total revenue collected
                            </p>
                            <hr className="w-full border border-gray-100 mt-3" />
                            <Link
                                href={route("admin.payment-management")}
                                className="text-sm text-blue-500 hover:underline mt-2 block"
                            >
                                View revenue details
                            </Link>
                        </div>
                    </div>
                </div>
                <Chart orders={filteredOrders} />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
