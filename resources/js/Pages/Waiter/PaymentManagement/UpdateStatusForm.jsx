import React from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/Components/ui/spinner";
import { Field, FieldLabel } from "@/components/ui/field";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import Styles from "@/constants/Styles";

const UpdateStatusForm = ({
    paymentStatus,
    paymentMethod,
    paidAmount,
    setOpenUpdateModal,
    updatedOrder,
}) => {
    const { data, setData, patch, processing, errors } = useForm({
        paymentMethod: paymentMethod || "",
        paidAmount: paidAmount || "",
        paymentStatus: paymentStatus || "pending",
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route("waiter.update-payment-status", updatedOrder), {
            preserveScroll: true,

            onSuccess: () => {
                toast.success("Payment updated successfully.");
                setOpenUpdateModal(false);
            },

            onError: () => {
                toast.error("Unable to update payment.");
            },
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <div>
                <InputLabel value="Payment Method" className="text-gray-700" />

                <div className="mt-3 flex gap-6">
                    {["cbe", "telebirr", "cash"].map((method) => (
                        <label
                            key={method}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="radio"
                                checked={data.paymentMethod === method}
                                onChange={() =>
                                    setData("paymentMethod", method)
                                }
                            />

                            <span className="capitalize">{method}</span>
                        </label>
                    ))}
                </div>

                <InputError message={errors.paymentMethod} />
            </div>

            {/* Paid Amount */}

            <div>
                <InputLabel value="Paid Amount" className="text-gray-700" />

                <TextInput
                    value={data.paidAmount}
                    onChange={(e) => setData("paidAmount", e.target.value)}
                    className={`${Styles.input} mt-2`}
                />

                <InputError message={errors.paidAmount} />
            </div>

            {/* Payment Status */}

            <Field>
                <FieldLabel>Payment Status</FieldLabel>

                <Select
                    value={data.paymentStatus}
                    onValueChange={(value) => setData("paymentStatus", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>

                        <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                </Select>

                <InputError message={errors.paymentStatus} />
            </Field>

            {/* Buttons */}

            <div className="flex justify-end gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenUpdateModal(false)}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={processing}
                    className={Styles.submitButton}
                >
                    {processing ? (
                        <>
                            <SpinnerCustom />
                            Saving...
                        </>
                    ) : (
                        "Update Payment"
                    )}
                </Button>
            </div>
        </form>
    );
};

export default UpdateStatusForm;
