import React from "react";
import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    UtensilsCrossed,
    ChefHat,
    Heart,
    Leaf,
} from "lucide-react";

const Hero = () => {
    return (
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden py-24">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/staticFiles/hero-image.webp')",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />

            <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 lg:px-12">
                <div className="max-w-3xl">
                    <div
                        data-aos="zoom-in"
                        className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur-md"
                    >
                        <UtensilsCrossed className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-white">
                            Welcome to Our Restaurant
                        </span>
                    </div>

                    <h1
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay="200"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-out"
                        className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl"
                    >
                        Delicious Food,
                        <br />
                        <span className="text-orange-500">Made with Love</span>
                    </h1>

                    <p
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="200"
                        data-aos-offset="100"
                        data-aos-easing="ease-in-out"
                        className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-300"
                    >
                        Discover the perfect blend of taste, quality, and
                        freshness. Every dish is carefully prepared by our
                        expert chefs using premium ingredients.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/menu"
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-orange-600 hover:shadow-xl"
                        >
                            <UtensilsCrossed className="h-5 w-5" />
                            Browse Menu
                            <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/contact"
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                        >
                            Reserve a Table
                        </Link>
                    </div>

                    {/* Features */}
                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="flex items-start gap-3"
                        >
                            <Leaf className="mt-1 h-6 w-6 text-orange-500" />
                            <div>
                                <h4 className="font-semibold text-white">
                                    Fresh Ingredients
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Always fresh and organic
                                </p>
                            </div>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="flex items-start gap-3"
                        >
                            <ChefHat className="mt-1 h-6 w-6 text-orange-500" />
                            <div>
                                <h4 className="font-semibold text-white">
                                    Expert Chefs
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Skilled & passionate
                                </p>
                            </div>
                        </div>

                        <div
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="flex items-start gap-3"
                        >
                            <Heart className="mt-1 h-6 w-6 text-orange-500" />
                            <div>
                                <h4 className="font-semibold text-white">
                                    Made with Love
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Prepared with care
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default Hero;
