import React from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Logo & Description */}
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Restaurant<span className="text-amber-400">.</span>
                        </h2>
                        <p className="mt-5 leading-7 text-gray-400">
                            Discover a variety of delicious dishes crafted with
                            fresh ingredients and passion. Enjoy fast online
                            ordering, convenient delivery, and a memorable
                            dining experience—all from the comfort of your home.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Useful Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="/about"
                                    className="hover:text-amber-400 transition"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/menu"
                                    className="hover:text-amber-400 transition"
                                >
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-amber-400 transition"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Contact
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <MapPin size={18} className="text-amber-400" />
                                <span>Addis Ababa, Ethiopia</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-amber-400" />
                                <span>juhar8264@dm.com</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-amber-400" />
                                <span>+251 982648798</span>
                            </div>
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-5">
                            Follow Us
                        </h3>

                        <p className="text-gray-400 mb-5">
                            Let's connect and build something amazing together.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300"
                            >
                                <Send size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>
                        © {new Date().getFullYear()} Juhar Endris. All Rights
                        Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
