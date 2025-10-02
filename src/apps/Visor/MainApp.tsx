import { useStore } from "@nanostores/react";
import { $file } from "@Stores/FileStore";
import { $visor } from "@Stores/Visor.Store";
import { registerKeybinds } from "@Utils/Visor.Keybins";
import { Document, Page, pdfjs } from "react-pdf";
import AppUtils from "./AppUtils";
import { Icons } from "@lifo123/library";

interface MainAppProps {

}

export default function MainApp() {
    const FILE = useStore($file)
    const VISOR = useStore($visor)

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        $visor.setKey("numPages", numPages)
        registerKeybinds();
    };

    return (
        <main className="f-col f-grow items-center p-4 oy-auto mx-auto relative w-full ">
            <AppUtils />
            <div key={`page_1`} className="flex justify-center page-container mt-10">

                <div className="w-full f-col gap-2.5 items-start h-max">

                    <div className="f-row w-full justify-between fs-2 items-center">
                        <span className="text-lifo-title">
                            Page 1 <span className="text-lifo-text">- (include)</span>
                        </span>
                        <div className="text-lifo-text f-row gap-2 f-center">
                            <Icons icon="check" style={{ strokeWidth: 4 }} />
                            <svg width="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0' />
                                <path d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-3-6L6 18' />
                            </svg>
                            <svg width="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                <path d='M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z' />
                                <path d='M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3' />
                            </svg>
                        </div>
                    </div>

                    <span className="a4 bg-white z-10 text-black mb-4">
                        a4
                        <img src="images/firma_001.jpg" alt="img" className="absolute bg-cover bg-no-repeat bg-center" />
                    </span>
                </div>
            </div>
            
            <Document
                file={FILE.processFile ?? FILE.file}
                onLoadSuccess={onDocumentLoadSuccess}
                className="page-container f-col gap-4 mt-11 items-center"
            >
                {Array.from(new Array(VISOR.numPages), (_, index) => (
                    <div key={`page_${index + 1}`} className="flex justify-center">

                        <div className="w-full f-col gap-2.5 items-start h-max">

                            <div className="f-row w-full justify-between fs-2 items-center">
                                <span className="text-lifo-title">
                                    Page {index + 1} <span className="text-lifo-text">- (include)</span>
                                </span>
                                <div className="text-lifo-text f-row gap-2 f-center">
                                    <Icons icon="check" style={{ strokeWidth: 4 }} />
                                    <svg width="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <path d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0' />
                                        <path d='M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0m-3-6L6 18' />
                                    </svg>
                                    <svg width="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                                        <path d='M9.533 11.15A1.82 1.82 0 0 0 9 12.438V15h2.578c.483 0 .947-.192 1.289-.534l7.6-7.604a1.82 1.82 0 0 0 0-2.577l-.751-.751a1.82 1.82 0 0 0-2.578 0z' />
                                        <path d='M21 12c0 4.243 0 6.364-1.318 7.682S16.242 21 12 21s-6.364 0-7.682-1.318S3 16.242 3 12s0-6.364 1.318-7.682S7.758 3 12 3' />
                                    </svg>
                                </div>
                            </div>

                            <Page
                                pageNumber={index + 1}
                                height={window.innerHeight}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                                className={'relative o-hidden mb-6'}
                            >
                                <img src="images/firma_001.png" alt="img" className="absolute bg-cover bg-no-repeat bg-center z-60" />
                            </Page>
                        </div>
                    </div>
                ))}
            </Document> 
        </main>
    )
}