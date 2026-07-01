import React from "react";

const PageTitle = ({ title, description, isDetail = false }) => {
    return (
        <div className={`${isDetail ? "" : "mb-6"}`}>
            <h1
                className={`${isDetail ? "text-lg lg:text-xl" : "text-xl lg:text-3xl"} font-bold text-gray-800`}
            >
                {title}
            </h1>
            {description && (
                <p className="text-sm text-gray-400">{description}</p>
            )}
        </div>
    );
};

export default PageTitle;
