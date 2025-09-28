import { Icons } from "@lifo123/library";
import UI from "@lifo123/library/UI";
import { $file } from "@Stores/FileStore";
import { $visor } from "@Stores/Visor.Store";

export default function UploadBTN() {

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file?.type !== "application/pdf") {
            UI.toast.error(`Only PDF files are allowed.`);
            e.target.value = '';
            return;
        }

        const prevData = await $file.get();
        
        $file.set({
            ...prevData,
            file,
        })
        $visor.setKey('isUpload', true)
        e.target.value = '';

    };

    return (
        <>
            <div className="border-dashed border bg-lifo-bg-secondary border-lifo-border rounded-xl px-4 py-6 f-col f-center gap-3 max-w-sm fs-2 w-full mb-5">
                <label className="f-col f-center gap-5" htmlFor="file" >
                    <button
                        onClick={() => {
                            document.getElementById('file')?.click()
                        }}
                        className="btn rounded-md f-row gap-1 f-center mt-5 pointer bg-lifo-bg-third text-lifo-title no-select"
                    >
                        <Icons icon="upload" size={24} style={{ strokeWidth: 20 }} />
                        Upload
                    </button>

                    <input
                        id="file"
                        className="no-select o-h w-0 h-0"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                </label>

                <p className="fs-2 no-select mt-2">Upload a PDF file</p>
                <p className="fs-custom-13 text-lifo-text mb-2 no-select">Only PDF files are allowed for upload.</p>
            </div>

        </>
    )
}