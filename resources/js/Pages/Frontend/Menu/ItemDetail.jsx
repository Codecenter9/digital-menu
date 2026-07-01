import React, { useState } from "react";
import SectionHero from "@/Components/frontend/ui/SectionHero";
import FrontLayout from "@/Layouts/FrontLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { Badge } from "@/Components/ui/badge";
import Styles from "@/constants/Styles";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/Context/CartContext";
import { Button } from "@/Components/ui/button";
import GuestUser from "@/Pages/Auth/GustUser";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SpinnerCustom } from "@/Components/ui/spinner";
const ItemDetail = ({ menuItem }) => {
    const [processing, setProcessing] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);

    const { cart, increaseQuantity, decreaseQuantity, addToCart } = useCart();

    const { auth } = usePage().props;
    const user = auth?.user;

    const cartItem = cart.find((item) => item.id === menuItem.id);
    return (
        <FrontLayout>
            <Head title={menuItem?.menu_item} />
            <SectionHero name="Menu" link="/menu" page={menuItem?.menu_item} />
            <div className="max-w-5xl mx-auto px-4 lg:px-8 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {menuItem?.menu_item}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Review your order before placing it.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 rounded-md border border-gray-300 p-5">
                    <div className="group w-full relative overflow-hidden rounded-md">
                        <img
                            src={
                                menuItem.image ||
                                "/staticFiles/placeholder.webp"
                            }
                            alt={menuItem.menu_item}
                            className="object-cover cursor-pointer h-[250px] lg:h-[350px] w-full group-hover:scale-105 transition-all duration-300"
                        />

                        <div className="absolute top-2 right-2">
                            <Badge
                                variant="secondary"
                                className={`rounded-md text-gray-100 ${menuItem.is_available ? "bg-green-700" : "bg-amber-700"}`}
                            >
                                {menuItem.is_available
                                    ? "Available"
                                    : "Unavailable"}
                            </Badge>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 h-max flex items-start gap-3 flex-col p-5 rounded-md">
                        {menuItem.description ? (
                            <div className="flex flex-col gap-3 py-1">
                                <span className="w-max text-sm font-bold text-gray-900 border-b border-amber-800 py-1">
                                    Description
                                </span>
                                <span className="text-xs font-medium">
                                    {menuItem?.description}
                                </span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 py-1">
                                <span className="w-max text-sm font-bold text-gray-900 border-b border-amber-800 py-1 ">
                                    Description
                                </span>
                                <span className="text-xs font-medium">
                                    Not Provided
                                </span>
                            </div>
                        )}
                        {menuItem.ingredients && (
                            <div className="flex flex-col gap-3 py-1">
                                <span className="w-max text-sm font-bold text-gray-900 border-b border-amber-800 py-1">
                                    Ingredients
                                </span>
                                <div className="grid grid-cols-2 gap-y-1 gap-x-3 w-full">
                                    {menuItem?.ingredients?.map(
                                        (ingredient, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center gap-2 text-xs"
                                            >
                                                <Check
                                                    size={15}
                                                    className="text-green-400"
                                                />
                                                {ingredient}
                                            </span>
                                        ),
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-3 w-full">
                            <span className="text-base font-mono font-semi-bold">
                                Price -{" "}
                                <span className="text-amber-500">
                                    {menuItem?.price}
                                    <sub className="text-xs">Br.</sub>
                                </span>
                            </span>
                        </div>
                        <div className="flex items-center gap-5 mt-5 justify-between">
                            {!cartItem || cartItem.quantity === 0 ? (
                                <Button
                                    onClick={() => addToCart(menuItem)}
                                    className="w-max bg-amber-700 hover:bg-amber-600 text-white py-3 px-3 lg:px-8 rounded-md"
                                >
                                    Add To Cart
                                </Button>
                            ) : (
                                <div className="flex items-center gap-1">
                                    <Button
                                        size="icon"
                                        onClick={() =>
                                            decreaseQuantity(menuItem.id)
                                        }
                                        className="h-7 w-7 rounded-md border border-gray-200 bg-gray-100 text-amber-700 hover:bg-amber-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                    >
                                        <Minus size={14} />
                                    </Button>

                                    <span className="w-6 text-center font-medium">
                                        {cartItem?.quantity}
                                    </span>

                                    <Button
                                        size="icon"
                                        onClick={() => {
                                            increaseQuantity(menuItem.id);
                                        }}
                                        className="h-7 w-7 rounded-md border border-gray-200 bg-gray-100 text-amber-700 hover:bg-amber-700 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                                    >
                                        <Plus size={14} />
                                    </Button>
                                </div>
                            )}
                            <Button
                                disabled={cart.length === 0}
                                onClick={() => {
                                    if (!user) {
                                        setOpenLoginModal(true);
                                        return;
                                    }

                                    setProcessing(true);
                                    router.visit(route("checkout"));
                                }}
                                className="w-max bg-amber-600 hover:bg-amber-700 text-white py-3 px-3 lg:px-8 rounded-md"
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
                    </div>
                </div>
            </div>

            {/* dialog content */}

            <Dialog open={openLoginModal} onOpenChange={setOpenLoginModal}>
                <DialogContent className="max-w-sm bg-gray-50">
                    <DialogHeader className="text-gray-700">
                        <DialogTitle>Please login to continue</DialogTitle>
                    </DialogHeader>

                    <GuestUser setOpenLoginModal={setOpenLoginModal} />
                </DialogContent>
            </Dialog>
        </FrontLayout>
    );
};

export default ItemDetail;
