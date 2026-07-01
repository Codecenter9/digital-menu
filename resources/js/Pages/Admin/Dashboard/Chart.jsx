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
    BarChart,
    Bar,
} from "recharts";

const COLORS = [
    "#10B981",
    "#3B82F6",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#EC4899",
    "#84CC16",
];

const Chart = ({ orders }) => {
    // Menu Sales
    const menuSales = orders.reduce((acc, order) => {
        order.order_items.forEach((item) => {
            const name = item.menu_item.menu_item;
            const quantity = Number(item.quantity);

            acc[name] = (acc[name] || 0) + quantity;
        });

        return acc;
    }, {});

    const revenueData = orders.reduce((acc, order) => {
        const date = new Date(order.created_at).toLocaleDateString("en-ET", {
            day: "2-digit",
            month: "short",
        });

        const existing = acc.find((item) => item.date === date);

        if (existing) {
            existing.totalAmount += Number(order.total_amount);
        } else {
            acc.push({
                date,
                totalAmount: Number(order.total_amount),
            });
        }

        return acc;
    }, []);

    const chartData = Object.entries(menuSales)
        .map(([name, quantity]) => ({
            name,
            quantity,
        }))
        .sort((a, b) => b.quantity - a.quantity);

    const lineChartData = Object.entries(menuSales)
        .map(([name, quantity]) => ({
            name,
            quantity,
        }))
        .sort((a, b) => a.quantity - b.quantity);

    // Top & Least Sold
    const topLeastData =
        chartData.length > 1
            ? [
                  {
                      name: `Top: ${chartData[0].name}`,
                      quantity: chartData[0].quantity,
                  },
                  {
                      name: `Least: ${chartData[chartData.length - 1].name}`,
                      quantity: chartData[chartData.length - 1].quantity,
                  },
              ]
            : chartData;

    return (
        <div className="grid grid-cols-1 gap-y-6 lg:gap-6 ">
            {/* Pie Chart */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-y-6 lg:gap-6">
                <div className="w-full rounded-md h-max border bg-gray-50 p-3 shadow-sm">
                    <h2 className="text-base font-semibold mb-3 underline decoration-blue-500 decoration-2">
                        Top vs Least Sold Item
                    </h2>

                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={topLeastData}
                                    dataKey="quantity"
                                    nameKey="name"
                                    outerRadius={120}
                                >
                                    {topLeastData.map((entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        border: "none",
                                        borderRadius: "10px",
                                        padding: "6px 16px",
                                        width: "180px",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,0.15)",
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
                <div className="w-full rounded-md col-span-2 h-max border bg-gray-50 p-3 shadow-sm">
                    <h2 className="text-base font-semibold mb-3 underline decoration-blue-500 decoration-2">
                        Sales Distribution
                    </h2>

                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={revenueData}
                                margin={{
                                    top: 20,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="date"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    height={80}
                                    tick={{
                                        fontSize: 13,
                                    }}
                                />

                                <YAxis
                                    textAnchor="end"
                                    tick={{
                                        fontSize: 15,
                                    }}
                                />

                                <Tooltip
                                    formatter={(value) => [
                                        `${Number(value).toLocaleString()} Br.`,
                                        "Revenue",
                                    ]}
                                    contentStyle={{
                                        backgroundColor: "#1F2937",
                                        border: "none",
                                        borderRadius: "10px",
                                        padding: "6px 16px",
                                        width: "180px",
                                        boxShadow:
                                            "0 8px 20px rgba(0,0,0,0.15)",
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

                                <Bar
                                    dataKey="totalAmount"
                                    fill="#3B82F6"
                                    radius={[6, 6, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Area Chart */}
            <div className="rounded-md border bg-gray-50 p-3 shadow-sm">
                <h2 className="text-base font-semibold mb-3 underline decoration-blue-500 decoration-2">
                    Top Selling Items
                </h2>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={lineChartData}
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
