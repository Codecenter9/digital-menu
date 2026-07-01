import React from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
];

const Chart = ({ orders }) => {
    const menuSales = orders.reduce((acc, order) => {
        order.order_items.forEach((item) => {
            const name = item.menu_item.menu_item;
            const quantity = Number(item.quantity);

            acc[name] = (acc[name] || 0) + quantity;
        });

        return acc;
    }, {});

    const chartData = Object.entries(menuSales)
        .map(([name, quantity]) => ({
            name,
            quantity,
        }))
        .sort((a, b) => a.quantity - b.quantity);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
            {/* Pie Chart */}
            <div className="w-full rounded-md h-max border bg-gray-50 p-3 shadow-sm">
                <h2 className="text-base font-semibold mb-3">
                    Sales Distribution
                </h2>

                <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="quantity"
                                nameKey="name"
                                outerRadius={120}
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1F2937", // Dark gray
                                    border: "none",
                                    borderRadius: "10px",
                                    padding: "6px 16px",
                                    width: "180px",
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                }}
                                labelStyle={{
                                    color: "#F9FAFB",
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    marginBottom: "6px",
                                }}
                                itemStyle={{
                                    color: "#60A5FA",
                                    fontSize: "13px",
                                }}
                                cursor={{
                                    stroke: "#3B82F6",
                                    strokeWidth: 1,
                                    strokeDasharray: "4 4",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Area Chart */}
            <div className="rounded-md col-span-2 border bg-gray-50 p-3 shadow-sm">
                <h2 className="text-base font-semibold mb-3">
                    Top Selling Menu Items
                </h2>

                <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 20,
                                right: 20,
                                left: -20,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="sales"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#3B82F6"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#3B82F6"
                                        stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                interval={0}
                                height={80}
                                tick={{
                                    fontSize: 11,
                                }}
                            />

                            <YAxis />

                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="quantity"
                                stroke="#3B82F6"
                                fill="url(#sales)"
                                strokeWidth={0.5}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Chart;
