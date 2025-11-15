'use client'

import { useStore } from "@nanostores/react";
import { $appInterface } from "@Stores/AppInterface.store";
import React from "react";
import { Rnd, type RndResizeCallback } from "react-rnd"

type RndRef = Rnd & { resizableElement: HTMLElement };

export default function SignatureDraggable() {
    const { visor, pdf, asideLeft } = useStore($appInterface, {
        keys: [
            'pdf.x', 'pdf.y',
            'asideLeft.currentItem',
            'visor.isDraggSelected'
        ]
    })

    const rndRef = React.useRef<RndRef>(null);

    const onResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
        const currentItemFromStore = $appInterface.get()?.asideLeft?.currentItem;

        $appInterface.setKey('asideLeft.currentItem', {
            ...currentItemFromStore,
            width: ref.offsetWidth,
            height: ref.offsetHeight
        });

        $appInterface.setKey('pdf', {
            x: position.x,
            y: position.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight
        });
    };

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (rndRef.current && !rndRef.current?.resizableElement?.current?.contains(e.target as Node)) {
                $appInterface.setKey('visor.isDraggSelected', false)
            }
        }
        if (visor?.isDraggSelected) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [visor?.isDraggSelected])


    if (!visor?.isImgVisible || !asideLeft?.currentItem) return null

    return (
        <Rnd
            ref={rndRef}
            position={{ x: pdf?.x as number, y: pdf?.y as number }}
            size={{
                width: asideLeft?.currentItem?.width as number,
                height: asideLeft?.currentItem?.height as number
            }}

            onDragStop={(e, d) => {
                $appInterface.setKey('pdf.x', d.x);
                $appInterface.setKey('pdf.y', d.y);
            }}

            onResize={onResizeStop} //viuasl in Ui
            onResizeStop={() => {

            }}

            onDragStart={() => $appInterface.setKey('visor.isDraggSelected', true)}
            onResizeStart={() => $appInterface.setKey('visor.isDraggSelected', true)}

            bounds="parent"
            lockAspectRatio={true}
            enableResizing={visor?.isDraggSelected ? {
                bottomLeft: true,
                bottomRight: true,
                topLeft: true,
                topRight: true,
            } : false}
            resizeHandleStyles={{
                bottomLeft: { width: 10, height: 10, left: -6, bottom: -6 },
                bottomRight: { width: 10, height: 10, right: -6, bottom: -6 },
                topLeft: { width: 10, height: 10, left: -6, top: -6 },
                topRight: { width: 10, height: 10, right: -6, top: -6 },
            }}

            className={`z-30 outline-2 outline-dashed outline-accent-10 ${visor?.isDraggSelected ? 'dragSelect' : 'opacity-70'}`}
            style={{
                mixBlendMode: 'multiply',
            }}
        >
            <span
                className="bg-cover bg-no-repeat object-cover no-select flex"

                style={{
                    width: asideLeft?.currentItem?.width,
                    height: asideLeft?.currentItem?.height,
                    backgroundImage: `url(${asideLeft?.currentItem?.url})`,
                }}
            />
        </Rnd>
    )
}