import React, { useEffect, useState } from "react";
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

const MenuForm = ({ menuItem, isEdit, setOpenFormModal, categories }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        itemName: menuItem?.itemName || "",
        categoryId: menuItem?.categoryId || "",
        price: menuItem?.price || "",
        ingredients: menuItem?.ingredients || [],
        description: menuItem?.description || "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(menuItem?.image || null);
    const [ingredientInput, setIngredientInput] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        setImagePreview(menuItem?.image || null);
    }, [menuItem]);

    const addIngredient = () => {
        if (
            ingredientInput.trim() &&
            !data.ingredients.includes(ingredientInput.trim())
        ) {
            setData("ingredients", [
                ...data.ingredients,
                ingredientInput.trim(),
            ]);
            setIngredientInput("");
        }
    };

    const removeIngredient = (index) => {
        setData(
            "ingredients",
            data.ingredients.filter((_, i) => i !== index),
        );
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            post(
                route("menu-items.update", {
                    itemId: menuItem.id,
                }),
                {
                    _method: "PUT",
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: () => {
                        setOpenFormModal(false);
                        toast.success("Menu item updated successfully");
                    },
                    onError: () => {
                        toast.error("Failed to update menu item.");
                    },
                },
            );
        } else {
            post(route("menu-items.store"), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setOpenFormModal(false);
                    toast.success("Menu item added successfully.");
                },
                onError: () => {
                    toast.error("Failed to add menu item.");
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
                            htmlFor="itemName"
                            value="Menu Item"
                            className="text-gray-700"
                        />

                        <TextInput
                            id="itemName"
                            value={data.itemName}
                            onChange={(e) =>
                                setData("itemName", e.target.value)
                            }
                            className={`${Styles.input} mt-1 block w-full`}
                            placeholder="Enter menu item"
                        />

                        <InputError message={errors.itemName} />
                    </div>
                    <div className="w-full">
                        <Field className="w-full">
                            <FieldLabel className="text-gray-700">
                                Category
                            </FieldLabel>

                            <Select
                                value={data.categoryId?.toString()}
                                onValueChange={(value) =>
                                    setData("categoryId", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                            >
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <InputError message={errors.categoryId} />
                        </Field>
                    </div>
                </div>
                <div>
                    <InputLabel
                        htmlFor="price"
                        value="Price"
                        className="text-gray-700"
                    />

                    <TextInput
                        id="price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        className={`${Styles.input} mt-1 w-full`}
                        placeholder="Enter price"
                    />

                    <InputError message={errors.price} />
                </div>
                <div>
                    <InputLabel value="Ingredients" className="text-gray-700" />

                    <div className="flex gap-2 mt-1 items-center">
                        <TextInput
                            value={ingredientInput}
                            onChange={(e) => setIngredientInput(e.target.value)}
                            className={`${Styles.input} block mt-1 w-full`}
                            placeholder="Enter ingredient"
                        />

                        <Button
                            type="button"
                            className={` bg-gray-900 text-gray-300 rounded-md hover:bg-gray-800`}
                            onClick={addIngredient}
                        >
                            Add
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {data.ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="px-3 py-1 rounded-full bg-gray-100 flex items-center gap-2"
                            >
                                {ingredient}
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(index)}
                                    className="text-red-500"
                                >
                                    x
                                </button>
                            </div>
                        ))}
                    </div>

                    <InputError message={errors.ingredients} />
                </div>
                <div>
                    <InputLabel value="Description" className="text-gray-700" />

                    <textarea
                        rows={3}
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className={`${Styles.input} mt-1 block w-full resize-none`}
                        placeholder="Enter menu description"
                    />

                    <InputError message={errors.description} />
                </div>
                <div>
                    <InputLabel value="Image" className="text-gray-700" />

                    <label
                        htmlFor="image"
                        className="mt-2 flex flex-col items-center justify-center w-full min-h-[180px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition"
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 h-10"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>

                                <span className="text-sm">
                                    Click or drag image here
                                </span>
                            </div>
                        )}

                        <input
                            id="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>

                    <InputError message={errors.image} />
                </div>
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
                            {isEdit ? "Update Item" : "Create Menu"}
                        </div>
                    )}
                </Button>
            </div>
        </form>
    );
};

export default MenuForm;
