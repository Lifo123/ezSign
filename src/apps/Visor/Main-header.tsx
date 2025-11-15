'use client'

import { Button, Menu, MenuContent, MenuItem, PressableIcon, toast } from "@lifo123/library";
import { useStore } from "@nanostores/react";
import { $appInterface } from "@Stores/AppInterface.store";
import { $files, controlPage, downloadFile, nextPage, prevPage } from "@Stores/File.store";
import { generatePDF } from "@Utils/GeneratePDF.utils";
import { Icon } from "public-icons";
import React from "react";

export default function MainHeader() {
    const INTERFACE = useStore($appInterface, { keys: ['asideLeft.isOpen'] })
    const { state, processedFile } = useStore($files, { keys: ['state.currentPage', 'processedFile'] })

    React.useEffect(() => {
        if (!state?.name) return

        const handleKeys = (e: KeyboardEvent) => {
            console.log(e.key);

            if (e.key === 'ArrowRight') {
                console.log('palante');
                nextPage()
            } else if (e.key === 'ArrowLeft') {
                console.log('patras');
                prevPage()
            } else if (e.key === 'End') {
                controlPage(state?.totalPages as number)
            } else if (e.key === 'Home') {
                controlPage(-(state?.totalPages as number))
            }
        }

        window.addEventListener('keydown', handleKeys)

        return () => {
            window.removeEventListener('keydown', handleKeys)
        }
    }, [state])

    return (
        <div className="f-row sticky top-0 items-center justify-between bg-gray-1 drop-shadow-md shadow-gray-1 py-2 px-4 z-50">
            <div className="f-row gap-1 f-center">
                <PressableIcon icon="panels-up" size={20} rotate={90} triggerProps={{
                    onPress: () => {
                        $appInterface.setKey('asideLeft.isOpen', !INTERFACE?.asideLeft?.isOpen)
                    },
                    className: 'h-8 aspect-square hover:bg-gray-3 rounded-md flex f-center pointer mr-1'
                }}
                />

                <h1 className="text-p fw-500 mr-1 max-w-xs text-nowrap o-hidden text-ellipsis">
                    {state?.name || 'Document name.pdf'}
                </h1>
            </div>

            <div className="f-row gap-2 f-center left-1/2 absolute -translate-x-1/2 z-50 bg-gray-1">
                <PressableIcon icon="arrow" rotate={-90} svgProps={{ y: 2 }} triggerProps={{
                    className: 'h-8 aspect-square hover:bg-gray-3 rounded-md flex f-center pointer',
                    onPress: () => {
                        prevPage()
                    }
                }}
                />
                <span className="text-gray-11 fw-400">
                    {state?.currentPage}  <span className="mx-1">/</span> {state?.totalPages}
                </span>
                <PressableIcon icon="arrow" rotate={90} svgProps={{ y: 2 }} triggerProps={{
                    className: 'h-8 aspect-square hover:bg-gray-3 rounded-md flex f-center pointer',
                    onPress: () => {
                        nextPage()
                    }
                }}
                />

            </div>

            <div className="f-row gap-4">
                <Button className={'btn-primary rounded-sm fs-14 fw-475 px-3 py-1 pointer'}
                    onPress={generatePDF}
                >
                    Apply
                </Button>
                <Menu >
                    <PressableIcon icon="ellipsis" size={20} rotate={90} triggerProps={{
                        onPress: () => {
                            toast.info('Opening the configuration', { richColors: true });
                        },
                        className: 'h-8 aspect-square hover:bg-gray-3 rounded-md flex f-center pointer'
                    }}
                    />
                    <MenuContent >
                        <MenuItem onPress={() => {
                            toast.info('Opening the settings.', { richColors: true });
                        }}>
                            <span className="f-row gap-2 f-center">
                                <Icon icon='setting' size={18} />
                                Settings
                            </span>
                        </MenuItem>
                        {processedFile &&
                            <MenuItem onPress={() => {
                                downloadFile(processedFile)
                            }}>
                                <span className="f-row gap-2 f-center">
                                    <Icon icon='download' size={18} />
                                    Download
                                </span>
                            </MenuItem>

                        }
                        <MenuItem onPress={() => {
                            $appInterface.setKey('currentPage', 'upload')
                            toast.info('Opening the upload.', { richColors: true });
                        }}>
                            <span className="f-row gap-2 f-center">
                                <Icon icon='square-dashed' size={18} />
                                Close file
                            </span>
                        </MenuItem>
                    </MenuContent>

                </Menu>
            </div>
        </div>
    )
}