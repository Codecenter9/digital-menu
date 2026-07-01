import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import { Head, Link, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { DataTable } from "@/Components/ui/data-table";
import { Button } from "@/components/ui/button";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";

import {
    ArrowUpDown,
    Wallet,
    Landmark,
    Smartphone,
    BadgeDollarSign,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
const Payments = ({ payments }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [period, setPeriod] = useState("all");

    const filteredPayments = payments.filter((payment) => {
        const paymentDate = new Date(payment.created_at);
        const now = new Date();

        switch (period) {
            case "today":
                return paymentDate.toDateString() === now.toDateString();

            case "week": {
                const weekAgo = new Date();
                weekAgo.setDate(now.getDate() - 7);
                return paymentDate >= weekAgo;
            }

            case "month":
                return (
                    paymentDate.getMonth() === now.getMonth() &&
                    paymentDate.getFullYear() === now.getFullYear()
                );

            case "year":
                return paymentDate.getFullYear() === now.getFullYear();

            default:
                return true;
        }
    });

    const totals = filteredPayments.reduce(
        (acc, payment) => {
            const amount = Number(payment.amount || 0);

            acc.total += amount;

            if (payment.payment_method === "cbe") {
                acc.cbe += amount;
            } else if (payment.payment_method === "telebirr") {
                acc.telebirr += amount;
            } else if (payment.payment_method === "cash") {
                acc.cash += amount;
            }

            return acc;
        },
        {
            cbe: 0,
            telebirr: 0,
            cash: 0,
            total: 0,
        },
    );

    const { cbe, telebirr, cash, total } = totals;

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
            id: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenUpdateModal(true);
                            setUpdatedPaymentStatus(payment?.paymentStatus);
                            setUpdatedPaymentMethod(payment?.paymentMethod);
                            setPaidAmount(payment?.totalAmount);
                            setUpdatedOrder(payment?.orderId);
                        }}
                        className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                            paymentStatusStyles[payment.paymentStatus]
                        }`}
                    >
                        {payment.paymentStatus ?? "Pending"}
                    </button>
                );
            },
        },
    ];

    const data = filteredPayments.map((payment) => ({
        id: payment.id,
        orderId: payment?.order_id,
        orderNumber: payment?.order?.order_number,
        totalAmount: payment?.amount,
        paymentStatus: payment?.payment_status,
        paymentMethod: payment?.payment_method,
    }));

    return (
        <AdminLayout>
            <Head title="Payments" />
            <div className="flex items-center justify-between gap-3">
                <PageTitle
                    title="Payment Management"
                    description="Manage your payments."
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
            <div className="body-content flex flex-col gap-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Cash */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="500"
                        data-aos-delay="50"
                        data-aos-easing="ease-in-out"
                        className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">
                                Cash Payments
                            </h3>
                            <Wallet className="w-5 h-5 text-emerald-500" />
                        </div>

                        <div className="mt-3">
                            <h1 className="text-3xl font-bold">
                                {totals.cash.toLocaleString()}
                                <sub className="text-xs font-mono">Br.</sub>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Total cash collected
                            </p>
                        </div>
                    </div>

                    {/* CBE */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="50"
                        data-aos-easing="ease-in-out"
                        className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">
                                CBE Payments
                            </h3>
                            <Landmark className="w-5 h-5 text-blue-600" />
                        </div>

                        <div className="mt-3">
                            <h1 className="text-3xl font-bold">
                                {totals.cbe.toLocaleString()}
                                <sub className="text-xs font-mono">Br.</sub>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Paid via CBE
                            </p>
                        </div>
                    </div>

                    {/* Telebirr */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="50"
                        data-aos-easing="ease-in-out"
                        className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">
                                Telebirr Payments
                            </h3>
                            <Smartphone className="w-5 h-5 text-purple-600" />
                        </div>

                        <div className="mt-3">
                            <h1 className="text-3xl font-bold">
                                {totals.telebirr.toLocaleString()}
                                <sub className="text-xs font-mono">Br.</sub>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Paid via Telebirr
                            </p>
                        </div>
                    </div>

                    {/* Total */}
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        data-aos-delay="50"
                        data-aos-easing="ease-in-out"
                        className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-500">
                                Total Collected
                            </h3>
                            <BadgeDollarSign className="w-5 h-5 text-orange-500" />
                        </div>

                        <div className="mt-3">
                            <h1 className="text-3xl font-bold">
                                {totals.total.toLocaleString()}
                                <sub className="text-xs font-mono">Br.</sub>
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Total payments received
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    <div className="flex flex-col col-span-2 rounded-md border bg-white shadow-sm p-3 lg:p-5 gap-3">
                        <div className="flex items-center justify-between gap-3">
                            <TextInput
                                placeholder="Search..."
                                className={`${Styles.input} `}
                            />
                        </div>

                        <DataTable
                            columns={columns}
                            data={data}
                            isSelect={false}
                            onSelectRow={setSelectedPayment}
                            selectedRowId={selectedPayment?.id}
                        />
                    </div>
                    <div className="flex flex-col gap-7 rounded-md border shadow-sm p-3 lg:p-5 max-h-max">
                        <span className="text-base rounded-md font-bold text-gray-100 bg-gray-800 px-3 py-1 text-center">
                            Order - #
                            {selectedPayment?.orderNumber || "Not Selected"}
                        </span>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                                <span className="text-sm font-medium text-gray-500">
                                    Order Id
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    #
                                    {selectedPayment?.orderNumber ||
                                        "Not Selected"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                                <span className="text-sm font-medium text-gray-500">
                                    Total Price
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                    {selectedPayment?.totalAmount ||
                                        "Not Selected"}
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                                <span className="text-sm font-medium text-gray-500">
                                    Payment Status
                                </span>
                                <span
                                    className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${
                                        paymentStatusStyles[
                                            selectedPayment?.paymentStatus
                                        ]
                                    }`}
                                >
                                    {selectedPayment?.paymentStatus ||
                                        "Not Selected"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 bg-gray-50">
                                <span className="text-sm font-medium text-gray-500">
                                    Payment Method
                                </span>
                                <span className="text-sm font-semibold text-green-800">
                                    {selectedPayment?.paymentMethod ||
                                        "Not Selected"}
                                </span>
                            </div>
                            <hr className="text-gray-300 mt-3" />
                            <Link
                                href={route("admin.order-management", {
                                    refferedOrder: selectedPayment?.orderId,
                                })}
                            >
                                <Button
                                    variant="outline"
                                    disabled={!selectedPayment}
                                    className={`${Styles.button} w-full`}
                                >
                                    View Order Detail
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Payments;
