import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import PageTitle from "@/Components/PageTitle";
import { ArrowLeft, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const CategoryDetail = ({ menuItems, selectedCategory, setViewDetail }) => {
    const [activeView, setActiveView] = useState("list");

    const filterMenuItems = menuItems.filter(
        (item) => item?.category_id === selectedCategory.id,
    );

    const views = [
        {
            name: "list",
            icon: <List size={18} />,
        },
        {
            name: "grid",
            icon: <Grid size={18} />,
        },
    ];

    return (
        <div>
            <Head title={selectedCategory.categoryName} />

            <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 w-full">
                    <Button
                        onClick={() => setViewDetail()}
                        className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center transition-all duration-300"
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <PageTitle
                        title={selectedCategory.categoryName}
                        description="Manage your staff members and their roles."
                        isDetail={true}
                    />
                </div>

                <div className="flex items-center gap-2 ">
                    {views.map((view) => (
                        <div
                            key={view.name}
                            onClick={() => setActiveView(view.name)}
                            className={`p-1 rounded-md border border-gray-200 cursor-pointer transition-all duration-300 ${
                                activeView === view.name
                                    ? "bg-gray-100 text-primary"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            {view.icon}
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {filterMenuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`group flex items-center rounded-md border border-gray-300 p-2 gap-3 ${activeView === "list" ? "" : "flex-col"}`}
                    >
                        <div
                            className={`${activeView === "list" ? "w-1/3" : "w-full"} overflow-hidden rounded-md`}
                        >
                            <img
                                src={item.image}
                                alt="Profile"
                                className={`${activeView === "list" ? "w-20 h-16 object-cover" : "w-full h-40 object-fit"} cursor-pointer group-hover:scale-105 transition-all duration-300`}
                            />
                        </div>
                        <div className="w-full flex col-span-2 items-center flex-col justify-between gap-1">
                            <div className="w-full flex items-center justify-between rounded-md bg-slate-100 border border-gray-300 px-3 py-1">
                                <span className="text-xs">Item</span>
                                <Link
                                    href={route("admin.menu-item", {
                                        selectedMenuItem: item.id,
                                    })}
                                    className="text-xs underline cursor-pointer hover:text-blue-500"
                                >
                                    {item.menu_item}
                                </Link>
                            </div>
                            <div className="w-full flex items-center justify-between rounded-md bg-slate-100 border border-gray-300 px-3 py-1">
                                <span className="text-xs">Price</span>
                                <span className="text-xs">
                                    {item.price} Br.
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryDetail;
