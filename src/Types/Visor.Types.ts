interface Positions {
    x: number;
    y: number;
    scale: number;
    blendMode: string;
    opacity: number;
    isExclude?: boolean;
    alignment?: "Top-Left" | "Top-Center" | "Top-Right" | "Center-Left" | "Center-Center" | "Center-Right" | "Bottom-Left" | "Bottom-Center" | "Bottom-Right";
}


export interface VisorStore {
    asideLeftState: boolean;
    asideRightState: boolean;
    pageSelected?: number;

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