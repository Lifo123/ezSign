
export default function Extras() {
    return (
        <>
            <span className="aside-subtitle">Exclusion</span>
            <div className="f-row gap-4 f-center fs-1">
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">X</span>
                    <input type="text" className="f-grow w-full" defaultValue="50%" />
                </div>
            </div>

            <span className="aside-subtitle">Inclusion</span>
            <div className="f-row gap-4 f-center fs-1">
                <div className="input-wrapper">
                    <span className="text-lifo-text fw-500">X</span>
                    <input type="text" className="f-grow w-full" defaultValue="50%" />
                </div>
            </div>
        </>
    )
}