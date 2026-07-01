import SectionHero from "@/Components/frontend/ui/SectionHero";
import FrontLayout from "@/Layouts/FrontLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { Button } from "@/Components/ui/button";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@headlessui/react";
import { useCart } from "@/Context/CartContext";
import { Minus, Plus, Trash } from "lucide-react";
import Styles from "@/constants/Styles";
import { SpinnerCustom } from "@/Components/ui/spinner";
const CheckOut = () => {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        removeFromCart,
    } = useCart();
    const { auth } = usePage().props;
    const user = auth?.user;

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const { data, setData, post, processing, reset } = useForm({
        tableNumber: "",
        totalAmount: total,
        totalItems: cartCount,
        extra: "",
        items: cart.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
            unitPrice: item.price,
            subtotal: item.price * item.quantity,
        })),
    });

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            customerId: user?.id,
            totalAmount: total,
            totalItems: cartCount,
            items: cart.map((item) => ({
                itemId: item.id,
                quantity: item.quantity,
                unitPrice: item.price,
                subtotal: item.price * item.quantity,
            })),
        }));
    }, [cart, total, cartCount, user]);

    const submitOrder = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        post(route("orders.store"), {
            preserveScroll: true,
            onSuccess: () => {
                clearCart();
                reset();
            },
        });
    };

    return (
        <FrontLayout>
            <Head title="Checkout" />
            <SectionHero name="Home" link="/" page="CheckOut" />

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Checkout
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Review your order before placing it.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-max w-full gap-8 col-span-2 rounded-md border border-gray-300 p-3">
                        <div className="flex items-center justify-between p-2 mb-5">
                            <h2 className="text-center font-semibold text-lg">
                                Order Summary
                            </h2>
                            {cartCount === 0 ? (
                                <Link
                                    href="/menu"
                                    className="text-center font-extralight text-blue-500 hover:text-blue-700 underline transition-all duration-300 text-sm"
                                >
                                    Browse Menu...
                                </Link>
                            ) : (
                                <Button
                                    onClick={() => clearCart()}
                                    className="text-center font-extralight text-red-500  hover:text-red-700 underline transition-all duration-300 text-sm"
                                >
                                    Clear Cart
                                </Button>
                            )}
                        </div>
                        <div className="h-max w-full grid grid-cols-1 lg:grid-cols-3 gap-8 col-span-2 rounded-md border border-gray-300 p-3">
                            <div className="h-max flex col-span-2 items-center gap-2 flex-col rounded-md border border-gray-300">
                                {cartCount === 0 ? (
                                    <span className="h-full flex items-center p-5">
                                        Your cart is empty please add some items
                                        to continue.
                                    </span>
                                ) : (
                                    <>
                                        {cart.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-full flex justify-between items-center border-b p-3"
                                            >
                                                <div className="group grid grid-cols-3 items-center gap-2">
                                                    <div className="relative overflow-hidden w-full rounded-md">
                                                        <img
                                                            src={
                                                                item.image ||
                                                                "/staticFiles/placeholder.webp"
                                                            }
                                                            alt={item.menu_item}
                                                            className="object-cover cursor-pointer w-[100px] h-[80px] group-hover:scale-105 transition-all duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col col-span-2 gap-1">
                                                        <p className="font-medium text-lg">
                                                            {item.menu_item}
                                                        </p>
                                                        <p className="-mt-1 text-sm text-amber-700">
                                                            {item.price} ETB
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                router.visit(
                                                                    route(
                                                                        "item.details",
                                                                        item.id,
                                                                    ),
                                                                )
                                                            }
                                                            className="w-max text-xs font-extralight text-blue-500 hover:text-blue-700 underline transition-all duration-300 "
                                                        >
                                                            View Details...
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col lg:flex-row-reverse items-end gap-1">
                                                    <Button
                                                        size="icon"
                                                        onClick={() =>
                                                            removeFromCart(
                                                                item.id,
                                                            )
                                                        }
                                                        className="h-7 w-7  rounded-md border border-red-200 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                                    >
                                                        <Trash size={14} />
                                                    </Button>
                                                    <div className="flex items-center gap-1">
                                                        <Button
                                                            size="icon"
                                                            onClick={() =>
                                                                decreaseQuantity(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="h-5 w-5 rounded-md border border-gray-200 bg-gray-100 text-amber-700 hover:bg-amber-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                                        >
                                                            <Minus size={14} />
                                                        </Button>

                                                        <span className="w-6 text-center font-medium">
                                                            {item.quantity}
                                                        </span>

                                                        <Button
                                                            size="icon"
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    item.id,
                                                                )
                                                            }
                                                            className="h-5 w-5 rounded-md border border-gray-200 bg-gray-100 text-amber-700 hover:bg-amber-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                                        >
                                                            <Plus size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            <div className="h-max flex flex-col items-center gap-3 border-t border-gray-300 py-3">
                                <div className="w-full flex flex-col items-center gap-3">
                                    <div className="w-full flex flex-col gap-1">
                                        <Textarea
                                            rows={2}
                                            className={`${Styles.input} w-full resize-none`}
                                            placeholder="Extra instructions..."
                                            value={data.extra}
                                            onChange={(e) =>
                                                setData("extra", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="w-full flex flex-col gap-1">
                                        <TextInput
                                            className={Styles.input}
                                            placeholder="Table Number..."
                                            value={data.tableNumber}
                                            onChange={(e) =>
                                                setData(
                                                    "tableNumber",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <hr className="w-full border border-gray-100" />
                                <div className="w-full flex bg-gray-100 items-center justify-between p-3 rounded-md border border-gray-300">
                                    <h1 className="text-md font-medium font-mono">
                                        Total Items
                                    </h1>
                                    <h1 className="text-base font-medium font-mono">
                                        {cartCount}
                                        <sub className="text-xs">Items</sub>
                                    </h1>
                                </div>
                                <div className="w-full flex items-center bg-gray-100 justify-between p-3 rounded-md border border-gray-300">
                                    <h1 className="text-md font-medium font-mono">
                                        Total Amount
                                    </h1>
                                    <h1 className="text-base font-medium font-mono">
                                        {total}
                                        <sub className="text-xs">Br.</sub>
                                    </h1>
                                </div>
                                <Button
                                    type="button"
                                    onClick={submitOrder}
                                    disabled={processing || cart.length === 0}
                                    className="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-md disabled:opacity-50"
                                >
                                    {processing ? (
                                        <div className="flex items-center gap-1">
                                            <SpinnerCustom />
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        "Place Order"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Right */}
                    <div>
                        <div className="top-24 bg-white rounded-md border border-gray-200 p-6">
                            <h2 className="font-semibold text-lg mb-5">
                                Customer Information
                            </h2>

                            <div className="space-y-3">
                                <div className="w-full flex bg-gray-100 items-center justify-between py-2 px-3 rounded-md border border-gray-300">
                                    <h1 className="text-md font-medium font-mono">
                                        Name
                                    </h1>
                                    <h1 className="text-base font-medium font-mono">
                                        {user?.name}
                                    </h1>
                                </div>
                                <div className="w-full flex bg-gray-100 items-center justify-between py-2 px-3 rounded-md border border-gray-300">
                                    <h1 className="text-md font-medium font-mono">
                                        Username
                                    </h1>
                                    <h1 className="text-base font-medium font-mono">
                                        {user?.username}
                                    </h1>
                                </div>
                                <div className="w-full flex bg-gray-100 items-center justify-between py-2 px-3 rounded-md border border-gray-300">
                                    <h1 className="text-md font-medium font-mono">
                                        Phone
                                    </h1>
                                    <h1 className="text-base font-medium font-mono">
                                        {user?.phone || " Not Provided"}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontLayout>
    );
};

export default CheckOut;
