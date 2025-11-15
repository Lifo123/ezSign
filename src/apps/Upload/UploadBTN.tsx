import { Button, ButtonUpload, toast } from "@lifo123/library";
import { $appInterface } from "@Stores/AppInterface.store";
import { $files, resetPDFState } from "@Stores/File.store";

export default function UploadBTN() {

    return (
        <>
            <div className="border-dashed border bg-gray-2 border-gray-6 rounded-xl px-4 py-8 f-col f-center gap-3 max-w-sm w-full mb-5">
                <label className="f-col f-center gap-5" htmlFor="file" >
                    <ButtonUpload
                        onUpload={(file) => {
                            resetPDFState();
                            $files.setKey('processedFile', null);

                            $files.setKey('originalFile', file);
                            $appInterface.setKey('currentPage', 'visor')
                            $appInterface.setKey('isFileUploaded', true)
                            $appInterface.setKey('visor.isImgVisible', true)

                        }}
                        className="btn rounded-md f-row gap-1 f-center mt-5 pointer bg-gray-4 text-gray-12 no-select"
                        accept={'pdf'}
                    />
                </label>

                <p className="text-p2 no-select mt-2">Upload a PDF file</p>
                <p className="text-p2 text-gray-11 mb-2 no-select">Only PDF files are allowed for upload.</p>
            </div>
        </>
    )
}