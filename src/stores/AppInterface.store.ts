import { deepMap } from "nanostores";
import { ManageLocal } from "@lifo123/library/utils";
import type { InterfaceProps } from "@Types/Interface.types";

const isBrowser = typeof window !== "undefined";

const initialLocalState = isBrowser && ManageLocal.interface.get()
const initialState: InterfaceProps = {
    currentPage: 'upload',
    asideLeft: {
        isOpen: initialLocalState?.asideLeft?.isOpen || true,
        items: [] //fetch api
    },

    pdf: {
        x: initialLocalState?.pdf?.x || 0,
        y: initialLocalState?.pdf?.y || 0,
        width: initialLocalState?.pdf?.width || 0,
        height: initialLocalState?.pdf?.height || 0,
    },

    visor: {
        isImgVisible: initialLocalState?.visor?.isImgVisible || true,
        isDraggSelected: false
    }
}

export const $appInterface = deepMap<InterfaceProps>(initialState)


function debounce(func: (...args: any[]) => void, delay: number) {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

if (isBrowser) {
    const saveToLocal = debounce((state) => {
        ManageLocal.interface.update(state);
    }, 500);

    $appInterface.subscribe((newValue) => {
        saveToLocal(newValue);
    });
}
