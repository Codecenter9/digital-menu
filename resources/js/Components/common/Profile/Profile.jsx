import React from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Styles from "@/constants/Styles";
import { Button } from "@/components/ui/button";
import DangerButton from "@/Components/DangerButton";
import { SpinnerCustom } from "@/Components/ui/spinner";
import { toast } from "sonner";
const Profile = () => {
    const { auth } = usePage().props;
    const user = auth.user;
    const { data, setData, patch, processing, errors } = useForm({
        name: user.name || "",
        username: user.username || "",
        phone: user.phone || "",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
        onSuccess(() => {
            toast.success("Profile updated successfully!");
        });
        onError(() => {
            toast.error("Failed to update profile. Please try again.");
        });
    };

    return (
        <form
            onSubmit={submit}
            className="rounded-md shadow-sm border-t border-slate-200 p-6"
        >
            <div className="max-h-[300px] overflow-y-auto scrollbar-hide grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Profile Image */}
                <div className="w-full flex flex-col items-center justify-between gap-4">
                    <img
                        src="/staticFiles/placeholder.webp"
                        alt="Profile"
                        className="object-cover cursor-pointer h-[200px] w-full rounded-md group-hover:scale-105 transition-all duration-300"
                    />
                </div>

                {/* Fields */}
                <div className="w-full flex-1">
                    <div className="flex flex-col items-center w-full gap-4">
                        <div className="flex items-start flex-col gap-3 bg-gray-100/90 p-4 rounded-md w-full">
                            <h1 className="text-sm text-gray-500">General</h1>
                            <div className="w-full">
                                <InputLabel
                                    value="Name"
                                    className="text-gray-700"
                                >
                                    Name
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    value={data.name}
                                    placeholder="Enter your name"
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className={Styles.input}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    value="Phone"
                                    className="text-gray-700"
                                >
                                    Phone
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    value={data.phone}
                                    placeholder="Enter your phone number"
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    className={Styles.input}
                                />
                                <InputError message={errors.phone} />
                            </div>
                        </div>

                        <div className="flex items-start flex-col gap-3 bg-gray-100/90 p-4 rounded-md w-full">
                            <h1 className="text-sm text-gray-500">
                                Credentials
                            </h1>
                            <div className="w-full">
                                <InputLabel
                                    value="Username"
                                    className="text-gray-700"
                                >
                                    Username
                                </InputLabel>
                                <TextInput
                                    type="text"
                                    value={data.username}
                                    placeholder="Enter your username"
                                    onChange={(e) =>
                                        setData("username", e.target.value)
                                    }
                                    className={Styles.input}
                                />
                                <InputError message={errors.username} />
                            </div>

                            <div className="w-full">
                                <InputLabel
                                    value="Password"
                                    className="text-gray-700"
                                >
                                    Password
                                </InputLabel>
                                <TextInput
                                    type="password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Leave blank to keep current"
                                    className={Styles.input}
                                />
                                <InputError message={errors.password} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center gap-4">
                <DangerButton
                    onClick={() => alert("Feature under development")}
                    className="flex items-center justify-center"
                >
                    Delete Account
                </DangerButton>
                <Button
                    type="submit"
                    disabled={processing}
                    className={`${Styles.submitButton} text-blue-500`}
                >
                    {processing ? (
                        <div className="flex items-center gap-1">
                            <SpinnerCustom />
                            <span className="text-muted">Updating</span>
                        </div>
                    ) : (
                        "Update Profile"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default Profile;
