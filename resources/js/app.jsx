import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { CartProvider } from "./Context/CartContext";
import Preloader from "./Components/common/Preloader";

const appName = import.meta.env.VITE_APP_NAME || "Digital Menu";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <CartProvider>
                <Preloader>
                    <App {...props} />
                </Preloader>
            </CartProvider>,
        );
    },
    progress: {
        color: "#4B5563",
    },
});
