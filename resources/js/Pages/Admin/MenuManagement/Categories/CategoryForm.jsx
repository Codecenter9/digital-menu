import React from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Button } from "@/components/ui/button";
import Styles from "@/constants/Styles";
import { SpinnerCustom } from "@/Components/ui/spinner";
import { toast } from "sonner";

const CategoryForm = ({ category, isEdit, setOpenFormModal }) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        categoryName: category?.categoryName || "",
        categoryType: category?.categoryType ? "drink" : "meal",
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(
                route("menu-categories.update", {
                    categoryId: category.id,
                }),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenFormModal(false);
                        toast.success("Category updated successfully");
                    },
                    onError: () => {
                        toast.error("Failed to update category.");
                    },
                },
            );
        } else {
            post(route("menu-categories.store"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpenFormModal(false);
                    toast.success("Category added successfully");
                },

                onError: () => {
                    toast.error("Failed to add category.");
                },
            });
        }
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <InputLabel
                    htmlFor="categoryName"
                    value="Category Name"
                    className="text-gray-700"
                />

                <TextInput
                    id="categoryName"
                    value={data.categoryName}
                    onChange={(e) => setData("categoryName", e.target.value)}
                    className={`${Styles.input} mt-1 block w-full`}
                    placeholder="Enter category name"
                />

                <InputError message={errors.categoryName} className="mt-2" />
            </div>
            <div>
                <InputLabel value="Category Type" className="text-gray-700" />

                <div className="mt-2 flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="categoryType"
                            value="meal"
                            checked={data.categoryType === "meal"}
                            onChange={(e) =>
                                setData("categoryType", e.target.value)
                            }
                        />
                        Meal
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="categoryType"
                            value="drink"
                            checked={data.categoryType === "drink"}
                            onChange={(e) =>
                                setData("categoryType", e.target.value)
                            }
                        />
                        Drink
                    </label>
                </div>

                <InputError message={errors.categoryType} className="mt-2" />
            </div>
            <div className="flex justify-end gap-3">
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
                            {isEdit ? "Update Category" : "Create Category"}
                        </div>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;
