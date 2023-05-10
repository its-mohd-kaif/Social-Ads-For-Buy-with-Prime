import { PageHeader, Tabs } from '@cedcommerce/ounce-ui'
import React, { useState } from 'react'
import { Key, User, Settings, Lock } from 'react-feather'
import { DI, DIProps } from "../../../../../src/Core"
import Accounts from './Accounts'
import General from './General'
import Password from './Password'
function SettingsComp(_props: DIProps) {
    const [select, setSelect] = useState("accounts")
    return (
        <div>
            <PageHeader
                title="Settings"
            />
            <Tabs
                alignment="vertical"
                onChange={(e: string) => {
                    console.log(e)
                    setSelect(e)
                }}
                selected={select}
                value={[
                    {
                        content: 'Accounts',
                        id: 'accounts',
                        icon: <User size="24" />
                    },
                    {
                        content: 'Password',
                        id: 'password',
                        icon: <Key size="24" />
                    },
                    {
                        content: 'General Details',
                        id: 'general-details',
                        icon: <Settings size="24" />
                    },
                    {
                        content: 'Privacy Settings',
                        id: 'privacy-settings',
                        icon: <Lock size="24" />
                    },
                ]}
            >
                {select === "accounts" ? <Accounts /> :
                    select === "password" ? <Password /> :
                        select === "general-details" ? <General /> :
                            select === "privacy-settings" ? <>Provacy</>
                                : null}
            </Tabs>
        </div>
    )
}

export default DI(SettingsComp)