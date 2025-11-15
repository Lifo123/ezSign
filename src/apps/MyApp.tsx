import { lazy, Suspense } from 'react'
import { useStore } from "@nanostores/react";
import { $appInterface } from "@Stores/AppInterface.store";
import { DarkmodeDrop, PageLoading } from "@lifo123/library";

const VisorApp = lazy(() => import("./Visor/VisorApp"));
const UploadBTN = lazy(() => import("./Upload/UploadBTN"));

export default function Count(props: any) {
    const VISOR = useStore($appInterface, { keys: ['currentPage'] })

    return (
        <>
            {
                VISOR.currentPage === 'upload' ?
                    <Suspense fallback={<PageLoading />} children={<UploadBTN />} />
                    : VISOR.currentPage === 'visor' ?
                        <Suspense fallback={<PageLoading />} children={<VisorApp />} />
                        : null
            }
        </>
    )
}
