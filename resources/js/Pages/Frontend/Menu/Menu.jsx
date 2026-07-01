import React from "react";
import FrontLayout from "@/Layouts/FrontLayout";
import { Head } from "@inertiajs/react";
import BrowseMenu from "@/Components/frontend/ui/BrowseMenu";
import SectionHero from "@/Components/frontend/ui/SectionHero";
const Menu = ({ menuItems, categories }) => {
    const meals = menuItems.filter((item) => !item.menu_category?.is_drink);

    const drinks = menuItems.filter((item) => item.menu_category?.is_drink);

    return (
        <FrontLayout>
            <Head title="Menu" />
            <SectionHero name="Home" link="/" page="Menu" />
            <BrowseMenu meals={meals} drinks={drinks} categories={categories} />
        </FrontLayout>
    );
};

export default Menu;
