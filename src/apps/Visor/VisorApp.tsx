import { useStore } from "@nanostores/react";

import { $file } from "@Stores/FileStore";
import { Document, Page, pdfjs } from "react-pdf";
import { $visor, Controls } from "../../stores/Visor.Store";
import { registerKeybinds } from "../../utils/Visor.Keybins";
import AsideMenu from "./Aside/AsideMenu";
import MainApp from "./MainApp";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function VisorApp() {
    const FILE = useStore($file)
    const VISOR = useStore($visor)


    return (
        <>
            <div className="w-full f-row f-grow h-full relative">
                <AsideMenu />
                <MainApp />
            </div>
        </>
    )
}