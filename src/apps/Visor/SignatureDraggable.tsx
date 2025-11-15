'use client'

import { useStore } from "@nanostores/react";
import { $appInterface } from "@Stores/AppInterface.store";
import React from "react";
import Draggable from "react-draggable"

interface SignatureDraggableProps {

}

export default function SignatureDraggable({ ...props }: SignatureDraggableProps) {
    const INTERFACE = useStore($appInterface, { keys: ['pdf.x', 'pdf.y'] })
    const [isSelected, setIsSelected] = React.useState(false);

    const nodeRef = React.useRef(null);

    if(!INTERFACE.visor?.isImgVisible) return null

    return (
        <Draggable
            defaultClassName="outline-2 outline-dashed outline outline-accent-10"
            defaultPosition={{
                x: INTERFACE?.pdf?.x as number,
                y: INTERFACE?.pdf?.y as number,
            }}
            nodeRef={nodeRef}
            bounds="parent"
            onDrag={() => {
                setIsSelected(true)
            }}
            onStop={(e, ui) => {
                $appInterface.setKey('pdf', {
                    x: ui.x,
                    y: ui.y,
                })
                setIsSelected(false)
            }}>
            <img
                src="images/firma_001.jpg"
                className={`absolute z-30 ${isSelected ? 'opacity-100' : 'opacity-80'}`}
                ref={nodeRef}
                draggable={false}
            />
        </Draggable>
    )
}