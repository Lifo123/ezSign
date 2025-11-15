
type AsideLeftItem = {
    name?: string,
    description?: string,
    lastUsed?: number,
    uploadTime?: number,
    url?: string,
    width?: number,
    height?: number,
}

export type InterfaceProps = {
    currentPage: 'upload' | 'visor' | '',
    isFileUploaded?: boolean,

    //ASIDE LEFT
    asideLeft?: {
        isOpen?: boolean,
        items?: AsideLeftItem[],
        currentItem?: AsideLeftItem
    }

    //PDF
    pdf?: {
        x?: number,
        y?: number,
        width?: number,
        height?: number,
        
        pages?: number,
        currentPage?: number,
    }

    //VISOR EDITOR
    visor?: {
        isImgVisible?: boolean,
        isDraggSelected?: boolean,
    }
}