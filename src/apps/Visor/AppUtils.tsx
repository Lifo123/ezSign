import { DarkmodeIcon, Dropdown, Icons } from "@lifo123/library";
import UI from "@lifo123/library/UI";
import { APP } from "@Stores/FileStore";


interface AppUtilsProps {

}

export default function AppUtils() {

    return (
        <span className="portal-app-utils sticky inset-0 h-full w-full top-0 z-100 no-select">
            <div className=" f-row gap-2 w-full relative justify-between">
                <div>

                </div>
                <div className="f-row f-nowrap f-center h-max border py-2 px-2.5 border-lifo-border-low rounded-md bg-lifo-bg-secondary w-max gap-2.5 text-lifo-text select">
                    <Icons icon="user" size={24} />
                    <DarkmodeIcon />
                    <Dropdown margin={16} horizontalMargin={8} items={[
                        [
                            { text: 'Preferences', },
                            { text: 'Signatures', },
                            { text: 'Accesibility', },
                            {
                                text: 'Log out',
                                onClick: () => {
                                    UI.Dialog.show({
                                        title: 'Are you sure?',
                                        description: 'You will lose all your data.',
                                        onClick: APP.reset
                                    })
                                }
                            },

                        ]
                    ]}>

                        <Icons icon="user" />
                    </Dropdown>
                </div>
                <div className="f-row f-nowrap left-1/2 -translate-x-1/2 f-center h-max border py-2 px-2.5 border-lifo-border-low rounded-md bg-lifo-bg-secondary w-max gap-2.5 text-lifo-text absolute">
                    <Icons icon="user" size={24} />
                    <DarkmodeIcon />
                    <Icons icon="user" size={24} />
                </div>
            </div>
        </span>
    )
}