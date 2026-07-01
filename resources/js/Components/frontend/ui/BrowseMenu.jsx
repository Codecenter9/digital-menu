import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";
import MenuGrid from "./Menu/MenuGrid";

const BrowseMenu = ({ meals, drinks, categories }) => {
     const [activeTab, setActiveTab] = useState("all");
    const [subActiveTab, setSubActiveTab] = useState(null);
    const scrollRef = useRef(null);

    const filteredItems = useMemo(() => {
        // Show everything
        if (activeTab === "all") {
            return [...meals, ...drinks];
        }

        // Meals
        if (activeTab === "meal") {
            if (subActiveTab === "all") {
                return meals;
            }

            return meals.filter(
                (item) => item.menu_category.id === subActiveTab,
            );
        }

        // Drinks
        if (activeTab === "drink") {
            if (subActiveTab === "all") {
                return drinks;
            }

            return drinks.filter(
                (item) => item.menu_category.id === subActiveTab,
            );
        }

        return [];
    }, [activeTab, subActiveTab, meals, drinks]);

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({
            left: -150,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 150,
            behavior: "smooth",
        });
    };

    const Tabs = [
        {
            name: "All",
            key: "all",
        },
        {
            name: "Meals",
            key: "meal",
        },
        {
            name: "Drinks",
            key: "drink",
        },
    ];

    const selectedTab = Tabs.find((tab) => tab.key === activeTab);

    const SubTabs = [
        {
            name: "All",
            key: "all",
        },
        ...categories
            .filter((category) =>
                activeTab === "meal"
                    ? !category.is_drink
                    : activeTab === "drink"
                      ? category.is_drink
                      : true,
            )
            .map((category) => ({
                name: category.category_name,
                key: category.id,
            })),
    ];

    return (
        <div className="flex items-center gap-6 flex-col px-6 lg:px-12 py-12">
            <div className="w-full sticky top-[80px] z-40 bg-white border-b pb-1">
                <div className="w-full flex items-center justify-between gap-3">
                    {activeTab === "all" ? (
                        <div className="flex items-center gap-3">
                            {Tabs.map((tab) => (
                                <Button
                                    key={tab.key}
                                    className={`rounded-md border border-gray-300 px-4 py-2 ${activeTab === tab.key ? "bg-amber-700 text-gray-100" : "bg-gray-100"} transition-all duration-300`}
                                    onClick={() => {
                                        (setActiveTab(tab.key),
                                            setSubActiveTab("all"));
                                    }}
                                >
                                    {tab.name}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-3">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 w-fit">
                                <span
                                    onClick={() => setActiveTab("all")}
                                    className="rounded-full border border-gray-300 overflow-hidden"
                                >
                                    <ChevronLeft
                                        size={28}
                                        className="cursor-pointer bg-gray-100 text-gray-900 hover:text-amber-500 hover:-translate-x-1 transition-all duration-300"
                                    />
                                </span>
                                <span className="cursor-pointer text-lg font-medium bg-amber-700 rounded-md px-4 text-gray-100 tracking-wide">
                                    {selectedTab?.name}
                                </span>
                            </div>
                            <div className="col-span-2 min-w-0 flex items-center gap-2">
                                <Button
                                    onClick={scrollLeft}
                                    className="p-2 bg-gray-100 hidden lg:flex rounded-full hover:bg-gray-200"
                                >
                                    <ChevronLeft size={15} />
                                </Button>
                                <div
                                    ref={scrollRef}
                                    className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide flex-1 min-w-0 max-w-full"
                                >
                                    {SubTabs.map((subTab) => (
                                        <span
                                            key={subTab.key}
                                            onClick={() =>
                                                setSubActiveTab(subTab.key)
                                            }
                                            className={`flex-shrink-0 cursor-pointer rounded-md border border-gray-300 py-0 px-4 whitespace-nowrap ${
                                                subActiveTab === subTab.key
                                                    ? "bg-amber-700 text-gray-100"
                                                    : "bg-gray-100"
                                            } transition-all duration-300`}
                                        >
                                            {subTab.name}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    onClick={scrollRight}
                                    className="p-2 hidden lg:flex bg-gray-100 rounded-full hover:bg-gray-200"
                                >
                                    <ChevronRight size={15} />
                                </Button>
                            </div>
                        </div>
                    )}
                    {activeTab === "all" && (
                        <div className="hidden lg:flex">
                            <Link
                                href="#"
                                className="text-sm text-blue-500 underline hover:text-amber-500 transition-all duration-300"
                            >
                                Browse Orders...
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div
                className="w-full overflow-y-auto scrollbar-hide"
                style={{ height: "calc(100vh - 180px)" }}
            >
                <MenuGrid items={filteredItems} />
            </div>
        </div>
    );
};

export default BrowseMenu;
