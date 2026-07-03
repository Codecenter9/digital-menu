import React, { useState } from "react";

import { useCart } from "@/Context/CartContext";
import { Button } from "@/Components/ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import GuestUser from "@/Pages/Auth/GustUser";
import { router, usePage } from "@inertiajs/react";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SpinnerCustom } from "@/Components/ui/spinner";
const CartDrawer = ({ open, setOpen }) => {
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const [processing, setProcessing] = useState(false);
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

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent
                    className="
                    ml-auto
                    h-full
                    w-full
                    sm:max-w-[420px]
                    bg-white
                    flex flex-col
                "
                >
                    <DrawerHeader className="border-b border-gray-200">
                        <div className="flex items-center justify-between w-full">
                            <DrawerTitle className="text-lg font-semibold">
                                Cart Items
                            </DrawerTitle>

                            {cartCount > 0 && (
                                <button
                                    className="text-red-700 text-sm font-medium underline hover:text-red-600 transition"
                                    onClick={() => clearCart()}
                                >
                                    Clear Cart
                                </button>
                            )}
                        </div>
                    </DrawerHeader>

                    <div className="flex-1 scrollbar-hide overflow-y-auto  p-4">
                        {cart.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Cart is empty
                            </p>
                        ) : (
                            cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center border-b py-3"
                                >
                                    <div className="group grid grid-cols-3 gap-2">
                                        <div className="relative overflow-hidden w-full rounded-md">
                                            <img
                                                src={
                                                    item.image ||
                                                    "/staticFiles/placeholder.webp"
                                                }
                                                alt={item.menu_item}
                                                className="object-cover cursor-pointer w-[90px] h-[70px] group-hover:scale-105 transition-all duration-300"
                                            />
                                        </div>
                                        <div className="flex flex-col col-span-2 gap-1">
                                            <p className="font-medium">
                                                {item.menu_item}
                                            </p>
                                            <p className="text-xs text-amber-700">
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

                                    <div className="flex items-center gap-1">
                                        <Button
                                            size="icon"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
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
                                                increaseQuantity(item.id)
                                            }
                                            className="h-5 w-5 rounded-md border border-gray-200 bg-gray-100 text-amber-700 hover:bg-amber-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                        >
                                            <Plus size={14} />
                                        </Button>

                                        <Button
                                            size="icon"
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="h-7 w-7 rounded-md border border-red-200 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                        >
                                            <Trash size={14} />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="p-5 border-t bg-gray-50/60 backdrop-blur-md space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Total</span>

                            <span className="text-lg font-bold text-gray-900">
                                {total} ETB
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Delivery fee calculated at checkout</span>
                        </div>

                        <Button
                            disabled={cart.length === 0}
                            onClick={() => {
                                if (!user) {
                                    setOpen(false);
                                    setOpenLoginModal(true);
                                    return;
                                }

                                setProcessing(true);
                                router.visit(route("checkout"));
                            }}
                            className="w-full mt-3 bg-amber-600 hover:bg-amber-700 text-white py-3 px-8 rounded-md"
                        >
                            {processing ? (
                                <div className="flex items-center gap-1">
                                    <SpinnerCustom /> Processing...
                                </div>
                            ) : (
                                "Proceed To Checkout"
                            )}
                        </Button>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* dialog content */}

            <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
                <DialogContent className="max-w-sm bg-gray-50">
                    <DialogHeader className="text-gray-700">
                        <DialogTitle>Please login to continue</DialogTitle>
                    </DialogHeader>

                    <GuestUser setOpenLoginModal={setOpenLoginModal} />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CartDrawer;
