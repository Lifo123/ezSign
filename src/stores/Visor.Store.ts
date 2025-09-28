import { LocalPrefs, projectName, } from "@lifo123/library/Stores";
import { generatePDF } from "@Utils/GeneratePDF.utils";
import { deepMap } from "nanostores";
import type { VisorStore } from "src/Types/Visor.Types";

const isBrowser = typeof window !== "undefined";

const initialState = {
    asideLeftState: false,

    page: 1,
    numPages: 1,
    isUpload: false,
    isLoading: false,
    variationRange: 0,

    general: {
        blendMode: "Multiply",
        scale: isBrowser ? LocalPrefs.get('scale') ?? 0.3 : 0.3,
        x: isBrowser ? LocalPrefs.get('x') ?? 0 : 0,
        y: isBrowser ? LocalPrefs.get('y') ?? 0 : 0,
    }

}

export const $visor = deepMap<VisorStore>(initialState)



if (isBrowser) {

    $visor.subscribe((value) => {
        LocalPrefs.set(value)
    })
}



//Funcionts

const controlPage = (type: 'prev' | 'next') => {
    const prevData = $visor.get();

    $visor.set({
        ...prevData,
        page: Math.min(Math.max(1, prevData.page + (type === 'next' ? 1 : -1)), prevData.numPages)
    })
}

const controlY = (number: number) => {
    const VISOR = $visor.get()
   

}

const reset = () => {
    $visor.set(initialState)
}

export const Controls = {
    prev: () => controlPage('prev'),
    next: () => controlPage('next'),
    reset,
    procesar: () => generatePDF(),
}