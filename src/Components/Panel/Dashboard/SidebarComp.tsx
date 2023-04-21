import { NewSidebar } from '@cedcommerce/ounce-ui'
import React from 'react'
import { Box, HelpCircle, Home, LifeBuoy, Settings } from 'react-feather'
import Logo from '../../../../src/Asests/Images/svg/Logo'
import MobileLogo from '../../../../src/Asests/Images/svg/MobileLogo'
import { DI, DIProps } from "../../../Core"
const allMenu = [
    {
        content: "Dashboard",
        icon: <Home />,
        id: "dashboard",
        path: "dashboard",
    },
    {
        content: "Product List",
        icon: <Box />,
        id: "dashboard",
        path: "product",
    },
    {
        content: "Settings",
        icon: <Settings color='#3B424F' />,
        id: "dashboard",
        path: "settings",
    },
    {
        content: "Help",
        icon: <LifeBuoy color='#3B424F' />,
        id: "dashboard",
        path: "help",
    },
    {
        content: "FAQ",
        icon: <HelpCircle color='#3B424F' />,
        id: "dashboard",
        path: "faq",
    },
]
function SidebarComp(_props: DIProps) {

    return (
        <>
            <NewSidebar
                logo={<Logo />}
                onChange={(e: any) => _props.history(e.path)}
                mobileLogo={<MobileLogo />}
                menu={allMenu}
                path={_props.location.pathname}
            />
        </>
    )
}

export default DI(SidebarComp)