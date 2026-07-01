import React from "react";
import { Search, ShoppingCart, UtensilsCrossed } from "lucide-react";

const steps = [
    {
        id: 1,
        icon: Search,
        title: "Browse the Menu",
        description:
            "Explore our delicious meals and refreshing drinks. Filter by category and discover your favorites.",
    },
    {
        id: 2,
        icon: ShoppingCart,
        title: "Add to Your Order",
        description:
            "Choose the items you love, customize your order if needed, and add them to your cart in seconds.",
    },
    {
        id: 3,
        icon: UtensilsCrossed,
        title: "Enjoy Your Meal",
        description:
            "Place your order and let our team prepare it fresh. Sit back and enjoy a great dining experience.",
    },
];

const HowItWorks = () => {
    return (
        <section className="w-full bg-gray-50 py-16 lg:py-24 px-6 lg:px-12">
            <div className="max-w-7xl">
                <div className="max-w-2xl mb-14">
                    <span
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-out"
                        className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-600"
                    >
                        Simple Process
                    </span>

                    <h2
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-out"
                        className="mt-1 text-3xl font-bold text-gray-900"
                    >
                        How It Works
                    </h2>

                    <p
                        data-aos="fade-up"
                        data-aos-duration="1200"
                        data-aos-delay="200"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-out"
                        className="mt-4 text-gray-600"
                    >
                        Ordering your favorite food has never been easier.
                        Follow these three simple steps and enjoy a delicious
                        meal in no time.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                data-aos="fade-up"
                                data-aos-duration={500 + index * 200}
                                data-aos-delay="200"
                                data-aos-offset="100"
                                data-aos-easing="ease-in-out"
                                className="group cursor-pointer relative rounded-md bg-white p-8 shadow-none hover:shadow-md transition-all duration-300 border border-gray-200"
                            >
                                <div className="absolute -top-4 -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 text-white font-bold">
                                    {step.id}
                                </div>

                                <div className="group-hover:scale-x-[-1] flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 transition-transform duration-300">
                                    {" "}
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="mt-3 text-gray-600 leading-7">
                                    {step.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
