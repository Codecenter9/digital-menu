import React from "react";
import GuestLayout from "../GuestLayout";
import { Head, Link } from "@inertiajs/react";
const GuestDashboard = ({ users }) => {
    return (
        <GuestLayout>
            <Head title="Guest Dashboard" />
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Email
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Role
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Status
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Drive
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">
                                {user.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.email}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.role}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.status || "Active"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.google_connected ? (
                                    <span className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition">
                                        Connected {user.google_email}
                                    </span>
                                ) : (
                                    <a
                                        href={route("auth.google", user.id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                                    >
                                        Connect Drive
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </GuestLayout>
    );
};

export default GuestDashboard;
