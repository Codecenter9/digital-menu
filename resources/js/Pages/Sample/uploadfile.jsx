import { Head, useForm } from "@inertiajs/react";
import GuestLayout from "../Guest/GuestLayout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Styles from "@/constants/Styles";

export default function UploadButton({ user }) {
    const { data, setData, post, processing, progress, errors, reset } =
        useForm({
            file: null,
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("files.upload", user.id), {
            forceFormData: true,

            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Upload File" />

            <div className="container max-w-2xl p-10">
                <Card className="p-3">
                    <CardHeader>
                        <CardTitle>Upload File</CardTitle>

                        <CardDescription>
                            Upload documents, images, videos, and other files to
                            Google Drive.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Choose File
                                </label>

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setData("file", e.target.files[0])
                                    }
                                    className="w-full rounded-lg border p-3 cursor-pointer file:bg-primary file:text-primary-foreground file:border-0 file:px-4 file:py-2 file:rounded-md"
                                />

                                <p className="text-xs text-muted-foreground">
                                    Supported formats: images, PDFs, videos,
                                    documents, archives, etc.
                                </p>

                                {data.file && (
                                    <div className="rounded-md border bg-muted p-3">
                                        <p className="font-medium">
                                            Selected File
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {data.file.name}
                                        </p>

                                        <p className="text-sm text-muted-foreground">
                                            {(
                                                data.file.size /
                                                1024 /
                                                1024
                                            ).toFixed(2)}{" "}
                                            MB
                                        </p>
                                    </div>
                                )}

                                {errors.file && (
                                    <p className="text-sm text-red-500">
                                        {errors.file}
                                    </p>
                                )}
                            </div>

                            {progress && (
                                <div className="space-y-2">
                                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-300"
                                            style={{
                                                width: `${progress.percentage}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        Uploading... {progress.percentage}%
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={processing || !data.file}
                                variant="primary"
                                className={`${Styles.button} w-full text-gray-900 bg-gray-100`}
                            >
                                {processing ? "Uploading..." : "Upload File"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
