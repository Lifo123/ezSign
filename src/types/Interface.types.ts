
export type InterfaceProps = {
    currentPage: 'upload' | 'visor' | '',
    isFileUploaded?: boolean,

    //ASIDE LEFT
    asideLeft?: {
        isOpen?: boolean,
    }

    //PDF
    pdf?: {
        x?: number,
        y?: number,
        
        pages?: number,
        currentPage?: number,
    }

    //VISOR EDITOR
    visor?: {
        isImgVisible?: boolean,
    }
}