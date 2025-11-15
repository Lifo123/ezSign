import { clamp } from "@lifo123/library/utils";
import { deepMap } from "nanostores";

type FileProps = {
    originalFile?: File | null;
    processedFile?: File | null;
    state?: {
        name?: string,
        totalPages?: number,
        currentPage?: number,
        size?: number,
    }
}

const initialState: FileProps = {
    originalFile: null,
    processedFile: null,
    state: {
        name: '',
        totalPages: 0,
        currentPage: 0,
        size: 0,
    }
}

export const $files = deepMap<FileProps>(initialState)

export function resetPDFState() {
    $files.set(initialState)
}

export function controlPage(number: number) {
    const { state } = $files.get();
    $files.setKey('state.currentPage',
        clamp(state?.currentPage as number + number, 1, state?.totalPages)
    )
}

export function nextPage() {
    controlPage(1)
}

export function prevPage() {
    controlPage(-1)
}

export function downloadFile(file: File) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
}