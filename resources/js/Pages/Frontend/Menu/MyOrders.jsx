import SectionHero from "@/Components/frontend/ui/SectionHero";
import FrontLayout from "@/Layouts/FrontLayout";
import { Head } from "@inertiajs/react";
import { X } from "lucide-react";
import React from "react";

const MyOrders = ({ orders }) => {
    return (
        <FrontLayout>
            <Head title="My Orders" />
            <SectionHero name="Home" link="/" page="My Orders" />

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 font-mono">
                        Orders
                    </h1>
                    <p className="text-gray-500 mt-2 font-mono">
                        Review your unfinished orders here.
                    </p>
                </div>

                <div className="h-max w-full gap-8 rounded-md border border-gray-300 p-3 lg:p-8">
                    <div className="flex items-center justify-between p-2 mb-5">
                        <h2 className="font-mono text-center font-semibold text-lg">
                            Order Summary
                        </h2>
                    </div>
                    <div className="h-max grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {orders.length === 0 ? (
                            <span className="font-mono h-full flex items-center p-5">
                                You have not any pending orders.
                            </span>
                        ) : (
                            <>
                                {orders.map((order) => (
                                    <div
                                        key={order.id}
                                        className="w-full border rounded-lg p-4 mb-4"
                                    >
                                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                                            <div>
                                                <h2 className=" font-mono font-bold text-lg">
                                                    Order #{order.order_number}
                                                </h2>

                                                <p className="text-sm font-mono text-gray-500">
                                                    {new Date(
                                                        order.created_at,
                                                    ).toLocaleString()}
                                                </p>
                                            </div>

                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order.order_status === "pending" ? "bg-yellow-100 text-yellow-700" : order.order_status === "preparing" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}
                                            >
                                                {order.order_status}
                                            </span>
                                        </div>

                                        {order.order_items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center border-b border-gray-200 py-3"
                                            >
                                                <div className="group overflow-hidden flex gap-3">
                                                    <img
                                                        src={
                                                            item.menu_item
                                                                .image ??
                                                            "/staticFiles/placeholder.webp"
                                                        }
                                                        className="w-16 h-12 group-hover:scale-105 transition-all duration-300 rounded object-cover"
                                                    />

                                                    <div>
                                                        <h3 className="font-semibold font-mono">
                                                            {
                                                                item.menu_item
                                                                    .menu_item
                                                            }
                                                        </h3>

                                                        <p className="flex items-center gap-1 text-xs text-gray-500">
                                                            {item.unit_price}
                                                            ETB <X size={10} />
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-sm font-mono">
                                                    {item.subtotal} ETB
                                                </h3>
                                            </div>
                                        ))}

                                        <div className="mt-4 flex flex-col lg:flex-row justify-between font-semibold font-mono">
                                            <span>
                                                Total Items: {order.total_items}
                                            </span>

                                            <span>
                                                Total: {order.total_amount} ETB
                                            </span>
                                        </div>

                                        {order.extra && (
                                            <div className="mt-2 text-sm text-gray-600 font-mono">
                                                <strong>Extra:</strong>{" "}
                                                {order.extra}
                                            </div>
                                        )}

                                        {order.table_number && (
                                            <div className="text-sm text-gray-600  font-mono">
                                                <strong>Table:</strong>{" "}
                                                {order.table_number}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
};

export default MyOrders;
