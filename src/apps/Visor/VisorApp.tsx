import UI from "@lifo123/library/UI";
import { Dropdown, Icons } from "@lifo123/library";
import { useStore } from "@nanostores/react";

import { $file, APP } from "@Stores/FileStore";
import { Document, Page, pdfjs } from "react-pdf";
import { $visor, Controls } from "../../stores/Visor.Store";
import { registerKeybinds } from "../../utils/Visor.Keybins";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function VisorApp() {
    const FILE = useStore($file)
    const VISOR = useStore($visor)

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        $visor.setKey("numPages", numPages)
        registerKeybinds();
    };

    return (
        <>

            <section className="bg-lifo-bg-secondary w-full h-14 f-row justify-between items-center px-4 relative border-b border-lifo-bg-third">
                <div className="f-row gap-3">
                    <Icons icon="menu" size={24} onClick={() => { $visor.setKey('asideLeftState', !VISOR.asideLeftState) }} />
                    <p className="text-ellipsis max-w-md text-nowrap w-full o-hidden">{FILE.file?.name || 'No file selected'}</p>
                </div>
                <div className="h-full bg-lifo-bg-secondary absolute top-0 left-1/2 f-row f-center px-4 gap-2 transform -translate-x-1/2">
                    <Icons icon="arrow" size={24} rotate={-90} onClick={Controls.prev} />
                    {VISOR.page} / {VISOR.numPages}
                    <Icons icon="arrow" size={24} rotate={90} onClick={Controls.next} />
                </div>
                <div className="f-row gap-3">
                    <Icons icon="upload" size={24} rotate={-180} onClick={() => {
                        if(!FILE.file) return;
                        const blob = new Blob([FILE.file], { type: "application/pdf" });
                        const url = URL.createObjectURL(blob);

                        const a = document.createElement("a");
                        a.href = url;
                        a.download = FILE.file.name; // 👈 conserva el nombre original
                        document.body.appendChild(a);
                        a.click();
                        a.remove();

                        URL.revokeObjectURL(url);
                    }} />
                    <Dropdown items={[
                        [
                            { text: 'Nothing', },
                            {
                                text: 'Close File', onClick() {
                                    UI.Dialog.show({
                                        title: 'Are you sure?',
                                        description: 'You will lose all your data.',
                                        onClick: APP.reset
                                    })
                                },
                            },
                        ]
                    ]}>

                        <Icons icon="setting" size={24} onClick={() => { }} />
                    </Dropdown>
                </div>

            </section >

            <section className="w-full f-row f-grow h-[calc(100vh-4rem)] relative">
                <div className="flex f-grow h-full justify-center p-4 oy-auto">
                    <aside className={`app-aside-left bg-lifo-bg-secondary h-full absolute top-0 left-0 w-0 o-hidden z-50 ${VISOR.asideLeftState ? ' active' : ''}`}>
                        <div className={`h-full w-full p-4 border-r border-lifo-bg-third f-col justify-between ${VISOR.asideLeftState ? ' opacity-100' : ' opacity-0'}`}>
                            <div className="f-col gap-3 text-nowrap">
                                Eje X:
                                <input type="range" step={1} min={0} max={100} value={VISOR.general.x} onChange={(e) => $visor.setKey('general.x', Number(e.target.value))} />
                                Eje Y:
                                <input type="range" step={1} min={0} max={100} value={VISOR.general.y} onChange={(e) => $visor.setKey('general.y', Number(e.target.value))} />
                                Scale:
                                <input type="range" step={0.1} min={0.1} max={1} value={VISOR.general.scale} onChange={(e) => $visor.setKey('general.scale', Number(e.target.value))} />
                                Variation range:
                                <input type="range" step={0.1} min={0} max={1} value={VISOR.variationRange} onChange={(e) => $visor.setKey('variationRange', Number(e.target.value))} />
                            </div>
                            <div>
                                <button className="btn btn-third w-full rounded-md" onClick={Controls.procesar}>
                                    Procesar archivo
                                </button>
                            </div>
                        </div>
                    </aside>

                    <Document
                        file={FILE.file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="relative page-container f-col gap-4" // 👈 deja espacio del header
                    >
                        {Array.from(new Array(VISOR.numPages), (_, index) => (
                            <div key={`page_${index + 1}`} className="flex justify-center">
                                <Page
                                    pageNumber={index + 1}   // empieza en 1
                                    height={window.innerHeight - 87} // 👈 deja espacio del header
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                            </div>
                        ))}
                    </Document>


                </div>
            </section>
        </>
    )
}