import { Button } from "@/Components/ui/button";
import { useCart } from "@/Context/CartContext";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { router } from "@inertiajs/react";

const MenuGrid = ({ items = [] }) => {
    const { addToCart } = useCart();

    if (items.length === 0) {
        return (
            <div className="py-20 text-center text-gray-500">
                No menu items found.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    data-aos="fade-up"
                    data-aos-duration={500 + index * 200}
                    data-aos-delay="100"
                    data-aos-offset="100"
                    data-aos-easing="ease-in-out"
                    className="p-1"
                >
                    <Card className="group border-none rounded-md relative mx-auto w-full max-w-md space-y-5 p-2">
                        <div className="relative overflow-hidden w-full rounded-md">
                            <img
                                src={
                                    item.image ||
                                    "/staticFiles/placeholder.webp"
                                }
                                alt={item.menu_item}
                                className="object-cover cursor-pointer h-[250px] lg:h-[150px] w-full group-hover:scale-105 transition-all duration-300"
                            />

                            <div className="absolute top-2 right-2">
                                <Badge
                                    variant="secondary"
                                    className={`rounded-md text-gray-100 ${item.is_available ? "bg-green-700" : "bg-amber-700"}`}
                                >
                                    {item.is_available
                                        ? "Available"
                                        : "Unavailable"}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <CardAction>
                                <Button
                                    onClick={() =>
                                        router.visit(
                                            route("item.details", item.id),
                                        )
                                    }
                                    variant="link"
                                    className="hover:text-amber-500"
                                >
                                    View Detail
                                </Button>
                            </CardAction>

                            <CardTitle>{item.menu_item}</CardTitle>

                            <CardDescription className="mt-3 line-clamp-2">
                                {item.description}
                            </CardDescription>
                        </CardHeader>

                        <CardFooter className="flex items-center justify-between gap-3 py-2">
                            <Badge
                                variant="secondary"
                                className="border border-gray-300 text-amber-700 rounded-md"
                            >
                                {Number(item.price).toFixed(2)} ETB
                            </Badge>

                            <Button
                                onClick={() => addToCart(item)}
                                className="flex rounded-md border border-amber-500 hover:bg-amber-100 items-center gap-2 hover:text-amber-500"
                            >
                                <ShoppingCart size={16} />
                                Add Item
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default MenuGrid;
