import TextInput from "@/Components/TextInput";
import { SpinnerCustom } from "@/Components/ui/spinner";
import Styles from "@/constants/Styles";
import { Button } from "@/Components/ui/button";
import { Head, Link, useForm } from "@inertiajs/react";
import { Lock, User } from "lucide-react";

const GuestUser = ({ setOpenLoginModal }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            preserveScroll: true,
            onSuccess: () => setOpenLoginModal(false),
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login Required" />

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <div className="relative">
                        <User
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <TextInput
                            type="text"
                            placeholder="Username"
                            value={data.username}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            className={`${Styles.input} w-full pl-12`}
                        />
                    </div>

                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.username}
                        </p>
                    )}
                </div>

                <div>
                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />

                        <TextInput
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className={`${Styles.input} w-full pl-12`}
                        />
                    </div>

                    {errors.password && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-amber-500 text-gray-100 hover:bg-amber-600"
                >
                    {processing ? <SpinnerCustom /> : "Login"}
                </Button>

                <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-200"></div>
                    <span className="text-xs text-gray-500">OR</span>
                    <div className="h-px flex-1 bg-gray-200"></div>
                </div>

                <Link
                    href={route("register")}
                    className="block w-full rounded-md border border-amber-500 py-2 text-center text-gray-900 transition hover:bg-amber-500 hover:text-white"
                >
                    Create a New Account
                </Link>
            </form>
        </>
    );
};

export default GuestUser;
