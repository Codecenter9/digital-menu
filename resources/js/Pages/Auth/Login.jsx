import TextInput from "@/Components/TextInput";
import { SpinnerCustom } from "@/Components/ui/spinner";
import Styles from "@/constants/Styles";
import GuestLayout from "@/Layouts/GuestLayout";
import { Button } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { Mail, Lock } from "lucide-react";

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Login" />
            <div className="relative flex flex-col items-center px-3 lg:px-10 py-12 w-full gap-3 bg-gray-900/50 h-screen overflow-hidden">
                <span className="absolute w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl -top-40 -right-40"></span>
                <span className="absolute w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl -bottom-40 -left-40"></span>

                <div className="flex flex-col items-center justify-center w-full gap-2 z-10">
                    <h1 className="text-xl text-gray-100 font-serif">
                        Login Portal
                    </h1>
                    <p className="text-base text-gray-400 font-serif text-center">
                        Login with correct credentials to access the system!
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="w-full flex flex-col gap-5 bg-gray-900/30 px-5 lg:px-10 py-10 rounded-md max-w-md z-10"
                >
                    {/* User Name */}
                    <div>
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
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
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between gap-2 my-2">
                        <label className="flex items-center gap-2 text-gray-400 text-sm">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                                className="rounded"
                            />
                            Remember Me
                        </label>
                        <Link
                            href={route("register")}
                            className="rounded-md text-sm text-gray-300 underline hover:text-gray-600 focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0"
                        >
                            Not a member yet?
                        </Link>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="rounded-md font-mono py-2 text-white bg-emerald-500/90 hover:bg-emerald-600 transition-all duration-300 disabled:opacity-50"
                    >
                        {processing ? (
                            <div className="w-full flex items-center justify-center">
                                <SpinnerCustom />
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <div className="flex items-center w-full gap-4 my-4">
                        <div className="flex-1 h-px bg-gray-800"></div>
                        <span className="text-gray-400 text-sm">or</span>
                        <div className="flex-1 h-px bg-gray-800"></div>
                    </div>

                    <Button
                        type="button"
                        className="rounded-md font-mono py-2 text-white bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300"
                    >
                        Continue with Google
                    </Button>
                </form>
            </div>
        </GuestLayout>
    );
}
