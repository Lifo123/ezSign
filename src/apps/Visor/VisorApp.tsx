import { lazy, Suspense } from "react";
import { useStore } from "@nanostores/react";
import MainHeader from "./Main-header";
import { Aside } from "./Aside";

import { $appInterface } from "../../stores/AppInterface.store";
import { $files } from "@Stores/File.store";
import { Icon } from "public-icons";

const VisorPdf = lazy(() => import("./VisorPdf"));
const SignatureDraggable = lazy(() => import("./SignatureDraggable"));

export default function VisorApp() {
    const INTERFACE = useStore($appInterface)
    const FILES = useStore($files, { keys: ['originalFile', 'processedFile', 'state.currentPage'] })
    const fileToDisplay = FILES.processedFile || FILES.originalFile;


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
                            <Suspense fallback={<span className="custom-spin h-full w-full flex f-center">
                                <Icon icon='loader-circle' size={48} color="var(--color-gray-11)" />
                            </span>}>
                                <SignatureDraggable />
                            </Suspense>
                            <div className="visor-render-file z-0">
                                <Suspense fallback={<span className="custom-spin h-full w-full flex f-center">
                                    <Icon icon='loader-circle' size={48} color="var(--color-gray-11)" />
                                </span>}>
                                    <VisorPdf fileToDisplay={fileToDisplay} />
                                </Suspense>
                            </div>
                        </div>
                    </section>
                </div >
            </div >
        </>
    )
}