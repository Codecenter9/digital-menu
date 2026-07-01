import React from "react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SectionHero = ({ name, link, page }) => {
    return (
        <section className="relative min-h-[calc(30vh-80px)] lg:min-h-[calc(50vh-80px)] flex items-center justify-center overflow-hidden py-24">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('/staticFiles/background-hero-image.webp')",
                }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
            <Breadcrumb className="z-10 mt-10">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href={link}
                            className="text-xl text-white hover:text-amber-500 transition-all duration-300"
                        >
                            {name}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="text-xl text-white hover:text-amber-500 transition-all duration-300" />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-xl text-white">
                            {page}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default SectionHero;
