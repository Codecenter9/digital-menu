import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock, Mail, Phone, User } from "lucide-react";
import { useState } from "react";

export default function Register() {
    const [canAnyOneRegister] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        username: "",
        password: "",
        phone: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            {!canAnyOneRegister ? (
                <div className="flex flex-col gap-3 bg-yellow-100 border-l-4 border-yellow-500 p-4">
                    <h1 className="text-xl text-yellow-700">
                        Registration is currently closed.
                    </h1>
                    <p className="text-sm text-yellow-700">
                        Please check back later or contact support.
                    </p>
                    <Link
                        className="text-sm text-blue-700 underline"
                        href={route("home")}
                    >
                        Home
                    </Link>
                </div>
            ) : (
                <div className="relative flex flex-col items-center px-3 lg:px-10 py-12 w-full gap-3 bg-gray-900/50 h-screen overflow-hidden">
                    <span className="absolute w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl -top-40 -right-40"></span>
                    <span className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -bottom-40 -left-40"></span>

                    <div className="flex flex-col items-center justify-center w-full gap-2 z-10">
                        <h1 className="text-xl text-gray-100 font-serif">
                            Registration Portal
                        </h1>
                        <p className="text-base text-gray-400 font-serif text-center">
                            Register with correct credentials to access the
                            system!
                        </p>
                    </div>
                    <form
                        onSubmit={submit}
                        className="w-full flex overflow-y-auto scrollbar-hide flex-col gap-5 bg-gray-900/30 px-5 lg:px-10 py-10 rounded-md max-w-md z-10"
                    >
                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="name" value="Name" />
                            <div className="relative flex items-center">
                                <TextInput
                                    type="text"
                                    aria-label="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={`${Styles.input} px-14 bg-gray-800 text-gray-100`}
                                    placeholder="Enter your name..."
                                />
                                <User className="absolute left-3 text-gray-500" />
                            </div>

                            {errors.name && (
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="username" value="User Name" />
                            <div className="relative flex items-center">
                                <TextInput
                                    type="text"
                                    aria-label="User Name"
                                    value={data.username}
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className={`${Styles.input} px-14 bg-gray-800 text-gray-100`}
                                    placeholder="Enter username..."
                                />
                                <Mail className="absolute left-3 text-gray-500" />
                            </div>

                            {errors.username && (
                                <InputError
                                    message={errors.username}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="password" value="Password" />
                            <div className="relative flex items-center">
                                <TextInput
                                    type="password"
                                    aria-label="Password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    className={`${Styles.input} px-14 bg-gray-800 text-gray-100`}
                                    placeholder="Enter password..."
                                />
                                <Lock className="absolute left-3 text-gray-500" />
                            </div>

                            {errors.password && (
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <div className="relative flex items-center">
                                <TextInput
                                    type="text"
                                    aria-label="Phone"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className={`${Styles.input} px-14 bg-gray-800 text-gray-100`}
                                    placeholder="Enter phone number..."
                                />
                                <Phone className="absolute left-3 text-gray-500" />
                            </div>

                            {errors.phone && (
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <Link
                                href={route("login")}
                                className="rounded-md text-sm text-gray-300 underline hover:text-gray-600 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0"
                            >
                                Already registered?
                            </Link>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="rounded-md font-mono py-1.5 px-5 text-white bg-emerald-500/90 hover:bg-emerald-600 transition-all duration-300 disabled:opacity-50"
                            >
                                {processing ? "Saving..." : "Register"}
                            </Button>
                        </div>
                    </form>
                </div>
            )}
        </GuestLayout>
    );
}
