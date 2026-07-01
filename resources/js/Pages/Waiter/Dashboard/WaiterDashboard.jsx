import React from "react";
import WaiterLayout from "../WaiterLayout";
import { Head } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { Button } from "@/Components/ui/button";
import { BadgeDollarSign, CheckCheck, Clock, ShoppingCart } from "lucide-react";
import Chart from "./Chart";
const WaiterDashboard = ({ orders }) => {
    const pendingOrders = orders.filter(
        (order) => order.order_status != "completed",
    ).length;
    const completedOrders = orders.filter(
        (order) => order.order_status === "completed",
    ).length;
    const totalCollected = orders
        ?.filter((order) => order?.payment?.payment_status === "paid")
        ?.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
    return (
        <WaiterLayout>
            <Head title="Waiter Dashboard" />
            <div className="flex items-center gap-3 justify-between">
                <PageTitle
                    title="Dashboard"
                    description="View your dashboard details here."
                />
                <Button variant="outline" className="pointer-events-none">
                    {new Date().toLocaleDateString("en-ET", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })}
                </Button>
            </div>
            <div className="body-content flex flex-col gap-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
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

                    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
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

                    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
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

                    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition">
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
                <Chart orders={orders} />
            </div>
        </WaiterLayout>
    );
};

export default WaiterDashboard;
