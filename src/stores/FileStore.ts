import { Controls } from "@Stores/Visor.Store";
import { map } from "nanostores";

interface FileStore {
    file: File | null;
    processFile: File | null;
}

const InitialState: FileStore = {
    file: null,
    processFile: null,
}


export const $file = map<FileStore>(InitialState)


const reset = () => {
    $file.set(InitialState)
    Controls.reset()
}



export const APP = {
    reset,
}



