'use client'

import { Button, ButtonUpload } from "@lifo123/library"
import { useStore } from "@nanostores/react"
import { $appInterface } from "@Stores/AppInterface.store"


interface AsideProps {

}

export function Aside({ ...props }: AsideProps) {
    const INTERFACE = useStore($appInterface, { keys: ['asideLeft.isOpen'] })

    return (
        <aside className="app-aside f-col no-wrap text-nowrap relative ">
            <section className="absolute h-full w-full px-4 f-col gap-6 pr-6">
                <div className="border-b f-col gap-3 pb-6 border-gray-5">
                    <span className="fw-600 fs-14 text-gray-11">Label Search</span>
                    <input
                        type="search"
                        placeholder="Search..."
                        className="px-4 py-2.5 rounded-md bg-gray-3 border border-gray-5 fs-14 fw-600 text-gray-12"
                    />
                </div>
                <ul className="f-col gap-4">
                    <li className="fw-600 fs-14 text-gray-11">Last used</li>
                    <li className="p-4 f-row justify-between h-max items-center rounded-lg bg-gray-2">
                        <div className="f-col justify-between align-start gap-3">
                            <div className="f-col text-gray-11 fs-14">
                                <h4 className="text-gray-12 fs-14 fw-600">
                                    Document name.pdf <span className="text-gray-11 fw-400 fs-14 ml-2">·<span className="ml-2">3h ago</span></span>
                                </h4>
                                <p>Lorem ipsum dolor, sit amet conscet.</p>
                            </div>
                            <Button className={'py-1.5 px-4 fs-13 fw-500 pointer btn-third rounded-md w-max'}>
                                Select
                            </Button>
                        </div>
                        <img className="bg-gray-6 rounded-lg o-hidden bg-cover h-[86px] w-[170px]" />
                    </li>

                    <li className="p-4 f-col f-center h-32 rounded-lg border-dashed border border-gray-6">
                        <ButtonUpload
                            className="btn btn-secondary rounded-md"
                            onUpload={(file) => {
                                console.log(file);
                            }}
                            accept={['jpg', 'png']}
                        />
                        <span className="fs-13 fw-500 text-gray-10 mt-2">Upload a new document</span>
                    </li>
                </ul>
            </section>
        </aside>
    )
}