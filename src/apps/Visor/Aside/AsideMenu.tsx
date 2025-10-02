import { Icons } from "@lifo123/library";
import React from "react";
import General from "./General";
import Extras from "./Extras";
import { $file } from "@Stores/FileStore";
import { useStore } from "@nanostores/react";

export default function AsideMenu() {
    const FILE = useStore($file)

    const [tab, setTab] = React.useState(0)


    return (
        <aside className="app-aside-left bg-lifo-bg-secondary border-r border-lifo-border f-col">
            <div className="f-row justify-between fs-custom-15 fw-400 border-b border-lifo-border p-4 items-center text-lifo-title">
                {FILE.file?.name || 'No file selected'}
                <span className="btn-icon rounded-sm hover:bg-lifo-bg-third d-flex f-center">
                    <Icons icon="upload" size={22} />
                </span>
            </div>

            <section className="f-col gap-4 py-4 px-2 pb-6">
                <div className="f-row justify-between fs-1 items-center">
                    <div className="f-row gap-1">
                        <span className={`hover:bg-lifo-bg-third px-2 py-1 rounded-md pointer ${tab === 0 && 'bg-lifo-bg-third'}`} onClick={() => setTab(0)}>General</span>
                        <span className={`hover:bg-lifo-bg-third px-2 py-1 rounded-md pointer ${tab === 1 && 'bg-lifo-bg-third'}`} onClick={() => setTab(1)}>Extras</span>
                    </div>
                    <span>
                        <Icons icon="dots3" size={22} />
                    </span>
                </div>

                <div className="f-col w-full gap-2.5 px-2">
                    {
                        tab === 0 ? <General /> :
                            tab === 1 ? <Extras /> :
                                <>no page</>
                    }
                </div>
            </section>

            <section className="f-col justify-end f-grow fs-1 text-lifo-text p-4 border-t border-lifo-border-low">
                EzSign version 1.0.0.0
            </section>
        </aside>
    )
}