import React from "react";
import { useStore } from "@nanostores/react";
import { Document, Page, pdfjs } from "react-pdf";

import MainHeader from "./Main-header";
import { Aside } from "./Aside";
import SignatureDraggable from "./SignatureDraggable";

import { $appInterface } from "../../stores/AppInterface.store";
import { $files } from "@Stores/File.store";
import { Icon } from "public-icons";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function VisorApp() {
    const INTERFACE = useStore($appInterface)
    const FILES = useStore($files, { keys: ['originalFile', 'processedFile', 'state.currentPage'] })
    const fileToDisplay = FILES.processedFile || FILES.originalFile;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        if (!fileToDisplay) return;

        // ⭐️ Guarda todos los metadatos en el store
        $files.setKey('state.name', fileToDisplay.name);
        $files.setKey('state.totalPages', numPages);
        $files.setKey('state.currentPage', 1);
        $files.setKey('state.size', fileToDisplay.size);

    }

    return (
        <>
            <div className="visor-app w-full f-row f-grow h-full relative mt-6"
                data-aside-left={INTERFACE?.asideLeft?.isOpen}
            >
                <Aside />
                <div className="f-grow f-col oy-auto relative">
                    <MainHeader />
                    <section className="px-6 f-col items-center mt-9 mb-12">
                        <div className="bg-white flex f-col rounded-xs text-black relative">
                            <SignatureDraggable />
                            <div className="visor-render-file z-0">
                                <Document
                                    file={fileToDisplay}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page
                                        pageNumber={FILES.state?.currentPage} width={795}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        loading={<span className="custom-spin h-full w-full flex f-center">
                                            <Icon icon='loader-circle' size={48} color="var(--color-gray-11)" />
                                        </span>}
                                    />
                                </Document>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
        </>
    )
}