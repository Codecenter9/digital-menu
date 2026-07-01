import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Styles from "@/constants/Styles";
import { Plus, ShoppingCart } from "lucide-react";
import { router } from "@inertiajs/react";
const FeaturedMenu = ({ carouselMeals, carouselDrinks }) => {
    return (
        <div className="w-full flex flex-col items-center gap-12 py-12 lg:py-24  px-6 lg:px-12">
            <div className="w-full flex flex-col items-center gap-5">
                <div className="w-full flex items-end justify-between">
                    <div>
                        <span
                            data-aos="fade-up"
                             data-aos-duration="500"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600"
                        >
                            Our Specials
                        </span>

                        <h2
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="mt-1 text-2xl lg:text-3xl font-bold text-gray-900"
                        >
                            Featured Meals
                        </h2>
                    </div>
                </div>
                <Carousel className="w-full ">
                    <CarouselContent className="-ml-1">
                        {carouselMeals?.map((meal, index) => (
                            <CarouselItem
                                key={index}
                                data-aos="fade-up"
                                data-aos-duration={800 + index * 200}
                                data-aos-delay="200"
                                data-aos-offset="100"
                                data-aos-easing="ease-in-out"
                                className="basis-1/1 md:basis-1/2 pl-1 lg:basis-1/4"
                            >
                                <div className="p-1">
                                    <Card className="group border-none rounded-md relative mx-auto w-full max-w-md space-y-5 p-2">
                                        <div className="relative overflow-hidden w-full rounded-md">
                                            <img
                                                src={meal?.image}
                                                alt="Profile"
                                                className="object-cover cursor-pointer h-[150px] w-full group-hover:scale-105 transition-all duration-300"
                                            />
                                            <div className="absolute top-0 right-0">
                                                <Badge
                                                    variant="secondary"
                                                    className={`${Styles.badge}`}
                                                >
                                                    Featured
                                                </Badge>
                                            </div>
                                        </div>
                                        <CardHeader>
                                            <CardTitle className="border-b border-amber-500 w-max">
                                                {meal?.menu_item}
                                            </CardTitle>
                                            <CardDescription className=" mt-3">
                                                {meal?.description?.slice(
                                                    0,
                                                    50,
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardFooter className="flex items-center justify-between gap-3">
                                            <Badge
                                                variant="secondary"
                                                className={`border border-gray-300 text-amber-700 rounded-md`}
                                            >
                                                {meal?.price} ETB
                                            </Badge>
                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "item.details",
                                                            meal.id,
                                                        ),
                                                    )
                                                }
                                                variant="link"
                                                className="hover:text-amber-500"
                                            >
                                                View Detail
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="w-full flex flex-col items-center gap-5">
                <div className="w-full flex items-end justify-between">
                    <div>
                        <span
                            data-aos="fade-up"
                            data-aos-duration="500"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="text-xs lg:text-sm font-semibold uppercase tracking-[0.2em] text-amber-600"
                        >
                            Refresh Yourself
                        </span>

                        <h2
                            data-aos="fade-up"
                            data-aos-duration="800"
                            data-aos-delay="200"
                            data-aos-offset="100"
                            data-aos-easing="ease-in-out"
                            className="mt-1 text-xl lg:text-3xl font-bold text-gray-900"
                        >
                            Drinks For You
                        </h2>
                    </div>
                </div>
                <Carousel className="w-full ">
                    <CarouselContent className="-ml-1">
                        {carouselDrinks?.map((drink, index) => (
                            <CarouselItem
                                key={index}
                                data-aos="fade-up"
                                data-aos-duration={800 + index * 200}
                                data-aos-delay="200"
                                data-aos-offset="100"
                                data-aos-easing="ease-in-out"
                                className="basis-1/1 md:basis-1/2 pl-1 lg:basis-1/4"
                            >
                                <div className="p-1">
                                    <Card className="group border-none rounded-md relative mx-auto w-full max-w-md space-y-5 p-2">
                                        <div className="relative overflow-hidden w-full rounded-md">
                                            <img
                                                src={drink?.image}
                                                alt={drink?.menu_item}
                                                className="object-cover cursor-pointer h-[150px] w-full group-hover:scale-105 transition-all duration-300"
                                            />

                                            <div className="absolute top-0 right-0">
                                                <Badge
                                                    variant="secondary"
                                                    className={Styles.badge}
                                                >
                                                    Featured
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardHeader>
                                            <CardTitle className="border-b border-amber-500 w-max">
                                                {drink?.menu_item}
                                            </CardTitle>

                                            <CardDescription className="mt-3">
                                                {drink?.description?.slice(
                                                    0,
                                                    50,
                                                )}
                                            </CardDescription>
                                        </CardHeader>

                                        <CardFooter className="flex items-center justify-between gap-3">
                                            <Badge
                                                variant="secondary"
                                                className="border border-gray-300 text-amber-700 rounded-md"
                                            >
                                                {drink?.price} ETB
                                            </Badge>

                                            <Button
                                                onClick={() =>
                                                    router.visit(
                                                        route(
                                                            "item.details",
                                                            drink.id,
                                                        ),
                                                    )
                                                }
                                                variant="link"
                                                className="hover:text-amber-500"
                                            >
                                                View Detail
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </div>
    );
};

export default FeaturedMenu;
