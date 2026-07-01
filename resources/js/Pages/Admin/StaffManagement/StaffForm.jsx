import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { SpinnerCustom } from "@/Components/ui/spinner";
import Styles from "@/constants/Styles";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

import { Field, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const StaffForm = ({ selectedStaff, isEdit, setOpenFormModal }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: selectedStaff?.name || "",
        username: selectedStaff?.username || "",
        role: selectedStaff?.role || "",
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(
                route("staff.update", {
                    staffId: selectedStaff.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenFormModal(false);
                        toast.success("Staff updated successfully");
                    },
                    onError: () => {
                        toast.error("Failed to update staff.");
                    },
                },
            );
        } else {
            post(route("staff.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpenFormModal(false);
                    toast.success("Staff added successfully");
                },
                onError: () => {
                    toast.error("Failed to add staff.");
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="">
            <div className="max-h-[400px] space-y-3 overflow-y-auto scrollbar-hide">
                <div className="flex items-center flex-col lg:flex-row gap-3">
                    <div className="w-full">
                        <InputLabel
                            htmlFor="name"
                            value="Name"
                            className="text-gray-700"
                        />

                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`${Styles.input} mt-1 block w-full`}
                            placeholder="Enter menu item"
                        />

                        <InputError message={errors.name} />
                    </div>
                    <div className="w-full">
                        <Field className="w-full">
                            <FieldLabel className="text-gray-700">
                                Role
                            </FieldLabel>

                            <Select
                                value={data.role}
                                onValueChange={(value) =>
                                    setData("role", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="waiter">
                                            Waiter
                                        </SelectItem>
                                        <SelectItem value="guest">
                                            Guest
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.role} />
                        </Field>
                    </div>
                </div>
                <div>
                    <InputLabel
                        htmlFor="username"
                        value="Username"
                        className="text-gray-700"
                    />

                    <TextInput
                        id="username"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className={`${Styles.input} mt-1 w-full`}
                        placeholder="Enter username"
                    />

                    <InputError message={errors.username} />
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-5">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenFormModal(false)}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                    className={Styles.submitButton}
                >
                    {processing ? (
                        <div className="flex items-center gap-1">
                            <SpinnerCustom />
                            <span className="text-muted">Saving</span>
                        </div>
                    ) : (
                        <div className="">
                            {isEdit ? "Update User" : "Create User"}
                        </div>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default StaffForm;
