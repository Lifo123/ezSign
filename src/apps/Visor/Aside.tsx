'use client'

import { Button, ButtonUpload } from "@lifo123/library"
import { useStore } from "@nanostores/react"
import { $appInterface } from "@Stores/AppInterface.store"
import React from "react"
import { formatTimeAgo } from "@Utils/formatTimeago";


interface AsideProps {

}

export function Aside({ ...props }: AsideProps) {
    const INTERFACE = useStore($appInterface, { keys: ['asideLeft'] })

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
                    {
                        INTERFACE?.asideLeft?.items?.map((item, i) => (
                            <li className="p-4 f-row justify-between h-max items-center rounded-lg bg-gray-2 select" key={i}>
                                <div className="f-col justify-between align-start gap-3">
                                    <div className="f-col text-gray-11 fs-14">
                                        <h4 className="text-gray-12 fs-14 fw-600">
                                            {item?.name}
                                            <span className="text-gray-11 fw-400 fs-14 ml-2">
                                                ·
                                                <span className="ml-2">
                                                    {formatTimeAgo(item.lastUsed as number)}
                                                </span>
                                            </span>
                                        </h4>
                                        <p>{item?.description}</p>
                                    </div>
                                    <Button className={'py-1.5 px-4 fs-13 fw-500 pointer btn-third rounded-md w-max'}
                                        onPress={() => { $appInterface.setKey('asideLeft.currentItem', item) }}
                                    >
                                        Select
                                    </Button>
                                </div>
                                <img src={item?.url || ''} className="bg-gray-6 rounded-lg o-hidden bg-cover h-[86px] w-[170px] object-cover bg-center" height={86} width={170} />
                            </li>
                        ))
                    }

                    <li className="p-4 f-col f-center h-32 rounded-lg border-dashed border border-gray-6">
                        <ButtonUpload
                            className="btn btn-secondary rounded-md"
                            onUpload={(file) => {
                                const blobUrl = URL.createObjectURL(file);
                                const img = new Image();

                                img.onload = () => {
                                    const realWidth = img.width;
                                    const realHeight = img.height;

                                    const newItem = {
                                        name: file.name,
                                        description: 'Uploaded on ' + new Date().toLocaleDateString(),
                                        lastUsed: new Date().getTime(),
                                        url: blobUrl,
                                        width: realWidth,   
                                        height: realHeight
                                    };

                                    const currentItems = $appInterface.get()?.asideLeft?.items || [];
                                    const updatedItems = [newItem, ...currentItems];

                                    $appInterface.setKey('asideLeft.items', updatedItems.slice(0, 3));
                                    $appInterface.setKey('asideLeft.currentItem', newItem); 
                                    $appInterface.setKey('pdf.width', realWidth);
                                    $appInterface.setKey('pdf.height', realHeight);
                                };

                                img.src = blobUrl;
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