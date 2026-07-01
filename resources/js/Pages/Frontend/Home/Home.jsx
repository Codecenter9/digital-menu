import FeaturedMenu from "@/Components/frontend/ui/FeaturedMenu";
import Hero from "@/Components/frontend/ui/Hero";
import HowItWorks from "@/Components/frontend/ui/HowItWorks";
import FrontLayout from "@/Layouts/FrontLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Home = ({ menuItems }) => {
    const carouselMeals =
        menuItems
            ?.filter((item) => !item.menu_category?.is_drink)
            ?.slice(0, 5) || [];

    const carouselDrinks =
        menuItems
            ?.filter((item) => item.menu_category?.is_drink)
            ?.slice(0, 5) || [];
    return (
        <FrontLayout>
            <Head title="Home" />
            <Hero />
            <FeaturedMenu
                carouselMeals={carouselMeals}
                carouselDrinks={carouselDrinks}
            />
            <HowItWorks />
        </FrontLayout>
    );
};

export default Home;
