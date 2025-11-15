'use client'

import { useStore } from "@nanostores/react";
import { $files } from "@Stores/File.store";
import { Icon } from "public-icons";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface VisorPdfProps {
    fileToDisplay: File | undefined | null;
}

export default function VisorPdf({ fileToDisplay }: VisorPdfProps) {
    const FILES = useStore($files, { keys: ['state.currentPage'] })

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        if (!fileToDisplay) return;

        $files.setKey('state.name', fileToDisplay.name);
        $files.setKey('state.totalPages', numPages);
        $files.setKey('state.currentPage', 1);
        $files.setKey('state.size', fileToDisplay.size);

    }

    return (
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
    )
}