interface Positions {
    x: number;
    y: number;
    scale: number;
    blendMode: string;
}


export interface VisorStore {
    asideLeftState: boolean;
    page: number;
    numPages: number;
    isUpload: boolean;
    isLoading: boolean;
    variationRange: number;


    general: Positions;
    positions?:{
        [key: string]: Positions
    }
    [key: string]: any;
}