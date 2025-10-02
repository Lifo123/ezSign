import { Dropdown, Icons } from "@lifo123/library"


export default function General() {
    return (
        <>
            <span className="aside-subtitle">Position</span>
            <div className="f-row gap-4 f-center fs-1 text-lifo-text">
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">X</span>
                    <input type="text" className="f-grow w-full" defaultValue="50%" placeholder="50%" />
                </div>
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">Y</span>
                    <input type="text" className="f-grow w-full" defaultValue="50%" placeholder="50%" />
                </div>
                <Dropdown margin={8} horizontalMargin={8} items={[[
                    { text: 'Pixels', },
                    { text: 'Percentage', },
                ]]}>
                    <span className="text-lifo-title ps-2.5 pr-1.5 py-1 bg-lifo-bg-third border border-lifo-border-low rounded-md pointer f-row gap-1.5 f-center">
                        px
                        <Icons icon="arrow" size={16} rotate={180} />
                    </span>
                </Dropdown>
            </div>

            <span className="aside-subtitle f-row gap-2 items-center">Alignment <Icons icon="circleInfo" size={16} /></span>

            <div className="f-row justify-between items-center f-nowrap gap-4 text-lifo-text fs-1">
                <div className="f-col f-grow gap-3 w-full">
                    <Dropdown className="text-lifo-title ps-2.5 pr-1.5 py-1 bg-lifo-bg-third border fs-1 border-lifo-border-low rounded-md pointer f-row gap-1.5" text="Ll Scale" margin={8} horizontalMargin={8} items={[[
                        { text: '1x', },
                        { text: '2x', },
                        { text: '3x', },
                        { text: '4x', },
                    ]]} />
                    <Dropdown className="text-lifo-title ps-2.5 pr-1.5 py-1 bg-lifo-bg-third border fs-1 border-lifo-border-low rounded-md pointer f-row gap-1.5" text="-- Center" margin={8} horizontalMargin={8} items={[[
                        { text: 'Left', },
                        { text: 'Center', },
                        { text: 'Right', },
                    ]]} />
                    <Dropdown className="text-lifo-title ps-2.5 pr-1.5 py-1 bg-lifo-bg-third border fs-1 border-lifo-border-low rounded-md pointer f-row gap-1.5" text="| Center" margin={8} horizontalMargin={8} items={[[
                        { text: 'Top', },
                        { text: 'Center', },
                        { text: 'Bottom', },
                    ]]} />
                </div>
                <div className="f-col gap-2 h-full">
                    <div className="input-wrapper w-[120px]">
                        <span className="text-lifo-text fw-500">L(icon)</span>
                        <input type="text" className="f-grow w-full" defaultValue="0º" />
                    </div>
                    <div className="w-full h-full bg-lifo-bg-third rounded-md">

                    </div>
                </div>
            </div>

            <span className="aside-subtitle">Rotation</span>
            <div className="f-row gap-4 f-center fs-1">
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">L(icon)</span>
                    <input type="text" className="f-grow w-full" defaultValue="0º" />
                </div>
                <div className="f-row gap-1">
                    <span className="text-lifo-title px-2.5 py-1 bg-lifo-bg-third border border-lifo-border-low rounded-sm f-row f-nowrap gap-2.5">
                        Icon
                    </span>
                    <span className="text-lifo-title px-2.5 py-1 bg-lifo-bg-third border border-lifo-border-low rounded-sm f-row f-nowrap gap-2.5">
                        Icon
                    </span>
                </div>
            </div>

            <span className="aside-subtitle">Appearance</span>
            <div className="f-row gap-4 f-center fs-1 text-lifo-text">
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">Ll Opacity</span>
                    <input type="text" className="w-full" defaultValue="100%" />
                </div>
                <Dropdown className="fs-1" margin={8} horizontalMargin={8} items={[
                    [{ text: 'Normal', }],
                    [{ text: 'Darkern' }, { text: "Multiply" }, { text: "Color Burn" }, { text: "Linear Burn" }, { text: "Darker Color" }],
                    [{ text: "Lighten" }, { text: "Screen" }, { text: "Color Dodge" }, { text: "Linear Dodge" }, { text: "Lighter Color" }],
                    [{ text: "Overlay" }, { text: "Soft Light" }, { text: "Hard Light" }, { text: "Vivid Light" }, { text: "Linear Light" }, { text: "Pin Light" }, { text: "Hard Mix" }],
                    [{ text: "Difference" }, { text: "Exclusion" }, { text: "Subtract" }, { text: "Divide" }],
                    [{ text: "Hue" }, { text: "Saturation" }, { text: "Color" }, { text: "Luminosity" }],
                ]}>
                    <div className="input-wrapper select-none cursor-pointer">
                        <span className="text-lifo-text fw-500">Ll(icon)</span>
                        Blendmode
                    </div>
                </Dropdown>
            </div>

            <span className="aside-subtitle">Variation range</span>
            <div className="f-row f-nowrap gap-5 fs-1 fw-500 text-lifo-text">
                <input type="range" className="f-grow" />
                0.05%
            </div>

            <span className="aside-subtitle">Scale</span>
            <div className="f-row f-nowrap gap-5 fs-1 fw-500 text-lifo-text">
                <input type="range" className="f-grow" />
                6
            </div>
        </>
    )
}