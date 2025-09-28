import { useStore } from "@nanostores/react";
import UploadBTN from "./Upload/UploadBTN";
import VisorApp from "./Visor/VisorApp";
import { $visor } from "@Stores/Visor.Store";


export default function Count(props: any) {
    const VISOR = useStore($visor)

    return (
        <main className="w-full h-full fixed top-0 f-col f-center">
            {VISOR.isUpload ?
                <VisorApp />
                : <UploadBTN />
            }
        </main>
    )
}
